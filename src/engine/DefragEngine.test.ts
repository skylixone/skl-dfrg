import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DefragEngine } from './DefragEngine';
import { DEFAULT_CONFIG, BlockState } from '../types';

describe('DefragEngine', () => {
  let engine: DefragEngine;

  beforeEach(() => {
    engine = new DefragEngine(DEFAULT_CONFIG);
  });

  it('should initialize with blocks', () => {
    const blocks = engine.getBlocks();
    expect(blocks.length).toBe(DEFAULT_CONFIG.gridWidth * DEFAULT_CONFIG.gridHeight);
  });

  it('should start and update blocks', async () => {
    const onUpdate = vi.fn();
    
    // Force a specific state for testing if possible, but the engine is random.
    // Let's just check if it triggers onUpdate.
    engine.start(onUpdate);
    
    // Wait for a few steps
    await new Promise(resolve => setTimeout(resolve, 300));
    
    expect(onUpdate).toHaveBeenCalled();
    engine.stop();
  });

  it('should calculate progress', () => {
    const progress = engine.getProgress();
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);
  });
});
