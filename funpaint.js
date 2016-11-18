
var draw_line = function()
{	
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(138, 250);
	ctx.stroke();
}

var clear_canvas = function()
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}


var get_coorrdinate = function(event)
{
	var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;
	return {x: x, y: y};
}


var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
document.getElementById("line").addEventListener("click", draw_line);
document.getElementById("clear").addEventListener("click",clear_canvas);



