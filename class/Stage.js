class Stage {
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.canvas.width = width || this.canvas.width;
		this.canvas.height = height || this.canvas.height;
		this.ctx = this.canvas.getContext("2d");

		this.children = [];
		this.draw = this.draw.bind(this); // bind on selleks, et requestAnimationFrame võtaks Stage.Draw'i parameetrina, vastasel juhul võtaks requestAnimationFrame'i enda seest draw'i mida ei eksisteeri
		this.draw();
	}

	add(obj) {
		this.children.push(obj);
	}
	draw() {
		this.ctx.clearRect(0, 0 ,this.canvas.width, this.canvas.height); // joonistab koguaeg arrays olevaid objekte
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].draw(this.ctx);
		}
		requestAnimationFrame(this.draw);
	}
}
