var ball,board;
var bricks=[]; 
function setup(){
	createCanvas(window.innerWidth-10, window.innerHeight-10);
	ball=new Ball(random(width),height/2,30,4);
	board=new Board(100,15,10);
	for(var j=0;j<15;j++)
	{
		var temp=j%2==0?-20:0;
		bricks[j]=[];
		for(var i=0;i<width/60;i++)
		bricks[j][i]=new Brick(i*60+temp,j*15,60,15);
	}
}
function Brick(x,y,length,breadth){
	this.x=x;
	this.y=y;
	this.length=length;
	this.breadth=breadth;
	this.broke=false;
	this.show=function(){
		if(this.broke==false)
		fill(0,0,255);
		if(!this.broke)
		rect(this.x,this.y,this.length,this.breadth);
	}
	this.isTouch=function(ball){
		var endx=this.x+this.length;
		var endy=this.y+this.breadth;
		if(ball.y<=endy&&!this.broke&&this.x<=ball.x&&endx>=ball.x)
		{
		this.broke=true;
		ball.speedy*=-1;
		}
	}
}
function Board(w,h,speed)
{
	this.x=width/2;
	this.y=height-h;
	this.length=w;
	this.breadth=h;
	this.speed=speed;
	this.show=function(){
		fill(50,255,50);
		rect(this.x,this.y,this.length,this.breadth);
	}
	this.changePos=function()
	{
		if(keyIsDown(RIGHT_ARROW)&&this.x<width-this.length)
			this.x+=speed;
		if(keyIsDown(LEFT_ARROW)&&this.x>0)
			this.x-=speed;
	}
	this.touchBall=function(ball)
	{
		var end=this.x+this.length;
		if(ball.y+11>=this.y)
		{
			if(ball.x>=this.x-5&&end>=ball.x+5)
			{
				ball.y=this.y-this.breadth;
				ball.speedy*=-1;
			}
			else
			{
				alert("Game Over");
				setup();
			}
		}
	}
}
function keyTyped()
{
	board.changePos(key);
}
function Ball(x,y,rad,speed){
	this.x=x;
	this.y=y;
	this.radius=rad;
	this.speedx=speed;
	this.speedy=speed;
	this.move=function(){
		this.x+=this.speedx;
		this.y+=this.speedy;
	}
	this.edge=function(){
		if(this.x<=0||this.x>=width)
			this.speedx*=-1;
		if(this.y<=0)
			this.speedy*=-1;
	}
	this.show=function(){
		fill(255,0,0);
		ellipse(CENTER);
		ellipse(this.x,this.y,this.radius,this.radius);
	}
}
function draw(){
	background(0);
	ball.move();
	ball.show();
	ball.edge();
	board.changePos();
	board.show();
	board.touchBall(ball);
	var win=0;
	for(var j=0;j<bricks.length;j++)
	{
		for(var i=0;i<bricks[j].length;i++)
		{
		bricks[j][i].show();
		bricks[j][i].isTouch(ball);
		if(bricks[j][i].broke==true)
			win++;
		}
	}
	if(win==bricks.length*bricks[0].length)
	{
		alert("Win");
		setup();
	}
}