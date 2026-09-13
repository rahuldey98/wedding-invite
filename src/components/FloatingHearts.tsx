import { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  pulseSpeed: number;
  color: string;
}

export const FloatingHearts = () => {
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

    const colors = ['#FF4D88', '#FF6699', '#E6007A', '#FF99B8', '#D9006C'];
    const count = Math.min(28, Math.floor(width / 40));
    const hearts: HeartParticle[] = [];

    const createHeart = (): HeartParticle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: -Math.random() * 0.5 - 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: (Math.random() - 0.5) * 30,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      scale: Math.random() * 0.4 + 0.8,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < count; i++) {
      hearts.push(createHeart());
    }

    const drawHeart = (x: number, y: number, size: number, opacity: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

      // Draw SVG-style small heart
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      hearts.forEach((h) => {
        h.y += h.speedY;
        h.x += h.speedX + Math.sin(frame * 0.02) * 0.2;
        h.rotation += h.rotationSpeed;

        if (h.y < -30) {
          h.y = height + 30;
          h.x = Math.random() * width;
        }

        drawHeart(h.x, h.y, h.size, h.opacity, h.rotation, h.color);
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
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
};
