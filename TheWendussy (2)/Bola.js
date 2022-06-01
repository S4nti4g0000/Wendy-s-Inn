class bola{

    //define parametros de coordenadas y radio del limpiador
    constructor(x,y,r){
        const options = {
            //agrega elasticidad al objeto
            restitution: 1
        }
        //defina el objeto como un circulo
        this.body = Matter.Bodies.circle(x,y,r,options)
        //agrega masa al objeto
        Matter.Body.setMass(this.body, this.body.mass*2)
        Matter.World.add(world, this.body)
        this.r = r 
        
    }

    Display(){
        //constantes de posicion y angulo de los objetivos
        const pos = this.body.position
        const ang = this.body.angle
        push()
        //coordenadas de los objetos
        translate(pos.x,pos.y)
        //angulo fijo de los objetos
        rotate(ang)
        imageMode(CENTER)
        image(SpongeImg,0,0,this.r*2,this.r*2) 
        pop()  

    }

}

