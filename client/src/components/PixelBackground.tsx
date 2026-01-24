import { useEffect, useRef } from "react";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.3, 1.5) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4 + 0.2;
    this.minSize = 0.3;
    this.maxSizeInteger = 1.5; // Smaller pixels
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 8 + (this.width + this.height) * 0.02;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size,
    );
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    // Simplified shimmer calculation for better performance
    const shimmerSpeed = this.speed * 0.7;
    if (this.isReverse) {
      this.size -= shimmerSpeed;
    } else {
      this.size += shimmerSpeed;
    }
  }
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeIntervalRef = useRef<number>(1000 / 60);
  const timePreviousRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#ffd700", "#ffed4e", "#fbbf24", "#f59e0b", "#d97706", "#b45309"];
    const gap = 8;
    const speed = 60 * 0.001; // Convert to match provided code

    const getDistanceToBottomCenter = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
      const centerX = canvasWidth / 2;
      const bottomY = canvasHeight;
      const dx = x - centerX;
      const dy = bottomY - y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      // Create pixels with exact spacing from provided code
      pixelsRef.current = [];
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const delay = getDistanceToBottomCenter(x, y, width, height);
          
          pixelsRef.current.push(
            new Pixel(canvas, ctx, x, y, color, speed, delay)
          );
        }
      }
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const timeNow = performance.now();
      const timePassed = timeNow - timePreviousRef.current;

      if (timePassed < timeIntervalRef.current) return;

      timePreviousRef.current = timeNow - (timePassed % timeIntervalRef.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (const pixel of pixelsRef.current) {
        pixel.appear();
        if (!pixel.isIdle) allIdle = false;
      }

      if (allIdle) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };

    // Check for reduced motion preference and performance
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (reducedMotion || isLowPerformance) return;

    handleResize();
    animate();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(handleResize);
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #11263E 0%, #0a1a2e 50%, #16213e 100%)' 
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(17,38,62,0.8)_0%,_transparent_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#11263E] to-transparent" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ 
          display: 'grid',
          inlineSize: '100%',
          blockSize: '100%',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}
