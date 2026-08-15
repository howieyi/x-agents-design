import React, { useEffect, useRef } from 'react';

interface QuantumCanvasProps {
  isDark?: boolean;
}

export const QuantumCanvas: React.FC<QuantumCanvasProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
    }> = [];

    const purplePalette = isDark
      ? ['#8B5CF6', '#A855F7', '#7C3AED', '#6366F1', '#C084FC', '#38BDF8']
      : ['#7C3AED', '#8B5CF6', '#6366F1', '#A855F7', '#4F46E5', '#0284C7'];

    for (let i = 0; i < particleCount; i++) {
      const color = purplePalette[Math.floor(Math.random() * purplePalette.length)];
      const baseAlpha = Math.random() * 0.4 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        color,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008
      });
    }

    // Mouse tracking for interactive magnetic aura
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle radiant background glow spots
      const gradient = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.5) * 100,
        height * 0.35 + Math.cos(time * 0.4) * 80,
        50,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.65
      );

      if (isDark) {
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
        gradient.addColorStop(1, 'rgba(10, 12, 27, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(192, 132, 252, 0.12)');
        gradient.addColorStop(0.5, 'rgba(224, 231, 255, 0.06)');
        gradient.addColorStop(1, 'rgba(250, 248, 255, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles & links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse gentle repulsion / pull
        const dxMouse = mouseX - p.x;
        const dyMouse = mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          const force = (180 - distMouse) / 180;
          p.x -= (dxMouse / distMouse) * force * 1.5;
          p.y -= (dyMouse / distMouse) * force * 1.5;
        }

        // Breathing alpha
        p.alpha = p.baseAlpha + Math.sin(time * 2 + i) * 0.15;

        // Draw particle dot with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.8, p.alpha));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect with nearby neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 140) * (isDark ? 0.22 : 0.18);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700"
      style={{ opacity: 0.85 }}
    />
  );
};
