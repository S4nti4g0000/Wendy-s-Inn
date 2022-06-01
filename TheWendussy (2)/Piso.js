
//separa el piso del resto de las cajas u "objetivos" por medi de herencia
class pisos extends caja {
    //parametros del piso
    constructor(x,y,w,h){
        super(x,y,w,h)
        this.body.isStatic = true
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
         fill('#7F5932')
         //todo hacia el centro
         rectMode(CENTER)
         //rectangulo
         rect( 0,0,this.w,this.h)
         pop() 
    }
}