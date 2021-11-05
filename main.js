let ret = document.getElementsByClassName("pop");
const rnd = Math.floor(Math.random() * 5);

function yo(){
    var del = 0;
    for (var i = 0, num = ret.length; i < num; i++) {
        ret[i].style.animationDelay = del + "s";
        del = del + 0.1;
    }
} 

window.onload = function() {
    yo();
  };

let loader = document.querySelector('.loading');
let content = document.querySelector('.content');
setTimeout(() => {
    loader.classList.add('finishedLoad');
    content.style.display = "flex";
}, 2000)

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
numberOfParticles = 100;


// const canvasWV = document.getElementById('canvasWV');
// const ctxWV = canvasWV.getContext('2d');
// canvasWV.width = window.innerWidth;
// canvasWV.height = window.innerHeight;
// let particleArrayWV = [];

//create mouse
const mouse = {
    x: null,
    y : null,
    radius : 150
}

//track mouse
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})


setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 200)

// create particle
class Particle{
    constructor(x,y,size,color,weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        this.size -= 0.12;
        if(this.size < 0){
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 5) + 2;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.01;
        if(this.y > canvas.height - this.size){
            this.weight *= -0.6;
        };       
    }
}

function init(){
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size  = (Math.random() * 5) + 2;
        let color = 'green';
        let weight = 1;
        particleArray.push(new Particle(x,y,size,color,weight))
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}
init();
animate();
//restart if window resized
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


window.addEventListener('mouseout', function(){
    mouse.x = null;
    mouse.y = null;
});

var scroll = window.requestAnimationFrame || function(callback){window.setTimeout(callback, 000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll');
var elementsToShow2 = document.querySelectorAll('.show-on-scroll2');

let ani = 0;

function loop(){
    elementsToShow.forEach(function(element){
        if(isElemenetInViewport(element)){
            element.classList.add('is-visible');
            let yur = document.getElementsByClassName('is-visible');
            let ani = 0;
            for (var i = 0, num = yur.length; i < num; i++) {
                yur[i].style.animationDelay = (ani) + 's';
                ani = ani + .1;
            }
        }
        else{
            
        }
    });

    elementsToShow2.forEach(function(element){
        if(isElemenetInViewport(element)){
            element.classList.add('is-visible2');
        }
        else{
            
        }
    });
    scroll(loop);
}
loop();
function isElemenetInViewport(el){
    if(typeof jQuery === "function" && el instanceof jQuery){
        el = el[0]
    }
    var rect = el.getBoundingClientRect();
    return(
        (rect.top <= 0 && rect.bottom <= 0) 
        || 
        (rect.bottom >= (window.innerHeight || document
            .documentElement.clientHeight) && 
            rect.top <= (window.innerHeight || document.documentElement
                .clientHeight)) 
        || (rect.top >= 0 && 
            rect.bottom <= (window.innerHeight || document
                .documentElement.clientHeight))
    );
}
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }