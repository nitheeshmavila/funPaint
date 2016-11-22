var dragging = false;
var canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var radius = 10;
ctx.lineWidth = radius*2;

var get_coordinates = function(e)
{
	return{'x': e.clientX, 'y': e.clientY};
}

var get_brush_color = function()
{
	var color = document.getElementById('brushcolor').value;
	return color;
}

var put_point = function(e)
{	
	var color = get_brush_color();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	if(dragging == true){
		ctx.lineTo(get_coordinates(e)['x'] , get_coordinates(e)['y']);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(get_coordinates(e)['x'] , get_coordinates(e)['y'],  radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}
}

var engage_mouse = function(e)
{
	dragging = true;
	put_point(e);
}

var disengage_mouse = function()
{
	dragging = false;
	ctx.beginPath();
}

var brush_draw = function()
{
	canvas.addEventListener('mousedown', engage_mouse);
	canvas.addEventListener('mousemove', put_point);
	canvas.addEventListener('mouseup', disengage_mouse);
}

var clear_canvas = function()
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}
         
var fill_canvas = function()
{
	var fill_color  = document.getElementById("fillcolor").value;
	ctx.fillStyle = fill_color;
	ctx.strokeStyle = fill_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
}

var get_file_width = function()
{
        var file_width = document.getElementById("filewidth").value;
        return file_width;
}

var get_file_height = function()
{
        var file_height = document.getElementById("fileheight").value;
        return file_height;
}

var print_file_image = function(e)
{	
	clear_canvas();
        var temp = URL.createObjectURL(e.target.files[0]);
	var image = new Image();
	image.src = temp;
	image.addEventListener("load", function()
	{	
		var width = get_file_width();
		var height = get_file_height();
		ctx.drawImage(image, 0, 0, width, height);
	});
	return;
}



var main = function()
{	
	document.getElementById("b1").addEventListener("click", brush_draw);
	document.getElementById("imagefile").addEventListener("change",print_file_image);
	document.getElementById("fillbucket").addEventListener("click",fill_canvas);
	document.getElementById("clear").addEventListener("click",clear_canvas);
	
}

window.addEventListener('load', main, false);
