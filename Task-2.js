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

    ceilfloor.draw();
    runner.place(pos);
    n=holes.position;
    setInterval(Update,1);    
}
var n,ctx,pos,x=0,a,score=0,t1,t2,t,b=0,c=0,i,j,k,l,p,q,r,abcd,w,e;
var runner=
{
    place: function(pos)
    {
        this.pos=pos;
        console.log(w/8,w/2.5,w);
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
    if(x==0)
    {
        holes.posplace();
        holes.randomwidth();
    }
    holes.position_update();
    holes.clear();
    holes.check();
    holes.Update_Speed();
}
var holes=
{
    speed:0.5,
    width:0,
    holepos:"DOWN",
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
        t2=new Date();
        t=t2-t1
        score+=this.speed*t;
    },
    check:function()
    {
        console.log(this.position,w/8);
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
                window.location.href="Result.html";
            }    
        }
    },
    Update_Speed:function()
    {
        if(((score-b)>10)&&(a==0))
        {
            a=1;
            b=score;
            this.speed+=0.8;
        }
        else if((score-b)>100)
        {
            b=score;
            this.speed+=0.2;
        }
    }
}
