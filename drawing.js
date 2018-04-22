var ctx;
let PHI = (1 + Math.sqrt(5)) / 2;
var getCanvas = function(){
    var canvas = document.createElement("canvas");

    canvas.id = "cursorLayer";
    canvas.width = 1224;
    canvas.height = 768;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid black";

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    return ctx;
    }
window.onload = function(){
    
    ctx = getCanvas();
    ctx.beginPath();
    ctx.fillstyle = "rgba(255, 0, 0, 0.2)";
    var spiral = new Spiral(225, 0.066);      
}
class Spiral{
    
    constructor(length, pace){
        this.length = length;
        this.pace = pace;
        this.ctx = getCanvas();
        this.ctx.clearRect(0, 0, 1224, 768);
        this.spiral = this.getPath();
        let spiral2 = Spiral.translateEnd(this.spiral);
        Spiral.tree(spiral2, 600, 400);
        //Spiral.drawTree(spiral2, 600, 400, 26);
    }
    
    getPath(){
        var spiralPath = [];
        let r = Math.pow(PHI, 0);
        let nX = 0;
        let nY = -r;
        spiralPath[0] = new Vertex(nX, nY, 0);
        for(let i = 1; i < this.length; i++){
            let phi = i * this.pace;
            let r = Math.pow(PHI, (phi) * 2 / Math.PI);
            let newX = Math.sin(phi) * r;
            let newY = -Math.cos(phi) * r;
            spiralPath[i] = new Vertex(newX, newY, 0);    
        }
        return spiralPath;
    }
   
    static drawSpiral(spiralArray, size, x, y){
        ctx.beginPath();
        ctx.moveTo(spiralArray[0].x + x, spiralArray[0].y + y);
        for(let i = 1; i < spiralArray.length; i++){
            ctx.lineTo(x + spiralArray[i].x, y + spiralArray[i].y);
            ctx.stroke();
        }
    }
    
    static translateEnd(V)
        {
            let B = [];
            let v = new Vertex(V[V.length-1].x, V[V.length-1].y,V[V.length-1].z);
            let transX = v.x;
            let transY = v.y;
            let transZ = v.z;
            for (let i = 0; i < V.length - 1; i++){
                B[i] = new Vertex(V[i].x - transX, V[i].y - transY, V[i].z - transZ);
            }
            B[V.length -1] = new Vertex(0,0,0);
            return B;
        }
    
    static translate( vertex, vector){
        return new Vertex(vertex.x - vector.x, vertex.y - vector.y, 0);
    }
    static rotate(V, angle)
    {
        let B = [];
        for (let i = 0; i < V.length - 1; i++){
                B[i] = V[i].rotZ(angle);
            }
        return B;
    }
    static drawTree(V, xx, yy, pace){
        var U = [];
        U = Spiral.mirror(V);
        var left = function(cursor, x, y){ 
            ctx.moveTo(x, y);
            var newX;   // on linemap
            var newY;   // on linemap
            let translation = new Vector(V[cursor].x, V[cursor].y);
            for(let i = cursor; i > 0 && i > cursor - pace; i--){
                let point = Spiral.translate(V[i], translation);
                newX = x + point.x;
                newY = y + point.y;
                ctx.lineTo(xx + newX, yy + newY);
                ctx.stroke();
            }
            if(cursor > pace)
            {
                left(cursor - pace, newX, newY);
                right(cursor - pace, newX, newY);
            }
        }
        var right = function(cursor, x, y){
            ctx.moveTo(x, y);
            var newX;   // on linemap
            var newY;   // on linemap
            let translation = new Vector(V[cursor].x, V[cursor].y);
            let p1 = new Vector(V[cursor].x, V[cursor].y);
            let p2 = new Vector(V[cursor - 1].x, V[cursor - 1].y);
            let vector1 = Vector.getVector(p1, p2);
            let angle1 = Vector.getAngle(vector1);
            let p3 = new Vector(U[cursor].x, U[cursor].y);
            let p4 = new Vector(U[cursor - 1].x, U[cursor - 1].y);
            let vector2 = Vector.getVector(p3, p4);
            let angle2 = Vector.getAngle(vector2);
            let disc = angle1 - angle2;
            for(let i = cursor; i > 0 && i > cursor - pace; i--){
                let point = Spiral.translate(V[i], translation).rotZ(disc);
                newX = x + point.x;
                newY = y + point.y;
                ctx.lineTo(xx + newX, yy + newY);
                ctx.stroke();
            }
            if(cursor > pace)
            {
                left(cursor - pace, newX, newY);
                right(cursor - pace, newX, newY);
            }
        }
        left(V.length - 1, 0, 0);
        right(V.length - 1, 0, 0);
    }
    static tree(V, x, y)
    {
        var P = [];
        var U = [];
        var p = 26
        if(V.length > p){
            let a = V.length;
            for(let i = 0; i < V.length - p; i++){
                P[i] = V[i];
            }
            let xx = V[V.length - p].x;
            let yy = V[V.length - p].y;
            let p1 = new Vector(V[V.length - p].x, V[V.length - p].y);
            let p2 = new Vector(V[V.length - (p+1)].x, V[V.length - (p+1)].y);
            let vector1 = Vector.getVector(p1, p2);
            let angle1 = Vector.getAngle(vector1);
            P = Spiral.translateEnd(P);
            U = Spiral.mirror(P);
            let p3 = new Vector(U[U.length - 1].x, U[U.length - 1].y);
            let p4 = new Vector(U[U.length - 2].x, U[U.length - 2].y);
            let vector2 = Vector.getVector(p3, p4);
            let angle2 = Vector.getAngle(vector2); 
            let disc = angle1 - angle2;
            U = Spiral.rotate(U, disc);
            Spiral.tree(P, x + xx, y + yy);
            Spiral.tree(U, x + xx, y + yy);
        }
        Spiral.drawSpiral(V, 1, x, y)
    }
    
    static mirror(V){
        var M = [];
        for(let i = 0; i < V.length; i++){
            M[i] = new Vertex(-V[i].x, V[i].y, 0);
        }
        return M;
    }
}

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    
    static getVector(p1, p2){
        let x = p2.x - p1.x;
        let y = p2.y - p1.y;
        return new Vector(x, y);
    }
    
    static getAngle(vector){
        return Math.atan2(vector.y, vector.x);
    }
    scaleToOne(){
        let a = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector(a * this.x, a * this.y);
    }
    
    normal(){
        return new Vector(-this.y, this.x);
    }
}