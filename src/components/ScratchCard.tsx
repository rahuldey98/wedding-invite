import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Generate concentric radial dot halo for revealed crimson card
  const radialDots = useMemo(() => {
    const dots: { cx: number; cy: number; r: number; opacity: number; key: string }[] = [];
    const centerX = 170;
    const centerY = 75;
    const rings = [
      { r: 16, count: 12, dotR: 0.9, op: 0.75 },
      { r: 24, count: 18, dotR: 0.9, op: 0.7 },
      { r: 32, count: 24, dotR: 0.95, op: 0.68 },
      { r: 41, count: 30, dotR: 1.0, op: 0.65 },
      { r: 50, count: 36, dotR: 1.0, op: 0.62 },
      { r: 60, count: 42, dotR: 1.05, op: 0.58 },
      { r: 71, count: 48, dotR: 1.05, op: 0.55 },
      { r: 82, count: 54, dotR: 1.1, op: 0.52 },
      { r: 94, count: 60, dotR: 1.1, op: 0.48 },
      { r: 106, count: 66, dotR: 1.1, op: 0.45 },
      { r: 119, count: 72, dotR: 1.15, op: 0.42 },
      { r: 133, count: 78, dotR: 1.15, op: 0.38 },
      { r: 147, count: 84, dotR: 1.2, op: 0.35 },
      { r: 162, count: 90, dotR: 1.2, op: 0.32 },
      { r: 178, count: 96, dotR: 1.2, op: 0.28 },
      { r: 195, count: 102, dotR: 1.2, op: 0.25 },
      { r: 213, count: 108, dotR: 1.2, op: 0.22 },
      { r: 232, count: 114, dotR: 1.25, op: 0.18 },
      { r: 252, count: 120, dotR: 1.25, op: 0.15 },
    ];

    rings.forEach((ring, ringIdx) => {
      const angleOffset = ringIdx * 0.22;
      for (let i = 0; i < ring.count; i++) {
        const theta = (2 * Math.PI * i) / ring.count + angleOffset;
        const cx = centerX + ring.r * Math.cos(theta);
        const cy = centerY + ring.r * Math.sin(theta);
        if (cx >= -20 && cx <= 360 && cy >= -20 && cy <= 170) {
          dots.push({
            cx: Number(cx.toFixed(1)),
            cy: Number(cy.toFixed(1)),
            r: ring.dotR,
            opacity: ring.op,
            key: `dot-${ringIdx}-${i}`,
          });
        }
      }
    });

    return dots;
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Warm vibrant gold-yellow (#FFC800)
    ctx.fillStyle = '#FFC800';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle golden sparkle texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 160; i++) {
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1.8, 1.8);
    }
    ctx.fillStyle = 'rgba(120, 0, 0, 0.08)';
    for (let i = 0; i < 60; i++) {
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1.4, 1.4);
    }

    // 1. "Save The Date!" Script on Yellow Card (Matching user screenshot)
    ctx.save();
    ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#FFFFFF';
    const scriptSize = Math.max(26, Math.min(34, rect.width * 0.1));
    ctx.font = `${scriptSize}px "Great Vibes", "Italianno", cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Save The Date!', rect.width / 2, rect.height * 0.28);
    ctx.restore();

    // 2. "Scratch to reveal" Serif Text in Center
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#6E0B14';
    const serifSize = Math.max(16, Math.min(21, rect.width * 0.062));
    ctx.font = `normal ${serifSize}px "Instrument Serif", "Inria Serif", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height * 0.48);
    ctx.restore();

    // 3. "29.01.2027" Date on Yellow Card (Matching user screenshot)
    ctx.save();
    ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#FFFFFF';
    const dateSize = Math.max(28, Math.min(38, rect.width * 0.115));
    ctx.font = `900 ${dateSize}px "Orbitron", -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('29.01.2027', rect.width / 2, rect.height * 0.74);
    ctx.restore();

    setIsScratched(false);
    lastPointRef.current = null;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Observe container resizing for robust initialization
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          initCanvas();
        }
      }
    });
    ro.observe(container);

    // Re-draw once web fonts (Great Vibes, Orbitron) are fully loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initCanvas();
      });
    }

    initCanvas();

    window.addEventListener('resize', initCanvas);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', initCanvas);
    };
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;
    const brushSize = 38 * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      setIsDrawing(true);
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || e.touches.length === 0) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) {
          transparentPixels++;
        }
      }
      const totalSampled = pixels.length / 16;
      if (transparentPixels / totalSampled > 0.42) {
        setIsScratched(true);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-6 px-4 bg-white">
      <div
        ref={containerRef}
        className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[2.26/1] rounded-[22px] overflow-hidden shadow-xl select-none cursor-grab active:cursor-grabbing bg-[#640912] border-[1.5px] border-[#6E0B14]"
      >
        {/* Exact Revealed Crimson Velvet Card with Radial Dots Halo */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#5a0810] via-[#750e19] to-[#5a0810] flex flex-col items-center justify-center overflow-hidden select-none">
          
          {/* Concentric Radial Dots Halo */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 340 150"
            preserveAspectRatio="xMidYMid slice"
          >
            {radialDots.map((dot) => (
              <circle
                key={dot.key}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#FFFFFF"
                opacity={dot.opacity}
              />
            ))}
          </svg>

          {/* Ambient Glow Center */}
          <div className="absolute w-48 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />

          {/* Text Content Container on Revealed Layer */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 -mt-1">
            {/* "Save The Date!" in Glowing White Script Calligraphy */}
            <span
              className="font-script text-[30px] sm:text-[36px] text-white tracking-wide leading-tight select-none"
              style={{
                textShadow:
                  '0 0 8px rgba(255, 255, 255, 0.95), 0 0 16px rgba(255, 255, 255, 0.65), 0 0 24px rgba(255, 255, 255, 0.35)',
              }}
            >
              Save The Date!
            </span>

            {/* "29.01.2027" in Orbitron Glowing Display Font */}
            <span
              className="font-orbitron font-extrabold text-[28px] sm:text-[36px] text-white tracking-[0.08em] select-none leading-tight -mt-0.5"
              style={{
                textShadow:
                  '0 0 8px #FFFFFF, 0 0 18px #FFFFFF, 0 0 28px rgba(255, 255, 255, 0.8), 0 0 45px rgba(255, 120, 160, 0.45)',
              }}
            >
              29.01.2027
            </span>
          </div>
        </div>

        {/* Scratchable Yellow Top Canvas Layer with Date and Save The Date */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-700 ${
            isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};
