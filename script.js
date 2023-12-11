
// const high=0;
var board;
var score=0;
var rows=4;
var columns=4;
var player="ddfd";

let highScore=localStorage.getItem('444-highScore');
    const high=document.getElementById("high-score")
    high.textContent=highScore;

let highScorer=localStorage.getItem('444-highScorer');
    const topper=document.getElementById("high-scorer");
    topper.innerHTML=highScorer;

window.onload=function(){
    setGame();
}



function setGame(){
  board=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  for (let r=0;r<rows;r++){
    for(let c=0;c<columns;c++){
        let tile= document.createElement("div");
        tile.id=r.toString()+"-"+c.toString();
        let num=board[r][c];
        updateTile(tile,num);
        document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(hasEmptyTile()==false){
        return 0;
        
    }
    
    while(true){
        // randow c, r
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        if(board[r][c]==0){
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            break;
        }
    }
}

function updateTile(tile,num){
  tile.innerText="";
  tile.classList.value=""; // clears the classList "tile x2 x4 x8 x16 x32"
  tile.classList.add("tile");
  if(num>0){
    tile.innerText=num;
    if(num<=4096){
      tile.classList.add("x"+num.toString());
    }
    else{
        tile.classList.add("x8192");
    }
 }
}

document.addEventListener("keydown",(e)=>{
    if(e.code=="ArrowLeft"){
        slideLeft();
        if(setTwo()==0){
            if(canStop()){
                player=prompt("Enter Player Name: ","");
                if(score>highScore){
                    highScore=score;
                    high.textContent=highScore;
                    localStorage.setItem('444-highScore',highScore);
                    highScorer=player;
                    topper.innerHTML=highScorer;
                    localStorage.setItem('444-highScorer',highScorer);
                }
            }
                     
        }
        else setTwo();
    }
    else if(e.code=="ArrowRight"){
        slideRight();
        if(setTwo()==0){
            if(canStop()){
                player=prompt("Enter Player Name: ","");
                if(score>highScore){
                    highScore=score;
                    high.textContent=highScore;
                    localStorage.setItem('444-highScore',highScore);
                    highScorer=player;
                    topper.innerHTML=highScorer;
                    localStorage.setItem('444-highScorer',highScorer);
                }
            } 
                    
        }
        else setTwo();

    }
    else if(e.code=="ArrowUp"){
        slideUp();
        if(setTwo()==0){
            if(canStop()){
                player=prompt("Enter Player Name: ","");
                if(score>highScore){
                    highScore=score;
                    high.textContent=highScore;
                    localStorage.setItem('444-highScore',highScore);
                    highScorer=player;
                    topper.innerHTML=highScorer;
                    localStorage.setItem('444-highScorer',highScorer);
                }
            }        
        }
        else setTwo();
    }
    else if(e.code=="ArrowDown"){
        slideDown();
        if(setTwo()==0){
            if(canStop()){
               player=prompt("Enter Player Name: ","");
               if(score>highScore){
                highScore=score;
                high.textContent=highScore;
                localStorage.setItem('444-highScore',highScore);
                highScorer=player;
                topper.innerHTML=highScorer;
                localStorage.setItem('444-highScorer',highScorer);
            }
            }   
            
        }
        else setTwo();
    }
    
    document.getElementById("score").innerText=score;
    
 
    
})
function filterZero(row){
  return (row.filter(num =>num!=0)); // creates a new array without zeros
}
function slide(row){
    row =filterZero(row);// [2,2,2]
    
    //slide
    for(let i=0;i<row.length-1;i++){
      
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }//[2,2,2] -> [4,0,2]

    row=filterZero(row);//[4,2]

    while(row.length< columns){
        row.push(0);
    }

    return row;
}

function canStop(){
    let ans =true;
    for(let r=0;r<rows;r++){
        let row=board[r];
        let column=[board[0][r],board[1][r],board[2][r],board[3][r]];
        for(let i=0;i<row.length-1;i++){
            if(row[i]==row[i+1]){
                ans=false;
                break;
            }
        }
        for(let i=0;i<column.length-1;i++){
            if(column[i]==column[i+1]){
            ans=false;
            break;
         }
        }
    }
    return ans;
   
}

function slideLeft(){
    // 1. clear zeros, 2. add numbers if they are same, 3. clear zeros , 4. add zeros 
    for (let r=0;r<rows;r++){
        let row=board[r];
        row=slide(row);
        board[r]=row;

        for(let c=0;c<columns;c++){
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }

}

function slideRight(){
    // 1. clear zeros, 2. add numbers if they are same, 3. clear zeros , 4. add zeros 
    for (let r=0;r<rows;r++){
        let row=board[r];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[r]=row;

        for(let c=0;c<columns;c++){
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }


}

function slideUp(){
    for(let c=0;c<columns;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        row=slide(row);
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[2];
        // board[3][c]=row[3];
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c=0;c<columns;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row=slide(row);
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[2];
        // board[3][c]=row[3];
        row.reverse();
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}


    