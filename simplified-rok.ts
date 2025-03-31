class ROKAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private oobs: any[] = [];
  private animationId: number | null = null;
  private previousTimestamp: number | undefined;

  constructor(canvas: HTMLCanvasElement, options: {
    // Core parameters
    numberOfObjects?: number;
    coherenceMovement?: number;
    coherentMovementDirection?: number;
    coherentOrientation?: number;
    coherenceOrientation?: number;
    movementSpeed?: number;
    objectSize?: number;
    objectColor?: string;
    stimulusType?: number; // 0-triangle, 1-circle, 2-square
    // Optional parameters
    movementSpeedRandomisation?: number;
    randomMovementType?: number;
    randomOrientationType?: number;
    fadeOut?: number;
    lifeSpan?: number;
  } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    // Set default options
    const {
      numberOfObjects = 300,
      coherenceMovement = 50,
      coherentMovementDirection = 0,
      coherentOrientation = 0,
      coherenceOrientation = 50,
      movementSpeed = 10,
      objectSize = 2,
      objectColor = 'white',
      stimulusType = 0,
      movementSpeedRandomisation = 0,
      randomMovementType = 0,
      randomOrientationType = 0,
      fadeOut = 0,
      lifeSpan = Infinity
    } = options;

    // Calculate numbers of coherent and random objects
    const nCoherentMovement = Math.round((coherenceMovement / 100) * numberOfObjects);
    const nIncoherentMovement = numberOfObjects - nCoherentMovement;
    
    const nCoherentOrientation = Math.round((coherenceOrientation / 100) * numberOfObjects);
    const nIncoherentOrientation = numberOfObjects - nCoherentOrientation;

    // Create movement and orientation arrays
    let orientations = [];
    let movements = [];

    // Fill arrays with coherent and random values
    for (let i = 0; i < nCoherentMovement; i++) {
      movements.push(coherentMovementDirection);
    }
    for (let i = 0; i < nIncoherentMovement; i++) {
      movements.push(Math.random() * 360);
    }

    for (let i = 0; i < nCoherentOrientation; i++) {
      orientations.push(coherentOrientation);
    }
    for (let i = 0; i < nIncoherentOrientation; i++) {
      orientations.push(Math.random() * 360);
    }

    // Shuffle arrays
    movements = this.shuffleArray(movements);
    orientations = this.shuffleArray(orientations);

    // Create objects
    for (let i = 0; i < numberOfObjects; i++) {
      // Convert percentages to actual sizes/speeds based on canvas
      const sizeInPixels = (canvas.width * objectSize) / 100;
      const speedInPixels = (canvas.width * movementSpeed) / 100;

      let oob;
      if (stimulusType === 0) {
        oob = new Triangle(
          sizeInPixels,
          objectColor,
          orientations[i],
          movements[i],
          speedInPixels,
          movementSpeedRandomisation,
          randomMovementType,
          randomOrientationType,
          fadeOut,
          lifeSpan,
          canvas,
          this.ctx
        );
      } else if (stimulusType === 1) {
        oob = new Circle(
          sizeInPixels,
          objectColor,
          orientations[i],
          movements[i],
          speedInPixels,
          movementSpeedRandomisation,
          randomMovementType,
          randomOrientationType,
          fadeOut,
          lifeSpan,
          canvas,
          this.ctx
        );
      } else {
        oob = new Square(
          sizeInPixels,
          objectColor,
          orientations[i],
          movements[i],
          speedInPixels,
          movementSpeedRandomisation,
          randomMovementType,
          randomOrientationType,
          fadeOut,
          lifeSpan,
          canvas,
          this.ctx
        );
      }
      this.oobs.push(oob);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  start() {
    if (this.animationId !== null) return;
    
    const animate = (timestamp: number) => {
      // Calculate delta time
      if (this.previousTimestamp === undefined) {
        this.previousTimestamp = timestamp;
      }
      const deltaTime = timestamp - this.previousTimestamp;
      this.previousTimestamp = timestamp;

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update and draw objects
      for (const oob of this.oobs) {
        oob.update(deltaTime);
        oob.draw();
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

// Base class for objects
abstract class BaseObject {
  protected pos: { x: number; y: number };
  protected vel: { x: number; y: number };
  protected alpha: number = 1;
  protected timeToChangeMovement: number;
  protected timeToChangeOrientation: number;
  protected timeToRebirth: number;
  protected rW: number;
  protected rO: number;
  
  constructor(
    protected size: number,
    protected color: string,
    protected orientation: number,
    protected movementDirection: number,
    protected speed: number,
    protected speedRandomisation: number,
    protected randomMovementType: number,
    protected randomOrientationType: number,
    protected fadeOut: number,
    protected lifeSpan: number,
    protected canvas: HTMLCanvasElement,
    protected ctx: CanvasRenderingContext2D,
  ) {
    // Initialize position randomly within canvas
    this.pos = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    };
    
    // Initialize velocity based on movement direction
    this.vel = { x: 0, y: 0 };
    this.setVelocity();

    // Initialize time to rebirth
    this.timeToRebirth = Math.random() * this.lifeSpan;

    // Initialize random movement parameters
    this.timeToChangeMovement = Math.random();
    this.timeToChangeOrientation = Math.random();
    this.rW = (Math.random() - 0.5) * 10;
    this.rO = (Math.random() - 0.5) * 10;
  }

  protected setVelocity() {
    const speedWithRandomisation = this.speed * 
      (1 + ((this.speedRandomisation / 100) * Math.random() - this.speedRandomisation / 100));
    const rad = (this.movementDirection * Math.PI) / 180;
    this.vel.x = Math.cos(rad) * speedWithRandomisation;
    this.vel.y = -Math.sin(rad) * speedWithRandomisation;
  }

  update(deltaTime: number) {

    this.timeToRebirth += deltaTime;

    // Check if it's time to relocate the dot
    if (this.timeToRebirth >= this.lifeSpan) {
      // Reset position to random location
      this.timeToRebirth = 0;
      this.pos = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height
      };
    }
    // Update position
    this.pos.x += (this.vel.x * deltaTime) / 1000;
    this.pos.y += (this.vel.y * deltaTime) / 1000;

    // Handle random movement
    if (this.randomMovementType) {
      this.updateRandomMovement(deltaTime);
    }

    // Handle random orientation
    if (this.randomOrientationType) {
      this.updateRandomOrientation(deltaTime);
    }

    // Wrap around edges
    this.handleBounds();
  }

  protected updateRandomMovement(deltaTime: number) {
    this.movementDirection += (this.rW * deltaTime) / 1000;
    this.setVelocity();
    this.timeToChangeMovement += deltaTime / 1000;
    let d = 1 - this.timeToChangeMovement;
    if (d < 0) {
      this.rW = (Math.random() - 0.5) * 30;
      this.timeToChangeMovement = -d;
    }
  }

  protected updateRandomOrientation(deltaTime: number) {
    this.orientation += (this.rO * deltaTime) / 1000;
    this.orientation = ((this.orientation % 360) + 360) % 360;
    this.timeToChangeOrientation += deltaTime / 1000;
    if (this.timeToChangeOrientation >= 1) {
      this.rO = (Math.random() - 0.5) * 60;
      this.timeToChangeOrientation = 0;
    }
  }

  protected handleBounds() {
    // Wrap around edges
    if (this.pos.x < -this.size) {
      this.pos.x = this.canvas.width + this.size;
    } else if (this.pos.x > this.canvas.width + this.size) {
      this.pos.x = -this.size;
    }
    if (this.pos.y < -this.size) {
      this.pos.y = this.canvas.height + this.size;
    } else if (this.pos.y > this.canvas.height + this.size) {
      this.pos.y = -this.size;
    }

    // Handle fade out near edges if enabled
    if (this.fadeOut) {
      const d = Math.min(
        this.pos.x - this.size,
        this.pos.y - this.size,
        this.canvas.width - (this.pos.x + this.size),
        this.canvas.height - (this.pos.y + this.size)
      );
      if (d < this.canvas.width / 20) {
        this.alpha = d / (this.canvas.width / 20);
        if (this.alpha < 0) this.alpha = 0;
      } else {
        this.alpha = 1;
      }
    }
  }

  abstract draw(): void;
}

// Triangle implementation
class Triangle extends BaseObject {
  draw() {
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    
    const rad = (this.orientation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    
    // Define triangle points relative to center
    const points = [
      { x: -this.size/2, y: -this.size/2 },  // Left
      { x: -this.size/2, y: this.size/2 },   // Right
      { x: this.size, y: 0 }                 // Tip
    ];
    
    // Rotate and translate points
    const rotatedPoints = points.map(p => ({
      x: this.pos.x + (p.x * cos - p.y * sin),
      y: this.pos.y + (p.x * sin + p.y * cos)
    }));
    
    this.ctx.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
    this.ctx.lineTo(rotatedPoints[1].x, rotatedPoints[1].y);
    this.ctx.lineTo(rotatedPoints[2].x, rotatedPoints[2].y);
    this.ctx.closePath();
    
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

// Circle implementation
class Circle extends BaseObject {
  draw() {
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.size/2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

// Square implementation
class Square extends BaseObject {
  draw() {
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    
    const rad = (this.orientation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    
    // Define square points relative to center
    const points = [
      { x: -this.size/2, y: -this.size/2 },
      { x: this.size/2, y: -this.size/2 },
      { x: this.size/2, y: this.size/2 },
      { x: -this.size/2, y: this.size/2 }
    ];
    
    // Rotate and translate points
    const rotatedPoints = points.map(p => ({
      x: this.pos.x + (p.x * cos - p.y * sin),
      y: this.pos.y + (p.x * sin + p.y * cos)
    }));
    
    this.ctx.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
    for (let i = 1; i < rotatedPoints.length; i++) {
      this.ctx.lineTo(rotatedPoints[i].x, rotatedPoints[i].y);
    }
    this.ctx.closePath();
    
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
