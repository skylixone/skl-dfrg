import { useEffect, useRef } from 'preact/hooks';
import p5 from 'p5';
import { DefragEngine } from '../engine/DefragEngine';
import { Theme } from './SkinProvider';

export interface DefragConfig {
  gridWidth: number;
  gridHeight: number;
  blockSize: number;
  blockGap: number;
  readDelay: number;
  writeDelay: number;
  theme: Theme;
}

interface Props {
  engine: DefragEngine;
  config: DefragConfig;
}

export function DefragSketch({ engine, config }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        const { blockSize, blockGap } = config;
        const actualGap = config.theme.blockGap || blockGap;
        
        const canvas = p.createCanvas(
          config.gridWidth * (blockSize + actualGap),
          config.gridHeight * (blockSize + actualGap)
        );
        canvas.parent(containerRef.current!);
        
        // Final sanity styling for absolute fitting
        const canvasElement = canvas.elt as HTMLCanvasElement;
        canvasElement.style.maxWidth = '100%';
        canvasElement.style.maxHeight = '100%';
        canvasElement.style.width = 'auto';
        canvasElement.style.height = 'auto';
        canvasElement.style.objectFit = 'contain';
        canvasElement.style.display = 'block';
        
        p.noStroke();
      };

      p.draw = () => {
        p.clear();
        const blocks = engine.getBlocks();
        const { blockSize, blockGap, theme } = config;
        const actualGap = theme.blockGap !== undefined ? theme.blockGap : blockGap;

        for (let i = 0; i < blocks.length; i++) {
          const x = (i % config.gridWidth) * (blockSize + actualGap);
          const y = Math.floor(i / config.gridWidth) * (blockSize + actualGap);
          
          const state = blocks[i];
          const color = (theme.colors as any)[state];
          
          p.fill(color);
          if (theme.borderRadius > 0) {
            p.rect(x, y, blockSize, blockSize, theme.borderRadius);
          } else {
            p.rect(x, y, blockSize, blockSize);
          }
        }
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [engine]); // Re-init only if engine changes

  // Reactive updates for canvas size if config changes
  useEffect(() => {
    if (p5InstanceRef.current) {
      const { blockSize, blockGap, theme } = config;
      const actualGap = theme.blockGap !== undefined ? theme.blockGap : blockGap;

      p5InstanceRef.current.resizeCanvas(
        config.gridWidth * (blockSize + actualGap),
        config.gridHeight * (blockSize + actualGap)
      );
      
      const canvasElt = (p5InstanceRef.current as any).canvas;
      if (canvasElt) {
        canvasElt.style.maxWidth = '100%';
        canvasElt.style.maxHeight = '100%';
        canvasElt.style.width = 'auto';
        canvasElt.style.height = 'auto';
        canvasElt.style.objectFit = 'contain';
      }
    }
  }, [config.gridWidth, config.gridHeight, config.blockSize, config.blockGap, config.theme.id]);

  return (
    <div 
      ref={containerRef} 
      class="w-full h-full flex justify-center items-center overflow-hidden" 
    />
  );
}
