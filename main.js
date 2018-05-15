//let PHI = (1 + Math.sqrt(5)) / 2;
var poly = [];
var poly3 = [];
var poly4 = [];

var stage = new Stage(document.getElementById("canvas"));

poly[0] = new Vertex(12, 20, 0);
poly[1] = new Vertex(90, 300, 0);
poly[2] = new Vertex(400, 70, 0);
poly[3] = new Vertex(300, 270, 0);
poly[4] = new Vertex(270, 370, 0);

stage.add(poly[0]);
//    draw_poly(poly);
    
// var midpoint = Vertex.midpoint(poly);

// // ctx.lineTo(midpoint.x, midpoint.y);
// // ctx.stroke();

// var poly2 = Vertex.monoscale(poly, 1.5);
// //    draw_poly(poly2);

// for (let i = 0; i < poly3.length; i++) {
//     poly3[i] = poly3[i].shift(midpoint);
// }

// for (let i = 0; i < poly4.length; i++) {
//     poly4[i] = poly4[i].shift(midpoint);
// }
// poly3 = Vertex.shift2(poly, {x:-300, y: -300, z:0});
// poly4 = Vertex.shift2(poly2, {x:-300, y: -300, z:0});
// draw_poly(poly3);
// draw_poly(poly4);
// // fns

function draw_poly(poly) {
    ctx.moveTo(poly[0].x, poly[0].y);
    console.log(poly.length);
    
    for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
        ctx.stroke();
    }
    ctx.lineTo(poly[0].x, poly[0].y);
    ctx.stroke();
}
    // poly[1].x = 6;
    // poly[1].y = 50;
    // poly[1].z = 0;

    // poly[2].x = -40;
    // poly[2].y = -20;
    // poly[2].z = 0;

    

    //     var spiral = new Spiral(225, 0.066);      
// }
// class Spiral{
    
//     constructor(length, pace){
//         this.length = length;
//         this.pace = pace;
//         this.ctx = getCanvas();
//         this.ctx.clearRect(0, 0, 1224, 768);
//         this.spiral = this.getPath();
//         let spiral2 = Spiral.translateEnd(this.spiral);
//         Spiral.tree(spiral2, 600, 400);
//         //Spiral.drawTree(spiral2, 600, 400, 26);
//     }
    
//     getPath(){
//         var spiralPath = [];
//         let r = Math.pow(PHI, 0);
//         let nX = 0;
//         let nY = -r;
//         spiralPath[0] = new Vertex(nX, nY, 0);
//         for(let i = 1; i < this.length; i++){
//             let phi = i * this.pace;
//             let r = Math.pow(PHI, (phi) * 2 / Math.PI);
//             let newX = Math.sin(phi) * r;
//             let newY = -Math.cos(phi) * r;
//             spiralPath[i] = new Vertex(newX, newY, 0);    
//         }
//         return spiralPath;
//     }
   
//     static drawSpiral(spiralArray, size, x, y){
//         ctx.beginPath();
//         ctx.moveTo(spiralArray[0].x + x, spiralArray[0].y + y);
//         for(let i = 1; i < spiralArray.length; i++){
//             ctx.lineTo(x + spiralArray[i].x, y + spiralArray[i].y);
//             ctx.stroke();
//         }
//     }
    
//     static translateEnd(V)
//         {
//             let B = [];
//             let v = new Vertex(V[V.length-1].x, V[V.length-1].y,V[V.length-1].z);
//             let transX = v.x;
//             let transY = v.y;
//             let transZ = v.z;
//             for (let i = 0; i < V.length - 1; i++){
//                 B[i] = new Vertex(V[i].x - transX, V[i].y - transY, V[i].z - transZ);
//             }
//             B[V.length -1] = new Vertex(0,0,0);
//             return B;
//         }
    
