function log( msg )
{
    var e= document.getElementById("logpara");
    e.innerText+= `${msg}\n`;
}

function info(msg)
{
    var e= document.getElementById("infopara");
    e.innerText= `${msg}\n`;
}

var cellSize= 20;
var lastTimeMs= 0;

var presses= [];

function animate(timeMs)
{
    var ts= timeMs- lastTimeMs;


    var e= document.getElementById("canv");
    var ctx= e.getContext("2d");

    presses.forEach( p => { p.time+= (ts/1000); } );

    presses= presses.filter( p => p.time <1 );

    // info(e.offsetWidth);

//    e.height= e.offsetWidth;
    ctx.lineWidth= 1;
    ctx.fillStyle= 'red';
    ctx.fillRect(0,0,e.width,e.height);

    ctx.strokeStyle= 'white';

    ctx.beginPath();
    for( let x= 0; x< e.width; x+=cellSize )
    {
        ctx.moveTo(10,10 + x);
        ctx.lineTo(e.width-10,10+x);
    }

    for( let y= 0; y< e.height; y+=cellSize )
    {
        ctx.moveTo(10+y,10);
        ctx.lineTo(10+y, e.height-10 );
    }    

    ctx.stroke();

    ctx.fillStyle= 'blue';

    presses.forEach( p => {
        ctx.fillRect(p.x*cellSize + 10 ,p.y*cellSize + 10,cellSize,cellSize);
    } );

    info(`${(e.width-20)/cellSize}  ts: ${ts}   `);

    lastTimeMs= timeMs;
    requestAnimationFrame(animate);
}

function cellSizeChange()
{
    var e= document.getElementById("cellSize");
    cellSize= parseInt(e.value);
}

function canvasSizeChange()
{
    var e= document.getElementById("canvasSize");
    var cs= parseInt(e.value);
    
    var ec= document.getElementById("canv");
    ec.width= cs;
    ec.height= cs;
}

console.log("started ***********************************************************");


var e= document.getElementById("cellSize");
e.addEventListener("input", ()=>cellSizeChange());


e= document.getElementById("canvasSize");
e.addEventListener("input", ()=>canvasSizeChange());


e= document.getElementById("canv");
e.addEventListener( "mousedown", (ev) => {

    if( ev.button == 0 )
    {
        var mx= ev.offsetX, my= ev.offsetY;
        presses.push({x:Math.floor((mx-10)/cellSize), y:Math.floor((my-10)/cellSize), time:0});
    }
} );

animate(0);

