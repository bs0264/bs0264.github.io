var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = 'green';
// ctx.fillRect(10,10,100,100); // x좌표 , y좌표 , width , height
let speed=1;
const speedInput=document.getElementById("speed");

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x , this.y , this.width , this.height);
    }
}
dino.draw()

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x , this.y , this.width , this.height);
    }
}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;

function frame(){
    animation = requestAnimationFrame(frame);
    timer++;
    speed=speedInput.value;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    dino.draw();
    if(timer % 200 === 0){
         let cactus = new Cactus();
         
         cactus여러개.push(cactus);
    }
   
    cactus여러개.forEach((a , i , o)=>{
        //x좌표가 a미만이면 제거
        if(a.x < 0){
            o.splice(i,1)
        }
        a.x-=speed;


        충돌하냐(dino , a);



        a.draw();
    })
    
    //점프기능

    if (점프중 == true){
        dino.y--;
        점프timer++;
    }
    if(점프중 == false){
        if(dino.y < 200) {
        dino.y++; 
        }
    }
    if (점프timer > 100){
        점프중 = false;
        점프timer =0;
    }
}


frame();

//충돌확인

function 충돌하냐(dino , cactus){
var x축차이 = cactus.x - (dino.x + dino.width);
var y축차이 = cactus.y - (dino.y + dino.height);
if (x축차이 < 0 && y축차이 < 0){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    // alert("게임 끝");
    
    
    }
}


var 점프중 =false; 
document.addEventListener('keydown' , function(e){
    if (e.code === 'Space'){
        점프중 = true;
    }
})