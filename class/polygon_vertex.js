class Polygon_vertex extends Shape
{
    constructor(vertex_array, color) 
    {
        super(0, 0, color);
        this.vertex_array = vertex_array;
    }

    draw(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.vertex_array[0].x, this.vertex_array[0].y);
        for (let i = 1; i < this.vertex_array.length; i++) 
        {
            ctx.fillStyle = this.getColor();
            ctx.strokeStyle = this.getColor();
            ctx.lineTo(this.vertex_array[i].x, this.vertex_array[i].y);
            ctx.stroke();
        }
        ctx.fillStyle = this.getColor();
        ctx.lineTo(this.vertex_array[0].x, this.vertex_array[0].y);
        ctx.stroke();

    }

    static clone(obj, color) // dependant on vertex.js
    {
        var vertex_array = [];
        for (var i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, 0);
        }
        var Polygon_vertexClone = new Polygon_vertex(vertex_array, color);
        return Polygon_vertexClone;
    }

    static scalar(obj, x, y)
    {
        for (var i = 0; i < obj.vertex_array.length; i++)
        {
            obj.vertex_array[i] = obj.vertex_array[i].scalar(x, y, 0);
        }
    }

    static pan(obj, x, y)
    {
        for (var i = 0; i < obj.vertex_array.length; i++) {
            obj.vertex_array[i].pan(x, y, 0);
        }
    }

    static pan_trail(stage, obj, objs_to_create, x_mult, y_mult, color) // vektor in degrees
    {        
        var obj_array = [];
        for (let i = 0; i < objs_to_create; i++) {
            obj_array[i] = this.clone(obj, color);
            this.scalar(obj_array[i], i*x_mult, i*y_mult);
            stage.add(obj_array[i]);
        }
    }

    static mv(obj, objs_to_create) // input obj is Polygon_vertex object
    {
        var objs_to_create = 50;
        //wheels.splice(0, objs_to_create);
        //	if (wheels.length != 0) {
        //		wheels.splice(0, objs_to_create);
        //	console.log(wheels);
        //	}
        var obj_array = [];
        for (var i = 0; i < objs_to_create; i++) 
        {
            obj.vertex_array[i].x = parseInt(r + Math.random() * (canvas.width - 2 * r)); // et pall tekiks canvase alass on vaja ruudu laius maha lahutada
            obj.vertex_array[i].y = parseInt(r + Math.random() * (canvas.height - 2 * r));
            var MoveSpeed = 0.5 + parseInt(Math.random() * 0);
            //var direction = 360 * Math.random();
            var Accel = Math.random() * 0.01;
            var ScaleChange = Math.random() * 1.3 - 1.4;
            obj_array[i] = (new Pol_ver_mv(x, y, MoveSpeed, ScaleChange, direction, Accel));

        }
        wheels_set[wheels_set_counter] = wheels;
        wheels_set_counter++;

    }
    static rotX(obj, theta)
    {
        var obj_array = [];
        var vertex_array = [];
        var buff_array = [];
        for (let i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, 0);
            obj.vertex_array[i] = vertex_array[i].rotX(theta)
            
        }
    }

    static rotY(obj, theta) 
    {
        var obj_array = [];
        var vertex_array = [];
        var buff_array = [];
        for (let i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, 0);
            obj.vertex_array[i] = vertex_array[i].rotY(theta)

        }
    }

    static rotZ(obj, theta) 
    {
        var obj_array = [];
        var vertex_array = [];
        var buff_array = [];
        for (let i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, 0);
            obj.vertex_array[i] = vertex_array[i].rotZ(theta)
        }
    }
}
