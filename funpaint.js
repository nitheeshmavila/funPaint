var canvas = document.getElementById("canvas1"),
    ctx = canvas.getContext("2d"), 
    dragging = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var get_coordinates = function(e)
{
	return{'x': e.clientX, 'y': e.clientY};
}

var get_brush_color = function()
{
	var color = document.getElementById('brushcolor').value;
	return color;
}

var get_line_width = function()
{
	var width = document.getElementById('linewidth').value;
	return width;	
}


var brush_draw = function(e)
{
	var color = get_brush_color();
	ctx.lineWidth = get_line_width();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	if(dragging == true){
		ctx.lineTo(get_coordinates(e)['x'] , get_coordinates(e)['y']);	
		ctx.stroke();
	}
}

var pencil_draw = function(e)
{
        ctx.lineWidth = 0.5;
        if(dragging == true){
                ctx.lineTo(get_coordinates(e)['x'] , get_coordinates(e)['y']);
                ctx.stroke();

        }
}


var engage_mouse = function(e)
{
	dragging = true;
	ctx.beginPath();
	ctx.moveTo(get_coordinates(e)['x'] , get_coordinates(e)['y']);
}

var disengage_mouse = function()
{
	dragging = false;
}

var draw = function(drawing_function)
{
	canvas.addEventListener('mousedown', engage_mouse);
	canvas.addEventListener('mousemove', drawing_function);
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

var save_image = function()
{
        var data = canvas.toDataURL();
        window.open(data, '_blank', 'location=0, menubar=0');
}
var main = function()
{	
	document.getElementById("pencil").addEventListener("click", draw(pencil_draw));
	document.getElementById("b1").addEventListener("click", draw(brush_draw));
        document.getElementById("save").addEventListener("click", save_image);
        document.getElementById("imagefile").addEventListener("change",print_file_image);
        document.getElementById("fillbucket").addEventListener("click",fill_canvas);
        document.getElementById("clear").addEventListener("click",clear_canvas);
}

window.addEventListener('load', main, false);
                                                
