import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  className?: string;
}

export const Starfield: React.FC<StarfieldProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const starCount = 65;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.15 + 0.04,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      tint: Math.random() > 0.72 ? '#00BFFF' : Math.random() > 0.4 ? '#38BDF8' : '#F5F2EA',
    }));

    let tick = 0;

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      tick += 1;

      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.y -= star.speed;
          if (star.y < -4) {
            star.y = height + 4;
            star.x = Math.random() * width;
          }
        }

        const twinkle = prefersReducedMotion
          ? star.alpha
          : star.alpha * (0.65 + 0.35 * Math.sin(tick * star.twinkleSpeed + star.phase));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.tint;
        ctx.globalAlpha = twinkle;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
