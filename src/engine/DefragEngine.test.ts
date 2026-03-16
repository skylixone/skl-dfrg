import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DefragEngine } from './DefragEngine';
import { BlockState } from '../components/SkinProvider';

const mockConfig = {
  gridWidth: 10,
  gridHeight: 10,
  blockSize: 10,
  blockGap: 0,
  readDelay: 0,
  writeDelay: 0,
  theme: {
    id: 'test',
    name: 'Test',
    colors: {
      [BlockState.EMPTY]: "#000",
      [BlockState.ALLOCATED]: "#fff",
      [BlockState.FRAGMENTED]: "#888",
      [BlockState.UNMOVABLE]: "#f00",
      [BlockState.READING]: "#ff0",
      [BlockState.WRITING]: "#0f0",
    },
    backgroundColor: "#000",
    borderRadius: 0,
    blockGap: 0
  }
};

describe('DefragEngine', () => {
  let engine: DefragEngine;

  beforeEach(() => {
    engine = new DefragEngine(mockConfig as any);
  });

  it('should initialize with blocks', () => {
    const blocks = engine.getBlocks();
    expect(blocks.length).toBe(mockConfig.gridWidth * mockConfig.gridHeight);
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
