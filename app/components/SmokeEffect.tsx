"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
  phase: number;
}

export default function SmokeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, prevX: -1000, prevY: -1000 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const createParticle = useCallback((canvas: HTMLCanvasElement, scattered: boolean = false): Particle => {
    // Spawn across entire left side
    const spawnWidth = canvas.width * 0.5;
    const x = scattered ? Math.random() * spawnWidth : spawnWidth + Math.random() * 20;
    const y = Math.random() * canvas.height;

    // Very tiny particles (1-3 pixels) for realistic dense smoke
    const baseRadius = Math.random() * 2 + 1;

    return {
      x,
      y,
      vx: -Math.random() * 0.3 - 0.05,
      vy: (Math.random() - 0.5) * 0.1,
      radius: baseRadius,
      opacity: Math.random() * 0.5 + 0.5,
      life: scattered ? Math.random() * 400 : 0,
      maxLife: Math.random() * 600 + 500,
      phase: Math.random() * Math.PI * 2,
    };
  }, []);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    // Very high density for thick realistic smoke
    const particleCount = 8000;

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvas, true));
    }

    return particles;
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    const drawSmoke = () => {
      // Clear with black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.003;
      const time = timeRef.current;

      // Draw base smoke layer first
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width * 0.5, 0);
      baseGradient.addColorStop(0, "rgba(180, 180, 180, 0.4)");
      baseGradient.addColorStop(0.4, "rgba(150, 150, 150, 0.2)");
      baseGradient.addColorStop(0.7, "rgba(100, 100, 100, 0.08)");
      baseGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width * 0.55, canvas.height);

      // Use screen composite for additive blending
      ctx.globalCompositeOperation = "screen";

      particlesRef.current.forEach((particle, index) => {
        particle.life++;

        // Organic turbulent movement
        const turbulenceX = Math.sin(time * 0.4 + particle.phase + particle.y * 0.002) * 0.05 +
                           Math.cos(time * 0.25 + particle.x * 0.0015) * 0.03;
        const turbulenceY = Math.cos(time * 0.3 + particle.phase + particle.x * 0.002) * 0.04 +
                           Math.sin(time * 0.5 + particle.y * 0.0015) * 0.025;

        particle.vx += turbulenceX * 0.008 - 0.003;
        particle.vy += turbulenceY * 0.006;

        // Slight rise
        particle.vy -= 0.0005;

        // Clamp velocities
        particle.vx = Math.max(Math.min(particle.vx, 0.2), -0.5);
        particle.vy = Math.max(Math.min(particle.vy, 0.25), -0.25);

        // Mouse interaction
        if (mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 80;

          if (distance < interactionRadius && distance > 0.5) {
            const force = Math.pow((interactionRadius - distance) / interactionRadius, 2);
            const angle = Math.atan2(dy, dx);

            const mouseVx = mouseRef.current.x - mouseRef.current.prevX;
            const mouseVy = mouseRef.current.y - mouseRef.current.prevY;
            const mouseSpeed = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);

            const pushForce = force * (1.5 + Math.min(mouseSpeed * 0.08, 1.5));

            particle.vx += Math.cos(angle) * pushForce;
            particle.vy += Math.sin(angle) * pushForce;

            particle.vx += (Math.random() - 0.5) * force * 1.5;
            particle.vy += (Math.random() - 0.5) * force * 1.5;
          }
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        // Life-based fade
        const lifeRatio = particle.life / particle.maxLife;
        const fadeIn = Math.min(1, particle.life / 80);
        const fadeOut = 1 - Math.pow(lifeRatio, 4);
        const currentOpacity = particle.opacity * fadeIn * fadeOut;

        // Validate
        if (!isFinite(particle.x) || !isFinite(particle.y) || !isFinite(particle.radius) || particle.radius <= 0) {
          particlesRef.current[index] = createParticle(canvas, false);
          return;
        }

        // Draw particle - pure white tiny dot
        const alpha = Math.max(0, Math.min(0.4, currentOpacity * 0.4));
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Reset particle if needed
        if (
          particle.life > particle.maxLife ||
          particle.x < -5 ||
          particle.y < -5 ||
          particle.y > canvas.height + 5
        ) {
          particlesRef.current[index] = createParticle(canvas, false);
        }
      });

      ctx.globalCompositeOperation = "source-over";

      // Add thick smoke overlay layers
      for (let layer = 0; layer < 4; layer++) {
        const y1 = canvas.height * (0.1 + layer * 0.2);
        const y2 = canvas.height * (0.3 + layer * 0.2);
        
        const smokeLayer = ctx.createRadialGradient(
          canvas.width * 0.15 + Math.sin(time + layer) * 30, 
          y1 + Math.cos(time * 0.7 + layer) * 20,
          0,
          canvas.width * 0.15, 
          (y1 + y2) / 2,
          canvas.width * 0.35
        );
        smokeLayer.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        smokeLayer.addColorStop(0.3, "rgba(230, 230, 230, 0.04)");
        smokeLayer.addColorStop(0.6, "rgba(200, 200, 200, 0.015)");
        smokeLayer.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = smokeLayer;
        ctx.fillRect(0, 0, canvas.width * 0.6, canvas.height);
      }

      // Edge gradient for depth
      const edgeGradient = ctx.createLinearGradient(0, 0, canvas.width * 0.5, 0);
      edgeGradient.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      edgeGradient.addColorStop(0.2, "rgba(255, 255, 255, 0.06)");
      edgeGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
      edgeGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = edgeGradient;
      ctx.fillRect(0, 0, canvas.width * 0.55, canvas.height);

      animationRef.current = requestAnimationFrame(drawSmoke);
    };

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawSmoke();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      id="smoke-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        cursor: "default",
        touchAction: "none",
      }}
    />
  );
}
