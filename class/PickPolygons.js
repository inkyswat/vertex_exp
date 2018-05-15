class PickPolygons
{
	constructor()
	{
		this.mouselocation = 0;
		this.polygons = [];
	}	
	
	pushpolygons(mouseX, mouseY)
	{
		this.polygons.push(new Vertex(mouseX, mouseY));
		return this.polygons.length;
	}
}