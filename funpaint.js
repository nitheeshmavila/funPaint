var canvas = document.getElementById("canvas1"),
    ctx = canvas.getContext("2d"), 
    dragging = false,
    drag_start_location = {};
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var get_coordinates = function(e)
{
	return{'x': e.clientX, 'y': e.clientY};
}

var get_line_color = function()
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
	var color = get_line_color();
	ctx.lineWidth = get_line_width();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	if(dragging == true){
		ctx.lineTo(get_coordinates(e)['x'] , get_coordinates(e)['y']);	
		ctx.stroke();
	}
}

var get_eraser_size = function()
{	
	var eraser_size = document.getElementById('erasersize').value;
        return eraser_size; 
}   

var eraser = function(e)
{
	alert("inside eraserr");
        ctx.lineWidth = get_eraser_size();
        ctx.fillStyle = "white"
        ctx.strokeStyle = "white"
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

var filled_circle_draw = function(e)
{
	var current_pos = get_coordinates(e),
            radius = Math.sqrt(Math.pow((drag_start_location['x'] - current_pos['x']), 2) + 
                     Math.pow((drag_start_location['y'] - current_pos['y']), 2));
    	if(dragging == true){
		ctx.beginPath();
		var fill_color = get_fill_color();
		ctx.fillStyle = fill_color;
		ctx.strokeStyle = fill_color;
    		ctx.arc(drag_start_location['x'], drag_start_location['y'], radius, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

var line_draw = function(e)
{
	ctx.beginPath();
	ctx.moveTo(drag_start_location['x'], drag_start_location['y']);
	ctx.lineTo(get_coordinates(e)['x'], get_coordinates(e)['y']);
	ctx.stroke();
}
var circle_draw = function(e)
{
	var circumference_point = get_coordinates(e), 
            radius = Math.sqrt(Math.pow((drag_start_location['x'] - circumference_point['x']), 2) +
                     Math.pow((drag_start_location['y'] - circumference_point['y']), 2));
        ctx.beginPath();
        var fill_color = get_line_color();
        ctx.fillStyle = fill_color;
        ctx.strokeStyle = fill_color;
        ctx.arc(drag_start_location['x'], drag_start_location['y'], radius, 0, 2 * Math.PI, false);
}        

var start_mouse = function(e)
{
        drag_start_location = get_coordinates(e);
}

var draw2 = function(drawing_function)
{
	canvas.addEventListener('mousedown', start_mouse);
        canvas.addEventListener('mouseup', drawing_function);	
}	
	
var engage_mouse = function(e)
{
	dragging = true;
	drag_start_location = get_coordinates(e);
	ctx.beginPath();
	ctx.moveTo(get_coordinates(e)['x'] , get_coordinates(e)['y']);
}

var disengage_mouse = function()
{
	dragging = false;
}

var draw1 = function(drawing_function)
{
	canvas.addEventListener('mousedown', engage_mouse);
	canvas.addEventListener('mousemove', drawing_function);
	canvas.addEventListener('mouseup', disengage_mouse);
}

var clear_canvas = function()
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var get_fill_color = function()
{
	var fill_color =  document.getElementById("fillcolor").value;
        return fill_color;
}

var fill_canvas = function()
{
 	var fill_color = get_fill_color();
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

        document.getElementById("save").addEventListener("click", save_image);
        document.getElementById("imagefile").addEventListener("change",print_file_image);
        document.getElementById("fillbucket").addEventListener("click",fill_canvas);
        document.getElementById("clear").addEventListener("click",clear_canvas);
}

window.addEventListener('load', main, false);
                                                
