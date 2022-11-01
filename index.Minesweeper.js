let mat = new Array(17);
let canvas = document.getElementById('center');
let emptyCellNumber = 0;

for(var i = 0; i <= 16; i++){
    mat[i] = new Array(17);
}
for(let i = 0; i <= 16; ++i){
    for(let j = 0; j <= 16; ++j){
        mat[i][j] = document.createElement("div");
        mat[i][j].setAttribute("class", "Container");
    
        mat[i][j].value = 0;
        if(i == 0 || i == 16 || j == 0 || j == 16){
            mat[i][j].style.display = 'none';

        }else{
            mat[i][j].addEventListener('click', function(e){
                reveal(e)
            });
            mat[i][j].addEventListener('contextmenu', function(e){
                putFlag(e);
                e.preventDefault();
            }, false);
        }       
        canvas.appendChild(mat[i][j]);
    }
}

let min = 1;
let max = 16;
let mines = 40;
while(mines){
    let random1 = Math.floor(Math.random() * (max - min) ) + min;
    let random2 = Math.floor(Math.random() * (max - min)) + min;
    if (mat[random1][random2].value != -1){
        mat[random1][random2].value = -1;    
    }else{
        ++mines;
    }
    --mines;
}
let nr = 0;
function addValue(i, j){
    nr = 0;
    for(let n = (i-1); n <= (i + 1); ++n){
        for(let m = (j-1); m <= (j + 1); ++m){
            if(mat[n][m].value === -1){
                mat[n][m].style.backgroundColor = "rgb(100, 122, 82)";
                ++nr;
            }
        }
    }
    return nr;
}

for(let i = 1; i <= 15; ++i){
    for(let j = 1; j <= 15; ++j){
        if(mat[i][j].value != -1){
            console.log(i, j);
            addValue(i,j);
            if(nr != 0){
                mat[i][j].value = nr;
            }
        }
    }
}
function putFlag(e){
    let cell = e.currentTarget;
    if(cell.style.backgroundColor != "rgb(197, 161, 141)"){
        cell.innerHTML = "X";
    }
    return false;
}
function reveal(e){    
    let cell = e.currentTarget; 
    cell.style.backgroundColor = "rgb(197, 161, 141)";
    if (cell.value === 0){
        emptyCell(e);
    }
    if(cell.value === -1){
        cell.style.backgroundColor = "rgb(220,20,60)";
        cell.innerHTML = "*";
        gameOver(); 
        
    }
    if(cell.value > 0){
        cell.innerHTML = cell.value;
        ++emptyCellNumber;
        if(emptyCellNumber + 40 == 225){
            window.setTimeout(function(){alert("You Win!")},500);
            window.setTimeout(function(){location.reload()},500);
        }
    }
}
function gameOver(){
    let i = 15;
    const intervalID = setInterval(()=>{
        for(let j = 15; j > 0; --j){
            if(mat[i][j].value === -1){
                mat[i][j].innerHTML = '*';
                mat[i][j].style.backgroundColor = "rgb(220,20,60)";
            }
        }
        if(i === 1)
        clearInterval(intervalID);
        --i;
    },150); 
    window.setTimeout(function(){alert("You Died :(")},2500);
    window.setTimeout(function(){location.reload()},2500);
}
function emptyCell(e){
    let stop = 9;
    while(stop > 0){
        for(let n = 1; n <= 15; ++n){
            for(let m = 1; m <= 15; ++m){
                if(mat[n][m].style.backgroundColor == "rgb(197, 161, 141)" && mat[n][m].value == 0){
                    for(let i = (n-1); i <= (n + 1); ++i){
                        for(let j = (m-1); j <= (m + 1); ++j){
                            mat[i][j].style.backgroundColor = "rgb(197, 161, 141)";
                            if(mat[i][j].value > 0){
                                mat[i][j].innerHTML = mat[i][j].value;
                            }
                        }
                    }
                }
                if(n == 15 && m == 15){
                    stop--;
                }
            }
        }
    }
    emptyCellNumber = 0;
    for(let n = 1; n <= 15; ++n){
        for(let m = 1; m <= 15; ++m){
            if(mat[n][m].style.backgroundColor == "rgb(197, 161, 141)"){
                ++emptyCellNumber;
            }
        }
    }
    if(emptyCellNumber + 40 == 225){
        window.setTimeout(function(){alert("You Win!")},500);
        window.setTimeout(function(){location.reload()},500);
    }
}