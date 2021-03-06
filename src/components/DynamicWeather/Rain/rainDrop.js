import randomRange from "../Utility";

let rainColor = 'rgba(255, 255, 255, .4)';

class RainDrop {
    constructor(canvas, context) {
        this.type = 'rain_drop';
        this.width = 3;
        this.height = randomRange(15, 25);
        this.canvas = canvas;
        this.x = randomRange(0, canvas.width);
        this.y = -10;
        this.context = context;

        this.xVelocity = 0;
        this.yVelocity = 8;
    }

    draw() {
        this.y += this.yVelocity;
        this.context.fillStyle = rainColor;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        return true;
    };
}


export default RainDrop;
