var yyy = document.getElementById('xxx') ;
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)

listenToMouse(yyy)

var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    // actions.className = 'actions'
}

green.onclick =()=>{
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')

}
red.onclick =()=>{
    context.fillStyle = 'red'
    context.strokeStyle = 'red'

    green.classList.remove('active')
    red.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick =()=>{
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'

    green.classList.remove('active')
    red.classList.remove('active')
    blue.classList.add('active')
}

function autoSetCanvasSize(canvas){
    setCanvasSize()

    window.onresize = function(){

        setCanvasSize()
    }

    function setCanvasSize(){
        var pageWidth  = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height =pageHeight
    }
}

function drawCircle(x,y,radius){
    context.beginPath()
    // context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI * 2)
    context.fill()
}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    // context.strokeStyle = 'black'
    context.moveTo(x1,y1)
    context.lineWidth = 5
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}


function listenToMouse(canvas){
    var using = false
    var lastPoint = {
        x : undefined,
        y : undefined
    }
    //功能特性检测
    if(document.body.ontouchstart !== undefined){

// debugger
        canvas.ontouchstart = (aaa)=>{
            var x = aaa.touches[0].clientX
            // console.log(aaa)
            var y = aaa.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {
                    "x":x,
                    "y":y
                }
            }
        }
        canvas.ontouchmove =(aaa)=>{
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            console.log(x)
            if(!using){retuen}

            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {
                    "x":x,
                    "y":y
                }   
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y) 
                lastPoint = newPoint
            }
        }
        canvas.ontouched = (aaa)=>{
            using= false
        }

    }else{
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {
                    "x":x,
                    "y":y
                }
            }
        }
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY

            console.log(x)
            if(!using){retuen}

            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {
                    "x":x,
                    "y":y
                }   
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y) 
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function(aaa){
            using = false
        }
    }

}