class Verticle
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        // this.col = color(255, 255, 255);
        this.display = function()
        {
            stroke(this.col);
            fill(this.col);
            strokeWeight(2);
            point(this.x, this.y);
        };
    }
}