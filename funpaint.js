var down = false;
var x_pos;
var y_pos;
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");


var get_coordinates = function()
{
	var x_pos = e.clientX - canvas.offsetLeft;
        var y_pos = e.clientY - canvas.offsetTop;
	return {x: x_pos, y: y_pos};
}

var brush_draw = function()
{
	canvas.addEventListener('mousedown', function()
	{
		down = true;
		ctx.beginPath();
		ctx.moveTo(x_pos,y_pos);
		canvas.addEventListener('mousemove', draw);
	});

	canvas.addEventListener('mouseup', function()
	{
		down = false;
	});
	var draw = function()
	{
		var brush_size = document.getElementById("brushsize").value;
		var brush_color  = document.getElementById("brushcolor").value;
        	ctx.fillStyle = brush_color;
        	ctx.strokeStyle = brush_color;
		ctx.lineWidth = brush_size;
		var x_pos = e.clientX - canvas.offsetLeft;
        	var y_pos = e.clientY - canvas.offsetTop;
		if(down == true){
			ctx.lineTo(x_pos, y_pos);
			ctx.stroke();
		}
	}


}

var clear_canvas = function(e)
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var fill_canvas = function(e)
{
	var fill_color  = document.getElementById("fillcolor").value;
	ctx.fillStyle = fill_color;
	ctx.strokeStyle = fill_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}



document.getElementById("fillbucket").addEventListener("click",fill_canvas);
document.getElementById("clear").addEventListener("click",clear_canvas);
document.getElementById("b1").addEventListener("click", brush_draw);
document.getElementById("line").addEventListener("click", straight_line_draw);


