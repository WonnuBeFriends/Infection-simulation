const CIRCLE_SIZE = 15;
const INFECTION_RATE = 0.1
function isInArray(element, array){ 
    for(let i = 0; i < array.length; i ++){
        if(element === array[i]){
            return true;
        }
    }
    return false; 
}
let copyArray = array =>{
    let newArray = [];
    for(let i = 0; i < array.length; i ++){
        newArray.push(array[i]);
    }
    return newArray
}
class Circle{
    constructor(state){
        this.velocityX = (Math.random()*10) - 5;
        this.velocityY = (Math.random()*10) - 5;
        this.x = Math.random()*width;
        this.y = Math.random()*(height-100 - CIRCLE_SIZE) + 100 + CIRCLE_SIZE;
        this.state = state
        if(this.state === "sick"){
            setTimeout(() =>{
            this.state = "immune";
            immuneStat +=1
            sickStat -=1;
        }, 7000)
        };
        this.touched=[];
    }

    draw(){
        if(this.state === "sick"){
            fill("red");
            ellipse(this.x, this.y, CIRCLE_SIZE, CIRCLE_SIZE)
        }
        if(this.state === "healthy"){
            fill("green");
            ellipse(this.x, this.y, CIRCLE_SIZE, CIRCLE_SIZE)
        }
        if(this.state === "immune"){
            fill("blue");
            ellipse(this.x, this.y, CIRCLE_SIZE, CIRCLE_SIZE)
        }
    }

    update(){
        this.x += this.velocityX;
        this.y += this.velocityY;
        if(this.x > width || this.x < 0){
            this.velocityX = -this.velocityX
        }
        if(this.y > height || this.y < 100 + CIRCLE_SIZE){
            this.velocityY = -this.velocityY
        }
        let touching = [];
        for(let i =0; i < circles.length; i++){
            if(Math.sqrt(Math.pow(circles[i].x-this.x,2)+(Math.pow(circles[i].y-this.y,2))) < CIRCLE_SIZE * 2){
                touching.push(circles[i]);
            }
        }
        for(let i = 0; i < this.touched.length; i ++){
            if(this.touched[i] !== touching[i]){
                if(this.touched[i].state !== "immune" && this.touched[i].state !== "healthy"){
                    if(this.state !== "sick" && this.state !== "immune"){
                        if(Math.random() < INFECTION_RATE){
                        this.state = "sick";
                        sickStat +=1
                        healthyStat -=1
                        setTimeout(() =>{
                            if(this.state === "sick"){
                                this.state = "immune";
                            immuneStat +=1
                            sickStat -=1;
                            }
                        }, 7000)
                        }  
                    }
                                      
                }
            }
            
        }
        this.touched = copyArray(touching);
            

    }
        

}