//     static translate( vertex, vector){
//         return new Vertex(vertex.x - vector.x, vertex.y - vector.y, 0);
//     }
//     static rotate(V, angle)
//     {
//         let B = [];
//         for (let i = 0; i < V.length - 1; i++){
//                 B[i] = V[i].rotZ(angle);
//             }
//         return B;
//     }
//     static drawTree(V, xx, yy, pace){
//         var U = [];
//         U = Spiral.mirror(V);
//         var left = function(cursor, x, y){ 
//             ctx.moveTo(x, y);
//             var newX;   // on linemap
//             var newY;   // on linemap
//             let translation = new Vector(V[cursor].x, V[cursor].y);
//             for(let i = cursor; i > 0 && i > cursor - pace; i--){
//                 let point = Spiral.translate(V[i], translation);
//                 newX = x + point.x;
//                 newY = y + point.y;
//                 ctx.lineTo(xx + newX, yy + newY);
//                 ctx.stroke();
//             }
//             if(cursor > pace)
//             {
//                 left(cursor - pace, newX, newY);
//                 right(cursor - pace, newX, newY);
//             }
//         }
//         var right = function(cursor, x, y){
//             ctx.moveTo(x, y);
//             var newX;   // on linemap
//             var newY;   // on linemap
//             let translation = new Vector(V[cursor].x, V[cursor].y);
//             let p1 = new Vector(V[cursor].x, V[cursor].y);
//             let p2 = new Vector(V[cursor - 1].x, V[cursor - 1].y);
//             let vector1 = Vector.getVector(p1, p2);
//             let angle1 = Vector.getAngle(vector1);
//             let p3 = new Vector(U[cursor].x, U[cursor].y);
//             let p4 = new Vector(U[cursor - 1].x, U[cursor - 1].y);
//             let vector2 = Vector.getVector(p3, p4);
//             let angle2 = Vector.getAngle(vector2);
//             let disc = angle1 - angle2;
//             for(let i = cursor; i > 0 && i > cursor - pace; i--){
//                 let point = Spiral.translate(V[i], translation).rotZ(disc);
//                 newX = x + point.x;
//                 newY = y + point.y;
//                 ctx.lineTo(xx + newX, yy + newY);
//                 ctx.stroke();
//             }
//             if(cursor > pace)
//             {
//                 left(cursor - pace, newX, newY);
//                 right(cursor - pace, newX, newY);
//             }
//         }
//         left(V.length - 1, 0, 0);
//         right(V.length - 1, 0, 0);
//     }
//     static tree(V, x, y)
//     {
//         var P = [];
//         var U = [];
//         var p = 26
//         if(V.length > p){
//             let a = V.length;
//             for(let i = 0; i < V.length - p; i++){
//                 P[i] = V[i];
//             }
//             let xx = V[V.length - p].x;
//             let yy = V[V.length - p].y;
//             let p1 = new Vector(V[V.length - p].x, V[V.length - p].y);
//             let p2 = new Vector(V[V.length - (p+1)].x, V[V.length - (p+1)].y);
//             let vector1 = Vector.getVector(p1, p2);
//             let angle1 = Vector.getAngle(vector1);
//             P = Spiral.translateEnd(P);
//             U = Spiral.mirror(P);
//             let p3 = new Vector(U[U.length - 1].x, U[U.length - 1].y);
//             let p4 = new Vector(U[U.length - 2].x, U[U.length - 2].y);
//             let vector2 = Vector.getVector(p3, p4);
//             let angle2 = Vector.getAngle(vector2); 
//             let disc = angle1 - angle2;
//             U = Spiral.rotate(U, disc);
//             Spiral.tree(P, x + xx, y + yy);
//             Spiral.tree(U, x + xx, y + yy);
//         }
//         Spiral.drawSpiral(V, 1, x, y)
//     }
    
//     static mirror(V){
//         var M = [];
//         for(let i = 0; i < V.length; i++){
//             M[i] = new Vertex(-V[i].x, V[i].y, 0);
//         }
//         return M;
//     }
// }

// class Vector{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//     }
    
//     static getVector(p1, p2){
//         let x = p2.x - p1.x;
//         let y = p2.y - p1.y;
//         return new Vector(x, y);
//     }
    
//     static getAngle(vector){
//         return Math.atan2(vector.y, vector.x);
//     }
//     scaleToOne(){
//         let a = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
//         return new Vector(a * this.x, a * this.y);
//     }
    
//     normal(){
//         return new Vector(-this.y, this.x);
//     }
// }