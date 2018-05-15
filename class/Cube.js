class Cube 
{
    constructor(array, color) 
    {
        this.array = array;
        this.color = color;
    }

    draw(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.vertex_array[0].x, this.vertex_array[0].y);
        for (let i = 1; i < this.vertex_array.length; i++) {
            ctx.fillStyle = this.getColor();
            ctx.strokeStyle = this.getColor();
            ctx.lineTo(this.vertex_array[i].x, this.vertex_array[i].y);
            ctx.stroke();
        }
        ctx.fillStyle = this.getColor();
        ctx.lineTo(this.vertex_array[0].x, this.vertex_array[0].y);
        ctx.stroke();

    }
}