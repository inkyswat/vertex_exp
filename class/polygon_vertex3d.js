class Polygon_vertex3d extends Shape
{
    constructor(vertex_array, color) 
    {
        super(0, 0, color);
        this.vertex_array = vertex_array;
    }

    draw(ctx)
    {
        ctx.beginPath();
        {
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

    static clone(obj, color) // dependant on vertex.js
    {
        var vertex_array = [];
        for (var i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, obj.vertex_array[i].z);
        }
        var Polygon_vertex3dClone = new Polygon_vertex3d(vertex_array, color);
        return Polygon_vertex3dClone;
    }

    static monoscale(obj, x) // millegi pärast keerab rotX ja rotY pekki kui loop'ida koos
    { // uus idee Midpoint keerab nahka, kuna kokku pressituna raadius on väiksem ja theta hulk keeramisega vähendab iga korraga raadiust
        var vertex_array = [];
        var vertex_array_mid;
        var zero_offset = [];
        vertex_array_mid = Polygon_vertex3d.midpoint(obj);
        vertex_array_mid.x = parseInt(vertex_array_mid.x);
        vertex_array_mid.y = parseInt(vertex_array_mid.y);
        vertex_array_mid.z = parseInt(vertex_array_mid.z);

        for (var i = 0; i < obj.vertex_array.length; i++)
        {
            zero_offset[i] = obj.vertex_array[i].shift(vertex_array_mid);
            vertex_array[i] = new Vertex(zero_offset[i].x * x, zero_offset[i].y * x, zero_offset[i].z * x);   
            obj.vertex_array[i] = vertex_array[i].shiftPlus(vertex_array_mid);
        }
    
    }

    static pan(obj, x, y, z)
    {
        for (var i = 0; i < obj.vertex_array.length; i++) 
        {
            obj.vertex_array[i].pan(x, y, z);
        }
    }


    static mv(obj, objs_to_create) // input obj is Polygon_vertex3d object
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
        var vertex_array = [];
        var vertex_array_mid;
        var zero_offset = [];
        vertex_array_mid = Polygon_vertex3d.midpoint(obj);
        vertex_array_mid.x = parseInt(vertex_array_mid.x);
        vertex_array_mid.y = parseInt(vertex_array_mid.y);
        vertex_array_mid.z = parseInt(vertex_array_mid.z);

        for (let i = 0; i < obj.vertex_array.length; i++) 
        {
            zero_offset[i] = obj.vertex_array[i].shift(vertex_array_mid);
            vertex_array[i] = zero_offset[i].rotX(theta);
            obj.vertex_array[i] = vertex_array[i].shiftPlus(vertex_array_mid);
        }
    }


    static rotY(obj, theta) 
    {
        var vertex_array = [];
        var vertex_array_mid;
        var zero_offset = [];
        vertex_array_mid = Polygon_vertex3d.midpoint(obj);
        vertex_array_mid.x = parseInt(vertex_array_mid.x);
        vertex_array_mid.y = parseInt(vertex_array_mid.y);
        vertex_array_mid.z = parseInt(vertex_array_mid.z);
        
        for (let i = 0; i < obj.vertex_array.length; i++) 
        {
            zero_offset[i] = obj.vertex_array[i].shift(vertex_array_mid);
            vertex_array[i] = zero_offset[i].rotY(theta);
            obj.vertex_array[i] = vertex_array[i].shiftPlus(vertex_array_mid);
        }
        
    }



    static rotZ(obj, theta) 
    {
        var vertex_array = [];
        var vertex_array_mid;
        var zero_offset = [];
        vertex_array_mid = Polygon_vertex3d.midpoint(obj);
        vertex_array_mid.x = parseInt(vertex_array_mid.x);
        vertex_array_mid.y = parseInt(vertex_array_mid.y);
        vertex_array_mid.z = parseInt(vertex_array_mid.z);

        for (let i = 0; i < obj.vertex_array.length; i++) 
        {
            zero_offset[i] = obj.vertex_array[i].shift(vertex_array_mid);
            vertex_array[i] = zero_offset[i].rotZ(theta);
            obj.vertex_array[i] = vertex_array[i].shiftPlus(vertex_array_mid);
        }
    }

    static midpoint(obj)
    {
        var vertex_array = [];
        for (var i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, obj.vertex_array[i].z);
        }
        return Vertex.midpoint(vertex_array);        
    }

    static shift(obj, P) // P => point as vertex
    {
        var vertex_array = [];
        for (var i = 0; i < obj.vertex_array.length; i++) 
        {
            vertex_array[i] = new Vertex(obj.vertex_array[i].x, obj.vertex_array[i].y, obj.vertex_array[i].y);
            obj.vertex_array[i] = vertex_array[i].shift(P);
        }
    }


    static pan_trail(stage, obj, objs_to_create, x_mult, y_mult, z_mult, color) // vektor in degrees
    {
        var obj_array = [];
        for (let i = 0; i < objs_to_create; i++)
        {
            obj_array[i] = this.clone(obj, color);
            this.scalar(obj_array[i], i * x_mult, i * y_mult, i * z_mult);
            stage.add(obj_array[i]);
        }
    }
    projection3d(obj, depth)
    {
        for(let i = 0; i < obj.vertex_array.length; i++) 
        {
            cube_polygons[i] = obj.vertex_array[i].project(depth);

        }
    }


}
