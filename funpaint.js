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

var get_brush_size = function()
{	
	var brush_size = document.getElementById("brushsize").value;
	return brush_size;
}

var get_color = function()
{
	var brush_color  = document.getElementById("brushcolor").value;
	return brush_color;
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
	var draw = function(e)
	{
		
		var color = get_color();
        	ctx.fillStyle = color;
        	ctx.strokeStyle = color;
		ctx.lineWidth = get_brush_size();
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

var pencil_draw = function()
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
	
        var draw = function(e)
        {

                var color = get_color();
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.1;
		ctx.lineCap = "round";
                var x_pos = e.clientX - canvas.offsetLeft;
                var y_pos = e.clientY - canvas.offsetTop;
                if(down == true){
                        ctx.lineTo(x_pos, y_pos);
                        ctx.stroke();
                }
	}
}
          
var fill_canvas = function(e)
{
	var fill_color  = document.getElementById("fillcolor").value;
	ctx.fillStyle = fill_color;
	ctx.strokeStyle = fill_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}

document.getElementById("imagefile").addEventListener("change", function(e)
{
	var temp = URL.createObjectURL(e.target.files[0]);
	var image = new Image();
	image.src = temp;
	image.addEventListener("load", function()
	{
		ctx.drawImage(image, 0, 0);
	});
});

document.getElementById("fillbucket").addEventListener("click",fill_canvas);
document.getElementById("clear").addEventListener("click",clear_canvas);
document.getElementById("b1").addEventListener("click", brush_draw);
/*document.getElementById("line").addEventListener("click", straight_line_draw);*/
document.getElementById("p1").addEventListener("click", pencil_draw);

