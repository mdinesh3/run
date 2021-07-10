function game_starts()
{
    i=canvas.width;
    j=canvas.height;
    w=run.width;
    e=run.height;
    k=Math.floor((3/20)*j);
    l=Math.ceil((3/4)*j);
    p=Math.floor((13/20)*j);
    q=Math.ceil(j/4);
    r=0.075*w/2;
    holes.obspos=(p+e/10-r);
    ceilfloor.draw();
    runner.place(pos);
    n=holes.position;
    setInterval(Update,1);    
}
var n,ctx,pos,x=0,a,z=0,score=0,t1,t2,t,b=0,c=0,i,j,k,l,p,q,r,abcd,w,e,r;
var runner=
{
    place: function(pos)
    {
        this.pos=pos;
        
        if(run.getContext)
        {
            abcd=run.getContext("2d");
            abcd.fillStyle="red";
            abcd.beginPath();
            abcd.moveTo(w/25,p+e/10);
            abcd.lineTo(w/10,p+e/10);
            abcd.lineTo(w/10,p+e/10-0.075*w);
            abcd.fill();  
           
        }
        
    },
    Change: function()
    {        
        if(this.pos=="DOWN")
        {
            this.pos="UP";
            abcd.clearRect(w/25,p+e/10-0.075*w-1,3*(w/50)+1,0.075*w+1);
            abcd.fillStyle="red";
            abcd.beginPath();
            abcd.moveTo(w/25,q);
            abcd.lineTo(w/10,q);
            abcd.lineTo(w/10,q+0.075*w);
            abcd.fill();
        }
        else if(this.pos=="UP")
        {
            this.pos="DOWN";
            abcd.clearRect(w/25,q,3*(w/50),0.075*w);
            abcd.fillStyle="Red";
            abcd.beginPath();
            abcd.moveTo(w/25,p+e/10);
            abcd.lineTo(w/10,p+e/10);
            abcd.lineTo(w/10,p+e/10-0.075*w);
            abcd.fill();
        }
    }
}
var ceilfloor=
{
   draw: function()
    {
        if(canvas.getContext)
            {
            ctx=canvas.getContext("2d");
            ctx.fillStyle="Blue";
            ctx.fillRect(0,k,i,j/10);
            ctx.fillStyle="Blue";
            ctx.fillRect(0,l,i,j/10);
            pos="DOWN";
            holes.position=i;
    }    
}
}


function Update()
{
    
    holes.fill();
    holes.Obstacle_close();
    if(x==0)
    {
        holes.posplace();
        holes.randomwidth();
    }
    holes.Obstacle_Update();
    holes.position_update();
    holes.clear();
    holes.Obstacle_create();
    
    holes.check();
    holes.Update_Speed();
}

var holes=
{
    speed:0.5,
    width:0,
    holepos:"DOWN",
    obsgo:"UP",
    fill:function()
    {
        t1=new Date();
        if(this.holepos=="DOWN")
        {
            ctx.fillStyle="Blue";
            ctx.fillRect(this.position,l,this.width+1,j/10);
        }
        else if(this.holepos=="UP")
        {
            ctx.fillStyle="Blue";
            ctx.fillRect(this.position,k,this.width+1,j/10);
        }
    },
    posplace:function()
    {
        a=Math.floor(Math.random()*2);
        if(a==0)
        {
            this.holepos="UP";
        }
        else if(a==1)
        {
            this.holepos="DOWN";
        }
        x++;
    },
    randomwidth:function()
    {
        a=Math.floor(Math.random()*100)+3*(w/50);
        this.width=a;
    },
    position_update:function()
    {
        if(this.position>=(-a))
        {
            this.position-=this.speed;
        }
        else
        {
            this.position=n;
            x=0;
        }
    },
    clear:function()
    {
        if(this.holepos=="DOWN")
        {
            ctx.clearRect(this.position,l,this.width,(j/10));
        }
        else if(this.holepos=="UP")
        {
            ctx.clearRect(this.position,k,this.width,(j/10));
        }
        
    },
    Obstacle_create:function()
    {
       
        ctx.fillStyle="white";
        ctx.beginPath();
        ctx.arc(this.position,this.obspos,r,0,360,false);
        ctx.fill();
    },
    Obstacle_close:function()
    {
        
        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.arc(this.position+1,this.obspos+0.1,r+1,0,360,false);
        ctx.fill();
        //ctx.fillRect(this.position-r,this.obspos-r,2*r,2*r);
    },
    Obstacle_Update:function()
    {
        if((this.obsgo=="UP")&&(this.obspos>q+r))
        {
            console.log(this.obspos,q+r);
           this.obspos-=0.1;
        }
        else if(this.obspos<q+r+0.001)
        {
            console.log("Down");
            this.obsgo="DOWN";
        }
        if((this.obsgo=="DOWN")&&(this.obspos<p+e/10-r))
        {
            this.obspos+=0.1;
        }
        else if(this.obspos==p+e/10-r)
        {
            this.obsgo="UP";
        }
    },
    check:function()
    {
        
        if(this.holepos==runner.pos)
        {
            if((this.position<w/25)&&((this.position+this.width)>w/10))
            {   
                this.position+=this.speed;
                pos=this.position;
                this.pos=pos;
                score=Math.round(score);
                localStorage.setItem("score",score);
                var highscore=localStorage.getItem("highscore");
                if(highscore<score)
                {
                    localStorage.setItem("highscore",score);
                }
                window.location.href="index.html";
            }    
        }
    },
    Update_Speed:function()
    {
        t2=new Date();
        t=t2-t1
        score+=this.speed*t;
        if(((score-b)>10)&&(z<5))
        {
            z++;
            b=score;
            this.speed+=0.1;
        }
        else if(((score-b)>50)&&(z<8))
        {
            z++;
            b=score;
            this.speed+=0.1;
        }
        else if((score-b)>100)
        {
            //z=3;
            b=score;
            this.speed+=0.1;
        }

    }
}
