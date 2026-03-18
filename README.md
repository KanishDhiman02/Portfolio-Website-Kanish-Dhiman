# High-Performance WebGL Portfolio Architecture

[![Live Demo](https://img.shields.io/badge/Live_Deployment-kanishdhiman.vercel.app-0F4539?style=for-the-badge)](https://kanishdhiman.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

A highly optimized, component-driven web application engineered to showcase scalable backend architecture, computational optimization engines, and high-performance system design. 

This repository contains the frontend source code, featuring a custom WebGL rendering pipeline, hardware-accelerated 3D computations, and rigid-body physics simulations executed directly in the browser.

## ⚙️ Core Architecture & Features

* **Hardware-Accelerated WebGL:** Utilizes `Three.js` and `@react-three/fiber` to bypass the standard DOM and talk directly to the GPU for rendering complex 3D matrix transforms.
* **Rigid-Body Physics:** Integrates the `@react-three/rapier` physics engine to handle real-time collision logic and spatial coordinates for interactive UI components.
* **Scroll-Linked Animations:** Implements `GSAP` (GreenSock) coupled with the Intersection Observer API for performant, zero-latency scroll animations without triggering main-thread layout thrashing.
* **Strict Type Safety:** Built entirely with `TypeScript` to enforce strict interfaces and ensure maintainable, error-free component lifecycles.
* **Performance Optimization:** Implements lazy loading and dynamic imports to manage heavy 3D library payloads, targeting a strict 60-FPS render cycle and zero Cumulative Layout Shifts (CLS).

## 🛠 Technical Stack

**Core Rendering**
* React 18
* TypeScript
* Vite (Build Tooling)

**3D & Mathematics Pipeline**
* Three.js (WebGL Abstraction)
* React Three Fiber (R3F)
* React Three Drei (Utility ecosystem for R3F)
* React Three Rapier (WASM-based Physics Engine)

**Animation & Styling**
* GSAP (ScrollTrigger integrations)
* Tailwind CSS (Utility-first styling for structural layout)

## 🚀 Local Development

To run this system architecture locally, ensure you have Node.js installed, then execute the following:

```bash
# Clone the repository
git clone [https://github.com/KanishDhiman02/Portfolio-Website-Kanish-Dhiman.git](https://github.com/KanishDhiman02/Portfolio-Website-Kanish-Dhiman.git)

# Navigate into the directory
cd Portfolio-Website-Kanish-Dhiman

# Install dependencies (Downloads Three.js, Rapier, and GSAP binaries)
npm install

# Spin up the local Vite development server
npm run dev

```
The application will be served locally at http://localhost:5173.

📈 Deployment Context
The production build is continuously deployed via Vercel's edge network. Static assets (images/models) are aggressively compressed (e.g., .webp formats) to offset the baseline payload weight of the WebGL and physics engine libraries.

Engineered by Kanish Dhiman.
