# Smoke Effect

A beautiful, interactive smoke particle animation built with Next.js, React, and Canvas API. Features realistic white smoke that responds to cursor movement with smooth dispersion effects.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Realistic Smoke Animation**: High-density particle system with 24,000+ particles creating realistic white smoke
- **Interactive Cursor Effects**: Smoke disperses and spreads when you hover your cursor over it, just like real smoke
- **Smooth Fill Animation**: Vacant areas quickly fill with particles when cursor moves away
- **Performance Optimized**: Efficient Canvas-based rendering with smooth 60fps animations
- **Responsive Design**: Works seamlessly across all screen sizes
- **Modern UI**: Clean, minimalist design with elegant typography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AzghanAhmad/Smoke-Effect.git
cd smoke-effect
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the smoke effect.

## 📖 Usage

### Development

To start the development server with hot-reloading:

```bash
npm run dev
```

The page will automatically reload when you make changes to the code.

### Build for Production

To create an optimized production build:

```bash
npm run build
```

### Start Production Server

To start the production server (after building):

```bash
npm run start
```

### Lint Code

To check for linting errors:

```bash
npm run lint
```

## 🎮 Interaction

- **Hover**: Move your cursor over the smoke to see it disperse and spread
- **Move Away**: Watch as the smoke quickly fills vacant areas when you move your cursor away
- **Explore**: The smoke responds naturally to cursor movement with realistic physics

## 🛠️ Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **Canvas API** - High-performance 2D graphics rendering

## 📁 Project Structure

```
smoke-effect/
├── app/
│   ├── components/
│   │   └── SmokeEffect.tsx    # Main smoke animation component
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── public/                     # Static assets
├── .gitignore                  # Git ignore rules
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # This file
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Customization

### Adjusting Smoke Density

Edit `app/components/SmokeEffect.tsx` and modify the `particleCount` variable:

```typescript
const particleCount = 24000; // Increase or decrease for more/less density
```

### Changing Smoke Color

Modify the particle rendering in `SmokeEffect.tsx` to change colors:

```typescript
ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // White smoke
```

### Adjusting Interaction Sensitivity

Change the `interactionRadius` variable to make smoke more or less sensitive to cursor movement:

```typescript
const interactionRadius = 80; // Increase for larger interaction area
```

## 📝 License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Learn Canvas API