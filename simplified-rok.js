var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ROKAnimation = /** @class */ (function () {
    function ROKAnimation(canvas, options) {
        if (options === void 0) { options = {}; }
        this.oobs = [];
        this.animationId = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Set default options
        var _a = options.numberOfObjects, numberOfObjects = _a === void 0 ? 300 : _a, _b = options.coherenceMovement, coherenceMovement = _b === void 0 ? 50 : _b, _c = options.coherentMovementDirection, coherentMovementDirection = _c === void 0 ? 0 : _c, _d = options.coherentOrientation, coherentOrientation = _d === void 0 ? 0 : _d, _e = options.coherenceOrientation, coherenceOrientation = _e === void 0 ? 50 : _e, _f = options.movementSpeed, movementSpeed = _f === void 0 ? 10 : _f, _g = options.objectSize, objectSize = _g === void 0 ? 2 : _g, _h = options.objectColor, objectColor = _h === void 0 ? 'white' : _h, _j = options.stimulusType, stimulusType = _j === void 0 ? 0 : _j, _k = options.movementSpeedRandomisation, movementSpeedRandomisation = _k === void 0 ? 0 : _k, _l = options.randomMovementType, randomMovementType = _l === void 0 ? 0 : _l, _m = options.randomOrientationType, randomOrientationType = _m === void 0 ? 0 : _m, _o = options.fadeOut, fadeOut = _o === void 0 ? 0 : _o, _p = options.lifeSpan, lifeSpan = _p === void 0 ? Infinity : _p;
        // Calculate numbers of coherent and random objects
        var nCoherentMovement = Math.round((coherenceMovement / 100) * numberOfObjects);
        var nIncoherentMovement = numberOfObjects - nCoherentMovement;
        var nCoherentOrientation = Math.round((coherenceOrientation / 100) * numberOfObjects);
        var nIncoherentOrientation = numberOfObjects - nCoherentOrientation;
        // Create movement and orientation arrays
        var orientations = [];
        var movements = [];
        // Fill arrays with coherent and random values
        for (var i = 0; i < nCoherentMovement; i++) {
            movements.push(coherentMovementDirection);
        }
        for (var i = 0; i < nIncoherentMovement; i++) {
            movements.push(Math.random() * 360);
        }
        for (var i = 0; i < nCoherentOrientation; i++) {
            orientations.push(coherentOrientation);
        }
        for (var i = 0; i < nIncoherentOrientation; i++) {
            orientations.push(Math.random() * 360);
        }
        // Shuffle arrays
        movements = this.shuffleArray(movements);
        orientations = this.shuffleArray(orientations);
        // Create objects
        for (var i = 0; i < numberOfObjects; i++) {
            // Convert percentages to actual sizes/speeds based on canvas
            var sizeInPixels = (canvas.width * objectSize) / 100;
            var speedInPixels = (canvas.width * movementSpeed) / 100;
            var oob = void 0;
            if (stimulusType === 0) {
                oob = new Triangle(sizeInPixels, objectColor, orientations[i], movements[i], speedInPixels, movementSpeedRandomisation, randomMovementType, randomOrientationType, fadeOut, lifeSpan, canvas, this.ctx);
            }
            else if (stimulusType === 1) {
                oob = new Circle(sizeInPixels, objectColor, orientations[i], movements[i], speedInPixels, movementSpeedRandomisation, randomMovementType, randomOrientationType, fadeOut, lifeSpan, canvas, this.ctx);
            }
            else {
                oob = new Square(sizeInPixels, objectColor, orientations[i], movements[i], speedInPixels, movementSpeedRandomisation, randomMovementType, randomOrientationType, fadeOut, lifeSpan, canvas, this.ctx);
            }
            this.oobs.push(oob);
        }
    }
    ROKAnimation.prototype.shuffleArray = function (array) {
        var _a;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        return array;
    };
    ROKAnimation.prototype.start = function () {
        var _this = this;
        if (this.animationId !== null)
            return;
        var animate = function (timestamp) {
            // Calculate delta time
            if (_this.previousTimestamp === undefined) {
                _this.previousTimestamp = timestamp;
            }
            var deltaTime = timestamp - _this.previousTimestamp;
            _this.previousTimestamp = timestamp;
            // Clear canvas
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            // Update and draw objects
            for (var _i = 0, _a = _this.oobs; _i < _a.length; _i++) {
                var oob = _a[_i];
                oob.update(deltaTime);
                oob.draw();
            }
            _this.animationId = requestAnimationFrame(animate);
        };
        this.animationId = requestAnimationFrame(animate);
    };
    ROKAnimation.prototype.stop = function () {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    };
    return ROKAnimation;
}());
// Base class for objects
var BaseObject = /** @class */ (function () {
    function BaseObject(size, color, orientation, movementDirection, speed, speedRandomisation, randomMovementType, randomOrientationType, fadeOut, lifeSpan, canvas, ctx) {
        this.size = size;
        this.color = color;
        this.orientation = orientation;
        this.movementDirection = movementDirection;
        this.speed = speed;
        this.speedRandomisation = speedRandomisation;
        this.randomMovementType = randomMovementType;
        this.randomOrientationType = randomOrientationType;
        this.fadeOut = fadeOut;
        this.lifeSpan = lifeSpan;
        this.canvas = canvas;
        this.ctx = ctx;
        this.alpha = 1;
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
    BaseObject.prototype.setVelocity = function () {
        var speedWithRandomisation = this.speed *
            (1 + ((this.speedRandomisation / 100) * Math.random() - this.speedRandomisation / 100));
        var rad = (this.movementDirection * Math.PI) / 180;
        this.vel.x = Math.cos(rad) * speedWithRandomisation;
        this.vel.y = -Math.sin(rad) * speedWithRandomisation;
    };
    BaseObject.prototype.update = function (deltaTime) {
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
    };
    BaseObject.prototype.updateRandomMovement = function (deltaTime) {
        this.movementDirection += (this.rW * deltaTime) / 1000;
        this.setVelocity();
        this.timeToChangeMovement += deltaTime / 1000;
        var d = 1 - this.timeToChangeMovement;
        if (d < 0) {
            this.rW = (Math.random() - 0.5) * 30;
            this.timeToChangeMovement = -d;
        }
    };
    BaseObject.prototype.updateRandomOrientation = function (deltaTime) {
        this.orientation += (this.rO * deltaTime) / 1000;
        this.orientation = ((this.orientation % 360) + 360) % 360;
        this.timeToChangeOrientation += deltaTime / 1000;
        if (this.timeToChangeOrientation >= 1) {
            this.rO = (Math.random() - 0.5) * 60;
            this.timeToChangeOrientation = 0;
        }
    };
    BaseObject.prototype.handleBounds = function () {
        // Wrap around edges
        if (this.pos.x < -this.size) {
            this.pos.x = this.canvas.width + this.size;
        }
        else if (this.pos.x > this.canvas.width + this.size) {
            this.pos.x = -this.size;
        }
        if (this.pos.y < -this.size) {
            this.pos.y = this.canvas.height + this.size;
        }
        else if (this.pos.y > this.canvas.height + this.size) {
            this.pos.y = -this.size;
        }
        // Handle fade out near edges if enabled
        if (this.fadeOut) {
            var d = Math.min(this.pos.x - this.size, this.pos.y - this.size, this.canvas.width - (this.pos.x + this.size), this.canvas.height - (this.pos.y + this.size));
            if (d < this.canvas.width / 20) {
                this.alpha = d / (this.canvas.width / 20);
                if (this.alpha < 0)
                    this.alpha = 0;
            }
            else {
                this.alpha = 1;
            }
        }
    };
    return BaseObject;
}());
// Triangle implementation
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Triangle.prototype.draw = function () {
        var _this = this;
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        var rad = (this.orientation * Math.PI) / 180;
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        // Define triangle points relative to center
        var points = [
            { x: -this.size / 2, y: -this.size / 2 }, // Left
            { x: -this.size / 2, y: this.size / 2 }, // Right
            { x: this.size, y: 0 } // Tip
        ];
        // Rotate and translate points
        var rotatedPoints = points.map(function (p) { return ({
            x: _this.pos.x + (p.x * cos - p.y * sin),
            y: _this.pos.y + (p.x * sin + p.y * cos)
        }); });
        this.ctx.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
        this.ctx.lineTo(rotatedPoints[1].x, rotatedPoints[1].y);
        this.ctx.lineTo(rotatedPoints[2].x, rotatedPoints[2].y);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    return Triangle;
}(BaseObject));
// Circle implementation
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.draw = function () {
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    return Circle;
}(BaseObject));
// Square implementation
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Square.prototype.draw = function () {
        var _this = this;
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        var rad = (this.orientation * Math.PI) / 180;
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        // Define square points relative to center
        var points = [
            { x: -this.size / 2, y: -this.size / 2 },
            { x: this.size / 2, y: -this.size / 2 },
            { x: this.size / 2, y: this.size / 2 },
            { x: -this.size / 2, y: this.size / 2 }
        ];
        // Rotate and translate points
        var rotatedPoints = points.map(function (p) { return ({
            x: _this.pos.x + (p.x * cos - p.y * sin),
            y: _this.pos.y + (p.x * sin + p.y * cos)
        }); });
        this.ctx.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
        for (var i = 1; i < rotatedPoints.length; i++) {
            this.ctx.lineTo(rotatedPoints[i].x, rotatedPoints[i].y);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    };
    return Square;
}(BaseObject));
