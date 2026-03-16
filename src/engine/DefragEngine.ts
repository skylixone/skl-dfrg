import { BlockState, Theme } from '../components/SkinProvider';

export interface DefragConfig {
  gridWidth: number;
  gridHeight: number;
  blockSize: number;
  blockGap: number;
  readDelay: number;
  writeDelay: number;
  theme: Theme;
}

export class DefragEngine {
  private blocks: BlockState[] = [];
  private config: DefragConfig;
  private isRunning: boolean = false;
  private targetPointer: number = 0;
  private sourcePointer: number = 0;
  private currentStepTimeout: any = null;

  constructor(config: DefragConfig) {
    this.config = config;
    this.initializeDisk();
  }

  private initializeDisk() {
    const totalBlocks = this.config.gridWidth * this.config.gridHeight;
    this.blocks = new Array(totalBlocks).fill(BlockState.EMPTY);

    // Randomly seed the disk
    for (let i = 0; i < totalBlocks; i++) {
      const rand = Math.random();
      if (rand < 0.1) {
        this.blocks[i] = BlockState.UNMOVABLE;
      } else if (rand < 0.6) {
        this.blocks[i] = BlockState.FRAGMENTED;
      } else if (rand < 0.7) {
        this.blocks[i] = BlockState.ALLOCATED;
      } else {
        this.blocks[i] = BlockState.EMPTY;
      }
    }
    
    this.resetPointers();
  }

  public reset() {
    this.stop();
    this.initializeDisk();
  }

  public stop() {
    this.isRunning = false;
    if (this.currentStepTimeout) {
      clearTimeout(this.currentStepTimeout);
      this.currentStepTimeout = null;
    }
  }

  public start(onUpdate: () => void) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.step(onUpdate);
  }

  private resetPointers() {
    this.targetPointer = 0;
    this.sourcePointer = 0;
  }

  private async step(onUpdate: () => void) {
    if (!this.isRunning) return;

    // Linear Sweep Logic:
    // 1. Find the first EMPTY block (target)
    while (this.targetPointer < this.blocks.length && this.blocks[this.targetPointer] !== BlockState.EMPTY) {
      this.targetPointer++;
    }

    if (this.targetPointer >= this.blocks.length) {
      this.isRunning = false;
      onUpdate();
      return;
    }

    // 2. Find the next movable block after target (source)
    if (this.sourcePointer <= this.targetPointer) {
      this.sourcePointer = this.targetPointer + 1;
    }

    while (this.sourcePointer < this.blocks.length && 
           (this.blocks[this.sourcePointer] === BlockState.EMPTY || 
            this.blocks[this.sourcePointer] === BlockState.UNMOVABLE)) {
      this.sourcePointer++;
    }

    if (this.sourcePointer >= this.blocks.length) {
      // Reached end, but maybe missed some? (Unlikely in linear sweep)
      this.isRunning = false;
      onUpdate();
      return;
    }

    // 3. Perform visual transition
    // const sourceVal = this.blocks[this.sourcePointer];
    
    // READING flash
    this.blocks[this.sourcePointer] = BlockState.READING;
    onUpdate();
    
    await this.delay(this.config.readDelay);
    if (!this.isRunning) return;

    // WRITING flash
    this.blocks[this.targetPointer] = BlockState.WRITING;
    this.blocks[this.sourcePointer] = BlockState.EMPTY;
    onUpdate();

    await this.delay(this.config.writeDelay);
    if (!this.isRunning) return;

    // COMMIT
    this.blocks[this.targetPointer] = BlockState.ALLOCATED;
    onUpdate();

    // Loop
    this.step(onUpdate);
  }

  private delay(ms: number) {
    return new Promise(resolve => {
      this.currentStepTimeout = setTimeout(resolve, ms);
    });
  }

  public getBlocks() {
    return this.blocks;
  }

  public updateConfig(newConfig: Partial<DefragConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  public getProgress() {
    const totalMovable = this.blocks.filter(b => b !== BlockState.UNMOVABLE).length;
    const allocated = this.blocks.filter(b => b === BlockState.ALLOCATED).length;
    return Math.floor((allocated / totalMovable) * 100);
  }

  public getStatus() {
    if (!this.isRunning) return "PAUSED";
    return "DEFRAGMENTING";
  }
}
