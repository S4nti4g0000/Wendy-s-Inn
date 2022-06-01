class Resortera {

     constructor(x,y,body){

        const options = {
            //para definir los parametros de coordenadas
            pointA:{
                x: x,
                y: y
            },
            //el body es para recibir un objeto que se defina a la hora de hacer el llamado a la resortera
            bodyB: body,
            //propiedades de la resortera, la dureza y el largo
            stiffness: 0.05,
            length: 100
        }
        
        //crea el constraint con las opciones definidas anteriormente 
        this.sling = Constraint.create(options)
        //agrega la resortera al mundo
        World.add(world,this.sling)
     }

     //para destruir el constraint una vez "vuele" el objeto
fly(){
    this.sling.bodyB = null
}

//para mostrar el constraint
    DisplayR(){
        //si el objeto esta adherido al constraint, crea el constraint
        if(this.sling.bodyB){
            stroke(255)
        //define puntos dodne empieza y termina el constraint 
        const posA = this.sling.pointA
        const posB = this.sling.bodyB.position
        line(posA.x,posA.y, posB.x, posB.y)
         }
    }
//para adherir un cuerpo al constraint
attach(body){
    this.sling.bodyB = body
}


}