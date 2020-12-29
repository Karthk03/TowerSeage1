
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var world, engine;
var block = [], blockArrPos = -1;
var minVal = 600, maxVal = 900;
var polygon, string, plygonImg;
var ground;

function preload() 
{
    plygonImg = loadImage("polygon.png")
}

function setup()
{
    var canvas = createCanvas(1200,700);

    engine = Engine.create();
    world = engine.world;

    for(let y=400; y>=100; y-=70)
    {
        for(let x=minVal; x<=maxVal;x+=50)
        {
            blockArrPos++;
            block[blockArrPos] = new Block(x,y);
            //console.log(block[blockArrPos]);
        }
        minVal+=50;
        maxVal-=50;
    }

    var options = 
    {
        'restitution':0.3,
        'friction':0.2,
        'density':1.0,
    }
    platform = new Platform(750,460,400,20);

    polygon = Bodies.circle(200,200,50);
    Matter.World.add(world,polygon,options);
    
    ground = Bodies.rectangle(600,675,1200,50,{'isStatic': true});

    Matter.World.add(world,ground);

    string = new Launcher(polygon, {x: 200, y: 100});

    //Engine.run(engine);
}

function draw()
{
    background(0);

    Engine.update(engine);

    imageMode(CENTER);
    image(plygonImg,polygon.position.x,polygon.position.y,100,100);

    for(let i = blockArrPos; i>=0; i--)
    {
        //console.log(i);
        block[i].display();
    }

    platform.display();

    string.display();

    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,1200,50);
}

function keyPressed()
{
    if(keyCode == 32)
    {
        string.attach(polygon)

        Matter.Body.setPosition(polygon, {x: 200, y: 200});
    }

    // if(keyCode == 38)
    // {
    //     Matter.Body.setPosition(polygon,{x: 100, y: 50});
    // }
}

function mouseDragged()
{
    if(string.launcher.bodyA!=null)
    {
        Matter.Body.setPosition(polygon, {x: mouseX, y: mouseY});
    }
}

function mouseReleased()
{
	string.fly();
}