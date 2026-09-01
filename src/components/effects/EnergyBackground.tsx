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
  pulse: number;
}

interface FloatingOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulse: number;
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
    const orbs: FloatingOrb[] = [];
    const maxParticles = 80;
    const maxOrbs = 5;
    
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

    // Initialize floating orbs
    for (let i = 0; i < maxOrbs; i++) {
      orbs.push(createOrb());
    }

    function createParticle(randomPos = false): Particle {
      const w = canvas?.width || window.innerWidth;
      const h = canvas?.height || window.innerHeight;
      return {
        x: randomPos ? Math.random() * w : Math.random() * w,
        y: randomPos ? Math.random() * h : h + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1.2 - 0.3,
        size: Math.random() * 2.5 + 0.5,
        color: "255, 30, 30",
        alpha: Math.random() * 0.6 + 0.2,
        decay: 0.001 + Math.random() * 0.003,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    function createOrb(): FloatingOrb {
      const w = canvas?.width || window.innerWidth;
      const h = canvas?.height || window.innerHeight;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 200 + 100,
        alpha: Math.random() * 0.03 + 0.01,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Mouse glow effect
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (mouse.x > -500 && mouse.y > -500) {
        const glowRadius = 400;
        const radialGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, glowRadius
        );
        radialGradient.addColorStop(0, "rgba(255, 30, 30, 0.1)");
        radialGradient.addColorStop(0.3, "rgba(255, 30, 30, 0.05)");
        radialGradient.addColorStop(0.6, "rgba(255, 30, 30, 0.02)");
        radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Inner bright spot
        const innerGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 80
        );
        innerGlow.addColorStop(0, "rgba(255, 30, 30, 0.15)");
        innerGlow.addColorStop(1, "rgba(255, 30, 30, 0)");
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw floating orbs (large ambient glows)
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.pulse += 0.01;

        // Wrap around screen
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;

        const pulseAlpha = orb.alpha * (0.7 + Math.sin(orb.pulse) * 0.3);
        
        const orbGradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size
        );
        orbGradient.addColorStop(0, `rgba(255, 30, 30, ${pulseAlpha})`);
        orbGradient.addColorStop(0.5, `rgba(255, 30, 30, ${pulseAlpha * 0.5})`);
        orbGradient.addColorStop(1, "rgba(255, 30, 30, 0)");
        
        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw energy grid with subtle animation
      const time = Date.now() * 0.001;
      ctx.strokeStyle = `rgba(255, 30, 30, ${0.02 + Math.sin(time) * 0.005})`;
      ctx.lineWidth = 1;
      const gridSize = 80;
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

      // 4. Draw & update particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.05;
        p.alpha -= p.decay;

        // Reset particle if it goes off screen or fades out
        if (p.y < -10 || p.alpha <= 0 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
          return;
        }

        // Calculate pulsing alpha
        const pulseAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);

        // Draw particle with glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${pulseAlpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 30, 30, 0.8)";
        ctx.fill();
        ctx.restore();

        // Draw lines between close particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.1 * Math.min(pulseAlpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 30, 30, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // 5. Draw subtle vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.3)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
