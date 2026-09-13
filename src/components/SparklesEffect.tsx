import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export const SparklesEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#FFD700', '#FFF200', '#FFFFFF', '#E6C687', '#FFE89E'];
    const sparklesCount = Math.min(35, Math.floor(width / 35));
    const sparkles: Sparkle[] = [];

    const createSparkle = (): Sparkle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      fadeSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < sparklesCount; i++) {
      sparkles.push(createSparkle());
    }

    const drawStar = (x: number, y: number, radius: number, opacity: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;

      // Draw 4-point golden star
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * radius, Math.sin((i * Math.PI) / 2) * radius);
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (radius * 0.25),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (radius * 0.25)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      sparkles.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.opacity += s.fadeSpeed;
        s.rotation += s.rotationSpeed;

        if (s.opacity > 1) {
          s.opacity = 1;
          s.fadeSpeed = -s.fadeSpeed;
        } else if (s.opacity < 0.1) {
          s.opacity = 0.1;
          s.fadeSpeed = -s.fadeSpeed;
        }

        if (s.y < -20) s.y = height + 20;
        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;

        drawStar(s.x, s.y, s.size, s.opacity, s.rotation, s.color);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
