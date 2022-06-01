//define estasx constantes como parte de Matter
const {Engine, World, Bodies, Events,  MouseConstraint, Constraint,Mouse} = Matter

let piso
let TelaAranas = []
let Cleaner
let world,engine
let MouseConst
let Resorte

let SpongeImg
let WebImg
//precargar las imagenes en constantes especificas
function preload(){
    SpongeImg = loadImage('Imagenes/Esponja.png')
    WebImg = loadImage('Imagenes/TelaDeAraña.png')
}


function setup(){
    //Crea canvas al tamaño de la pantalla
    const canvas = createCanvas(window.innerWidth,window.innerHeight)
    //crear mundo y parametros matter js
    engine = Engine.create()
    world = engine.world
    //crear objetos
    piso = new pisos(width/2,height-50,width,100)

    for (let i = 0; i < 6; i++){
        
        TelaAranas[i] = new caja(width - 400,height - 200,100,100)
        
    }
    Cleaner = new bola(50,300, 50)
    Resorte = new Resortera (600,500,Cleaner.body)
    //Crea el mouse
    const mouse = Mouse.create(canvas.elt)
    const options = {
        mouse: mouse   
    }

    //funcion de mouse constraint
    MouseConst = MouseConstraint.create(engine, options)
    World.add(world,MouseConst)

}

// para crear otro objeto a lanzar tras presionar un boton
function keyPressed(){
    if(key == ' '){
        //remueve el objeto ya lanzado
        World.remove(world, Cleaner.body)
        //crea un nuevo objeto a lanzar
        Cleaner = new bola(50,300, 50)
        //restaura el constraint
        Resorte.attach(Cleaner.body)
    }
}

//ejecuta la funcion fly luego de 100 milisegundos
function mouseReleased(){
    setTimeout(()=>{
        Resorte.fly()
    }, 100)
}
//dibuja todo en pantalla
function draw(){

    //color del canvas
    background('#372E47')
    //actualiza el Engine de matter js
    Matter.Engine.update(engine)
    //mostrar objetos
    for(let TelaArana of TelaAranas){
        TelaArana.Display()
    }
   piso.Display()
   Resorte.DisplayR()
   Cleaner.Display()
}