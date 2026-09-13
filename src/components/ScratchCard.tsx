import React, { useRef, useEffect, useState, useCallback } from 'react';
import { weddingData } from '../config/weddingData';

export const ScratchCard: React.FC = () => {
  const { couple } = weddingData;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Fill with vibrant yellow (#FFD200)
    ctx.fillStyle = '#FFD200';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add subtle gold sparkles speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 150; i++) {
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 2, 2);
    }
    ctx.fillStyle = 'rgba(122, 0, 0, 0.08)';
    for (let i = 0; i < 60; i++) {
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1.5, 1.5);
    }

    // Draw "Scratch to reveal" Text
    ctx.fillStyle = '#7A0000';
    ctx.font = 'normal 22px "Instrument Serif", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height / 2);

    setIsScratched(false);
    lastPointRef.current = null;
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    const brushSize = 35 * dpr;

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
      if (transparentPixels / totalSampled > 0.45) {
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
        className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[2.6/1] rounded-xl overflow-hidden shadow-md border-2 border-[#D4AF37] select-none cursor-grab active:cursor-grabbing bg-[#FFFDF8]"
      >
        {/* Revealed Content Underneath Canvas with Updated Wedding Date */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-[#FFFDF9] to-[#FAF5ED]">
          {/* Ornate Top Accent */}
          <span className="font-script text-2xl sm:text-3xl text-[#7A0000] leading-none mb-1">
            Save the Date
          </span>

          {/* Wedding Date in Bold Maroon */}
          <div className="font-display text-2xl sm:text-3xl font-bold text-[#7A0000] tracking-wide leading-tight">
            {couple.weddingDateFormatted}
          </div>

          {/* Couple Names & Hashtag */}
          <span className="font-body text-xs text-[#6A6662] mt-0.5 tracking-wider">
            {couple.displayNames} • {couple.hashtag}
          </span>
        </div>

        {/* Scratchable Canvas Layer */}
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
