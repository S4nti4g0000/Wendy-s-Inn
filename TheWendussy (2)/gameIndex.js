

 const GameOne = () => {
    try {
        if (typeof MatterWrap !== 'undefined') {
            // either use by name from plugin registry (Browser global)
            Matter.use('matter-wrap');
        } else {
            // or require and use the plugin directly (Node.js, Webpack etc.)
            Matter.use(require('matter-wrap'));
        }
    } catch (e) {
        // could not require the plugin or install needed
    }
    

    //initialize all matter utilities
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1280,
        height: 720,
        showAngleIndicator: false,
        //show the shapes with color and add a background color
        wireframes: false,
        background: '#c1aef5'
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies including the slingshot
var ground = Bodies.rectangle(1500, 350, 200, 20, { isStatic: true, render: { 
    //show a certain image instead of the basic rectangle
    sprite: {

        texture: './img/madera.png',
        yScale: 0.05,
        xScale: 0.33
    
    }

 } }),
 //General configurations and position of both the slingshot and the circle
    rockOptions = { density: 0.004 }, 
    rock = Bodies.circle(170, 500, 35, rockOptions), 
    anchor = { x: 170, y: 500 },
    elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: rock, 
        stiffness: 0.04
    },
    
    );

//Create the rest of the walls and add their textures

var wall = Bodies.rectangle(1500, 250, 200, 20, { isStatic: true, render: { 

    //render textures as sprites

    sprite: {

        texture: './img/madera.png',

        //scale textures based on the shape they sould have

        yScale: 0.05,
        xScale: 0.33

    } 

} });
var wall2 = Bodies.rectangle(1590, 150, 200, 20, { isStatic: true, angle: Math.PI * 0.5,render: {

    sprite: {

        texture: './img/madera.png',
        yScale: 0.06,
        xScale: 0.3

    }

 } });
var wall3 = Bodies.rectangle(1500, 50, 200, 20, { isStatic: true, render: { 
    
    sprite: {

    texture: './img/madera.png',
    yScale: 0.05,
    xScale: 0.33

} } });

var ground2 = Bodies.rectangle(1590, 450, 200, 20, { isStatic: true, angle: Math.PI * 0.5,render: { 
    
    sprite: {

        texture: './img/madera.png',
        yScale: 0.05,
        xScale: 0.33
    
    }

 } })
var ground3 = Bodies.rectangle(1500, 550, 200, 20, { isStatic: true, render: {
    
    sprite: {

        texture: './img/madera.png',
        yScale: 0.05,
        xScale: 0.33
    
    }

 } })

var wall4 = Bodies.rectangle(1500, 650, 200, 20, { isStatic: true, render: { 
    
    sprite: {

        texture: './img/madera.png',
        yScale: 0.05,
        xScale: 0.33
    
    }

 } })
var wall5 = Bodies.rectangle(1500, 850, 200, 20, { isStatic: true, render: { 
    
    sprite: {

    texture: './img/madera.png',
    yScale: 0.05,
    xScale: 0.33

} } })
var wall6 = Bodies.rectangle(1590, 750, 200, 20, { isStatic: true, angle: Math.PI * 0.5, render: { 
    
    sprite: {

    texture: './img/madera.png',
    yScale: 0.05,
    xScale: 0.33

} } })

//create the doors and first set them as sensors so the ball can enter

var door1 = Bodies.rectangle(1400, 150, 215, 20, { 
    
    isStatic: true, 
    isSensor: true,
    angle: Math.PI * 0.5, 
    render: { fillStyle: 'transparent', strokeStyle: '#991c50', lineWidth: 1 } 

})
var door2 = Bodies.rectangle(1400, 450, 215, 20, { 
    
    isStatic: true, 
    isSensor: true,
    angle: Math.PI * 0.5, 
    render: { fillStyle: 'transparent', strokeStyle: '#991c50', lineWidth: 1 } 

})
var door3 = Bodies.rectangle(1400, 750, 215, 20, { 
    
    isStatic: true, 
    isSensor: true,
    angle: Math.PI * 0.5, 
    render: { fillStyle: 'transparent', strokeStyle: '#991c50', lineWidth: 1 } 

})

//set colors for the sensors

var colorA = '#881c99',
    colorB = '#991c50'

//array with all the bodies for the boxes

Composite.add(engine.world, [ground,ground2,ground3, wall, wall2, wall3,wall4,wall5,wall6, rock, elastic,door1,door2,door3]);

//add the sensors inside of the boxes to check if the ball is inside

var collider = Bodies.rectangle(1530, 450, 120, 200, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1
    }
});
var collider2 = Bodies.rectangle(1530, 150, 120, 200, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1
    }
});
var collider3 = Bodies.rectangle(1530, 750, 120, 200, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1
    }
});

//Array for the sensors

Composite.add(world, [
    collider,collider2,collider3
]);

//check when the ball has been launched to release it from the constraint of the slingshot

Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        rock = Bodies.circle(170, 450, 35, rockOptions);
        Composite.add(engine.world, rock);
        elastic.bodyB = rock;
    }
});

//to check if the ball is colliding with the sensor

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        //if the ball is colliding with the sensor of the box set the door sensor to false so it can't go out

        if (pair.bodyB === collider) {
            console.log('Touch B')
            door2.isSensor = false
        
        }
    }
});

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 1920, y: 1080 }
});

// context for MatterTools.Demo
return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
    }
};
};

if (typeof module !== 'undefined') {
module.exports = Example.slingshot;
}