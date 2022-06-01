class caja {
    //define coordenadas y dimensiones de los objetivos y el piso
    constructor(x,y,w,h){
        this.body = Matter.Bodies.rectangle(x,y,w,h)
        //agrega masa al objeto
        Matter.Body.setMass(this.body, this.body.mass*2)
        //agrega el onjeto al mundo
        Matter.World.add(world,this.body)
        this.w = w 
        this.h = h 
    }
   
    Display(){
        //constantes de posicion y angulo de los objetivos
        const pos = this.body.position
        const ang = this.body.angle
        push()
        //coordenadas de los objetos
        translate(pos.x,pos.y)
        //genera angulo fijo de los objetos
        rotate(ang)
        //todo hacia el centro
       
        imageMode(CENTER)
        //define la imagen, y los parametros que va a tomar cuando se llame la funcion de display
        image(WebImg, 0,0,this.w,this.h)
        pop()  

    }

}