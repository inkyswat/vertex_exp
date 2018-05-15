class Vertex
    {        
        static rad(){return 0.017453292519943295};//Math.PI / 180};
        constructor(x, y, z) {
            if (typeof (y) === 'undefined') 
            {
                if (typeof (x.x) === 'undefined') 
                { // testib, et pole punktiga notatsioon, et pole objekt
                    this.x = x[0],//[0],
                    this.y = x[1],//[1],
                    this.z = x[2];//[2];   
                }

                else 
                {
                    this.x = x.x,//[0],
                    this.y = x.y,//[1],
                    this.z = x.z;//[2];       
                }
            }

            else 
            {
                this.x = x,
                this.y = y,
                this.z = z
            };
        }
        static custom(P)
        {
             if (typeof(P.x) === 'undefined')
            {
                return {x:P[0], y:P[1], z:P[2]};
            }

            else 
            {
                return P;
            }
        }
        static add(v1, v2)
        {
            let V1 = Vertex.custom(v1),
                V2 = Vertex.custom(v2);    
            //return new Vertex(V1.x + V2.x, V1.y + V2.y, V1.z + V2.z);
            return {x: V1.x + V2.x, y: V1.y + V2.y, z: V1.z + V2.z};
        }
        static divide(V1, V2)
            {
                let A = Vertex.custom(V1),
                    B = Vertex.custom(V2);
                return {x: A.x / B.x, y: A.y / B.y, z: A.z / B.z};
            }
        static vector(beginP,endP)
        {
            let a = Vertex.custom(beginP), 
                b = Vertex.custom(endP);
            
            return {x: b.x - a.x ,y: b.y - a.y ,z: b.z - a.z};
        }
        
        static translateEnd(V)
        {
            /*
            let B = [];
            let v = new Vertex(V[V.length-1].x, V[V.length-1].y,V[V.length-1].z);
            let transX = v.x;
            let transY = v.y;
            let transZ = v.z;
            for (i = 0; i < V.length - 1; i++){
                B[i] = new Vertex(V[i].x - transX, V[i].y - transY, V[i].z - transZ);
            }
            B[V.length -1] = new Vertex(0,0,0);
            return B;
            */
        }
        
        static cAngle(p1, p2) // static tähendab, saab kõikide objektide pea. statickul pole individuaalset parameetrit
        { 
            let v = Vertex.scale(0.5,Vertex.vector(p1, p2));
            let ll = v.x * v.x + v.y * v.y + v.z * v.z;
            return 2 * Math.atan(Math.sqrt(ll / 3));
        }
        static scale(a, p)
        {
            let P = Vertex.custom(p);
            return new Vertex(P.x * a, P.y * a, P.z * a);
        }
        static midpoint(PolyV) // leiab polygonide keskpunkti
        {
            let x = PolyV[0].x,
                y = PolyV[0].y,
                z = PolyV[0].z;
            let i;
            for(i = 1; i < PolyV.length; i++)
            {
                x += PolyV[i].x,
                y += PolyV[i].y,
                z += PolyV[i].z;
            }
            //return {x : x / i, y : y / i, z : z / i};
            return new Vertex(x / i, y / i, z / i);
        }
        static shift2(Parr, Pref)
        {
            let convey = [];
            for(let i = 0; i < Parr.length; i++)
            {
                convey[i] = {x : Parr[i].x - Pref.x, y : Parr[i].y - Pref.y, z : Parr[i].z - Pref.z};   
            }
            return convey;
        }
        static monoscale(Arr, x)
        {
            let convey = [];
            for(let i = 0; i < Arr.length; i++)
            {
                convey[i] = {x : Arr[i].x * x, y : Arr[i].y * x, z : Arr[i].z * x};   
            }
            return convey;
        }

        monoscale(x)
        {
            this.x = this.x * x;
            this.y = this.y * x;
            this.z = this.z * x;
        }

        static dist(A, B)
        {
            let V;
            if(typeof(B) === 'undefined')
            {
                V = Vertex.custom(A);
            }
            else
            {
                V = Vertex.vector(A, B);
            }
            return Math.sqrt(V.x * V.x + V.y * V.y + V.z * V.z);
        }
        static normal(v1,v2)// Kahele vektorile normaalvektori leidmine
            { //third point is 0,0,0 - both vectors there
                let a = v1.y * v2.z - v1.z * v2.y;
                let b = -(v1.x * v2.z - v1.z * v2.x);
                let c = v1.x * v2.y - v1.y * v2.x;
                return {x:a,y:b,z:c};
            }
        static plane(p1, p2, p3)// PLANE parameters by 3 points
            { // tagastab normaalvektori – kolm punkti sisendiks
                let V1 = Vertex.vector(p1, p2);//{x:p2.x - p1.x, y:p2.y - p1.y, z:p2.z - p1.z};
                let V2 = Vertex.vector(p1, p3);//{x:p3.x - p1.x, y:p3.y - p1.y, z:p3.z - p1.z};
                let N = Vertex.normal(V1, V2);
                return N;
            }
        static tangent(N, p1, l1)
            {
                let num = N.x * p1.x + N.y * p1.y + N.z * p1.z;
                let den = N.x * l1.x + N.y * l1.y + N.z * l1.z;
                let t = num / den;
                return t;
            }
        static planeInt(Plane, A, B)//INTERSECTION line parametric form
            {
                let beam = Vertex.vector(A,B);
                let num = Plane.x * A.x + Plane.y * A.y + Plane.z * A.z;
                let den = Plane.x * beam.x + Plane.y * beam.y + Plane.z * beam.z;
                let t = num / (-den);
                let point = [A.x + t * beam.x, A.y + t * beam.y, A.z + t * beam.z];
                return point;
            }
        set(x, y, z)
        {
            this.x = x,
            this.y = y,
            this.z = z;
        }
        shift(P) // punkt mille suhtes kujundit nihutada 
        {
            return new Vertex(this.x - P.x, this.y - P.y, this.z - P.z);
        }
        pan(x, y, z)
        {
            this.set(this.x + x, this.y + y, this.z + z);
        }
        add(V) // annad ette vektori objektina { x:, y:, z: }, pmst sama mis pan, kuid saab vertex objektina sisestada
        {
            this.set(this.x + V.x, this.y + V.y, this.z + V.z);
        }

        subtract(V)
        {
            this.set(this.x - V.x, this.y - V.y, this.z - V.z);    
        }
        scalar(x, y, z) // korrutab läbi
        {
            return new Vertex(
            x * this.x,
            y * this.y,
            z * this.z
            );
        }
        /*
        scalar(v){
            this.set(this.x * v, this.y * v, this.z * v);
        }*/
        rotX(theta)
        {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            return new Vertex(
                x,
                Math.cos(theta) * y - Math.sin(theta) * z,
                Math.sin(theta) * y + Math.cos(theta) * z
            );
        }
        rotY(theta)
        {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            return new Vertex(
                Math.cos(theta) * x - Math.sin(theta) * z,
                y,
                Math.sin(theta) * x + Math.cos(theta) * z
            );
        }
        rotZ(theta){
            var x = this.x;
            var y = this.y;
            var z = this.z;
            return new Vertex(
                Math.cos(theta) * x - Math.sin(theta) * y,
                Math.sin(theta) * x + Math.cos(theta) * y,
                z
            );
        }  
        project(depth){ // input for z coordinate
        return new Verticle(this.x/depth,this.y/depth);
        }


        // minu lisatud
        shiftPlus(P) // punkt mille suhtes kujundit 
        {
            return new Vertex(this.x + P.x, this.y + P.y, this.z + P.z);
        }

    }