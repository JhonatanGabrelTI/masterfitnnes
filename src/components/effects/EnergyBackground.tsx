"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function EnergyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const maxParticles = 60;
    
    // Set size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomPos = false): Particle {
      const w = canvas?.width || window.innerWidth;
      const h = canvas?.height || window.innerHeight;
      return {
        x: randomPos ? Math.random() * w : Math.random() * w,
        y: randomPos ? Math.random() * h : h + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.8 - 0.2, // move upwards
        size: Math.random() * 2 + 1,
        color: "255, 30, 30", // Red
        alpha: Math.random() * 0.5 + 0.1,
        decay: 0.001 + Math.random() * 0.002,
      };
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Mouse glow effect
      const mouse = mouseRef.current;
      // Interpolate mouse for smooth lag
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (mouse.x > -500 && mouse.y > -500) {
        const glowRadius = 350;
        const radialGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        radialGradient.addColorStop(0, "rgba(255, 30, 30, 0.07)");
        radialGradient.addColorStop(0.5, "rgba(255, 30, 30, 0.02)");
        radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Draw energy grids/lines in the background
      ctx.strokeStyle = "rgba(255, 30, 30, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3. Draw & update particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Reset particle if it goes off screen or fades out
        if (p.y < -10 || p.alpha <= 0 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
          return;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        
        // Add subtle shadow to particle for neon feel
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 30, 30, 0.8)";
        
        ctx.fill();
        ctx.restore();

        // Draw lines between close particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.08 * Math.min(p.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 30, 30, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] bg-brand-black"
    />
  );
}
