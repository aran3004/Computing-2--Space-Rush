import Comp from "./comp.js";
import Weapon from "./weapon.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startScreen = document.getElementById("start screen");
let startScreenctx = startScreen.getContext("2d");
let controls = document.getElementById("controls");
let nameInput = document.getElementById("name input");
let leaderboard = document.getElementById("leaderboard");
let leaderboardctx = leaderboard.getContext("2d");

let button = document.getElementById("button");
let homeButton = document.getElementById("home");

let fuelSound = document.getElementById("collect_fuel");
let laserSound = document.getElementById("laser");
let emptyClipSound = document.getElementById("empty_clip");
let reloadedSound = document.getElementById("reloaded");
let damageSound = document.getElementById("damage");
let endGameSound = document.getElementById("endGameClip");

//function to play sound effects
function playSound(clip) {
    clip.pause();
    clip.currentTime = 0;
    clip.play();
}

let h = window.innerHeight;
let w = window.innerWidth;
canvas.width = w;
canvas.height = h;
let frames = 0;
let score = 0;
let highScore = 0;
let name;
let pause = true;

startScreen.width = w;
startScreen.height = h;
leaderboard.width = w;
leaderboard.height = h;


//submit name
button.addEventListener("click", function () {
    name = nameInput.value;
    nameInput.value = "";
    alert("name submitted");
});

//home button
homeButton.addEventListener("click", function () {
    if (pause === false) {
        pause = true;
    }
    let answer = window.confirm("Are you sure you want to leave page?");
    if (answer) {
        startScreen.classList.remove("hidden");
        startScreen.classList.add("visible");
        button.classList.remove("hidden");
        nameInput.classList.remove("hidden");
        homeButton.classList.add("hidden");

        if (controls.classList.contains("visible")) {
            controls.classList.remove("visible");
            controls.classList.add("hidden");
        }
        if (leaderboard.classList.contains("start_screen_visible")) {
            leaderboard.classList.remove("start_screen_visible");
            leaderboard.classList.add("hidden");
        }
    }
    else {
        pause = false;
    }
});

//draw title Space Rush
let drawing = new Image();
drawing.src = "title.png";
drawing.onload = function () {
    startScreenctx.drawImage(drawing, canvas.width / 2 - drawing.width / 2, 10);
};


//create the rectangles for on the start screen
startScreenctx.fillStyle = "#a6bdff";
startScreenctx.fillRect(w / 3, h / 2 - 100, w / 3, 100);
startScreenctx.fillRect(w / 3, h / 2 + 50, w / 3, 100);
startScreenctx.fillRect(w / 3, h / 2 + 200, w / 3, 100);
startScreenctx.fillStyle = "black";
startScreenctx.font = "30px Comic Sans";
startScreenctx.textAlign = "center";
startScreenctx.fillText("Start Game", w / 2, h / 2 - 40);
startScreenctx.fillText("How to Play", w / 2, h / 2 + 110);
startScreenctx.fillText("Leaderboard", w / 2, h / 2 + 260);


//add functions to the buttons on home page
startScreen.addEventListener("click", function (e) {
    if (e.clientX > w / 3 &&
        e.clientX < 2 * w / 3) {
        if (e.clientY > h / 2 - 100 && e.clientY < h / 2) {
            // start game from startscreen
            if (name !== undefined) {
                // console.log("start game");
                startScreen.classList.remove("visible");
                startScreen.classList.add("hidden");
                button.classList.add("hidden");
                nameInput.classList.add("hidden");
                pause = false;
                loop();
            }
            else {
                alert("Submit name to play");
            }
            homeButton.classList.remove("hidden");
        }
        //show control page
        if (e.clientY > h / 2 + 50 && e.clientY < h / 2 + 150) {
            // console.log("Controls");
            controls.classList.remove("hidden");
            controls.classList.add("visible");
            button.classList.add("hidden");
            nameInput.classList.add("hidden");
            homeButton.classList.remove("hidden");
        }
        //show leaderboard
        if (e.clientY > h / 2 + 200 && e.clientY < h / 2 + 300) {
            // console.log("Leaderboard");
            startScreen.classList.remove("visible");
            startScreen.classList.add("hidden");
            button.classList.add("hidden");
            nameInput.classList.add("hidden");
            leaderboard.classList.remove("hidden");
            leaderboard.classList.add("start_screen_visible");
            homeButton.classList.remove("hidden");

            retreiveLeaderboard();
            //get leaderboard from database through server
            async function retreiveLeaderboard() {
                const response = await fetch("/leaderboard");
                let text = await response.json();
                // console.log(text);

                //sort scores in descending order
                function reorderScores() {
                    text.sort(function (a, b) {
                        return b.score - a.score;
                    });
                }
                reorderScores();

                //draw top scores and names on page
                leaderboardctx.clearRect(0, 0, w, h);
                leaderboardctx.fillStyle = "white";
                leaderboardctx.font = "30px Comic Sans";
                leaderboardctx.textAlign = "right";
                leaderboardctx.fillText("Name", w / 2 - 50, 100);
                leaderboardctx.textAlign = "left";
                leaderboardctx.fillText("Score", w / 2 + 50, 100);
                for (let i = 0; i < text.length; i += 1) {
                    console.log(text[i]);
                    leaderboardctx.textAlign = "right";
                    leaderboardctx.font = "20px Comic Sans";
                    let posName = w / 2 - 50;
                    let posSc = w / 2 + 50;
                    let posTop = 200 + 100 * i;
                    leaderboardctx.fillText(`${text[i].name}`, posName, posTop);
                    leaderboardctx.textAlign = "left";
                    leaderboardctx.fillText(`${text[i].score}`, posSc, posTop);
                }
            }
        }
    }
});


// takes object and puts it at specific index in a list. Changes the vales of
// objects x,y,radius and velocity to random integers.
function putInList(obj, list, place) {
    let randX = Math.floor(Math.random() * w);
    let randY = Math.floor(Math.random() * h - h);
    let randRad = Math.floor(Math.random() * 30 + 10);
    let randVel = Math.floor(Math.random() * 6 + 1);
    list[place] = Object.assign({}, obj);
    list[place].x = randX;
    list[place].y = randY;
    list[place].radius = randRad;
    list[place].vel = randVel;
}

//puts object at specific index in a list and allows you to change the
//x pos, y and velocity
function putInListMissile(obj, list, place, x, y, vel) {
    list[place] = Object.assign({}, obj);
    list[place].x = x;
    list[place].y = y;
    list[place].vel = vel;
}

//player object based on component
let Player = Object.assign({}, Comp);
Player.x = w / 2;
Player.y = h - 100;
Player.radius = 20;
Player.vel = 0;


//updates playrs x position based on velocity
function playerUpdate() {
    if (Player.x - Player.radius > 0 && Player.x + Player.radius < w) {
        Player.x += Player.vel;
    }
    else {
        Player.vel *= -1;
        Player.x += Player.vel;
    }
}

let asteroid = [];
//adds 5 asteroids to list asteroid
function createAsteroid() {
    for (let i = 0; i < 5; i += 1) {
        putInList(Comp, asteroid, i);
    }
}
createAsteroid();

let prize = [];
//adds 10 fuel to list fuel
function createPrize() {
    for (let i = 0; i < 10; i += 1) {
        putInList(Comp, prize, i);
    }
}
createPrize();

let missiles = [];
let bullets = [];

let bulletCount = 0;

//shoot bullets
window.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
        //creates new bullet if bullet count less than 5
        if (bulletCount < 5 && pause === false) {
            let px = Player.x
            let py = Player.y
            putInListMissile(Weapon, bullets, bullets.length, px - 5, py, -5)
            bulletCount += 1;
            playSound(laserSound);
        }
        //play emptyclip sound
        else {
            playSound(emptyClipSound);
        }
    }
    //reload button
    if (e.keyCode === 82 & pause === false) {
        playSound(reloadedSound);
        bulletCount = 0;
    }
});

//pushes missiles every 200 frames
function pushMissile() {
    if (frames % 200 === 0 && frames !== 0) {
        // console.log("fire");
        putInListMissile(Weapon, missiles, missiles.length, Player.x, -50, 1);
    }
}

//loops through missile list and chages position and speed
function launchMissile(list, colour) {
    for (let i = 0; i < list.length; i += 1) {
        let lx = list[i].x
        let ly = list[i].y
        let lw = list[i].width
        let lh = list[i].height
        list[i].draw(lx, ly, lw, lh, colour);
        list[i].y += list[i].vel;
        if (list[i].y < h * 0.6) {
            list[i].y += 5;
            list[i].x = Player.x;
        }
        else {
            list[i].y += 15
        }
        if (list[i].y > h + list[i].height) {
            list.splice(i, 1);
        }
    }
}

//uopdates bullets position(s)
function shootBullet() {
    for (let i = 0; i < bullets.length; i += 1) {
        let bx = bullets[i].x
        let by = bullets[i].y
        let bw = bullets[i].width
        let bh = bullets[i].height
        bullets[i].draw(bx, by, bw, bh, "white");
        bullets[i].y += bullets[i].vel;
    }
}


//updates position of falling objects
function fallObject(list, colour) {
    for (let i = 0; i < list.length; i += 1) {
        list[i].draw(list[i].x, list[i].y, list[i].radius, colour);
        list[i].y += list[i].vel;
        if (list[i].y > h + list[i].radius) {
            //removes objects if off screen and creates a new one
            list.splice(i, 1);
            putInList(Comp, list, list.length);
        }
    }
}

//changes plyers direction when left and right button pressed
function move() {
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) {
            if (Player.x - Player.radius > 0) {
                Player.vel = -5
            }
        }
        if (e.keyCode === 39) {
            if (Player.x + Player.radius < w) {
                Player.vel = 5
            }
        }
    });
}
move()

//function to work out length between two points
function length(x1, x2, y1, y2) {
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}


// let hyp = length(0, 0, 3, 4)
// console.log(hyp);
// console.log(typeof hyp);

//detects if objects are overlapping/collide
function collision() {
    //fuel and player
    for (let j = 0; j < prize.length; j += 1) {
        let px = Player.x;
        let py = Player.y;
        let pr = Player.radius;
        let sumRadii = pr + prize[j].radius;
        let centreToCentre = length(px, prize[j].x, py, prize[j].y)
        if (centreToCentre < sumRadii) {
            if (prize[j].radius > 9) {
                score += 2;
            }
            else {
                score += 1;
            }
            playSound(fuelSound);
            prize.splice(j, 1);
            putInList(Comp, prize, prize.length);
        }
    }
    for (let j = 0; j < asteroid.length; j += 1) {
        //asteroids and player
        let px = Player.x;
        let py = Player.y;
        let pr = Player.radius;
        let ar = asteroid[j].radius;
        let sumRadii = pr + asteroid[j].radius;
        let centreToCentre = length(px, asteroid[j].x, py, asteroid[j].y)
        if (centreToCentre < sumRadii) {
            endGame();
        }
        for (let i = 0; i < bullets.length; i += 1) {
            //asteroid and bullets
            let bx = bullets[i].x
            let by = bullets[i].y
            let bw = bullets[i].width
            let ax = asteroid[j].x
            let ay = asteroid[j].y
            let leftCornerToCentre = length(bx, ax, by, ay);
            let rightCornerToCentre = length(bx + bw, ax, by, ay);
            if (leftCornerToCentre <= ar || rightCornerToCentre <= ar) {
                // console.log("hit");
                score += 2;
                if (asteroid[j].radius < 20) {
                    asteroid.splice(j, 1)
                    putInList(Comp, asteroid, asteroid.length)
                }
                else {
                    asteroid[j].radius -= 10;
                }
                bullets.splice(i, 1);
            }
        }
    };
    for (let j = 0; j < missiles.length; j += 1) {
        //missiles and player
        let px = Player.x;
        let py = Player.y;
        let pr = Player.radius;
        let my = missiles[j].y;
        let mh = missiles[j].height;
        let mx = missiles[j].x;
        let mw = missiles[j].width;
        let leftCornerToCentre = length(px, mx, py, my + mh)
        let rightCornerToCentre = length(px, mx + mw, py, my + mh)
        if (leftCornerToCentre <= pr || rightCornerToCentre <= pr) {
            // console.log("hit");
            endGame();
        }
    }
}

//clears specified list
function clearList(listName) {
    listName.splice(0, listName.length);
}

//runs what should happen if you lose
function endGame() {
    playSound(damageSound);
    playSound(endGameSound);
    pause = true;
    if (score > highScore) {
        highScore = score
    }
    alert("Game Over. Your score is " + score +
        ". Your highscore is " + highScore);
    clearList(asteroid);
    clearList(prize);
    clearList(missiles);
    clearList(bullets);
    bulletCount = 0;
    createAsteroid();
    createPrize();
    Player.x = canvas.width / 2;
    Player.vel = 0;
    pause = false;
    //data to send to server to then go to database
    const user = {
        name: name,
        score: score
    };
    let dataToSend = JSON.stringify(user);
    console.log(dataToSend);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dataToSend
    };
    //fetchs data back from server
    fetch("/api", options).then(async function (response) {
        let text = await response.text();
        console.log(text);
    });
    score = 0;
}

//draw score
function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width / 2, 50);
    ctx.textAlign = "center";
}

//animated parts
function loop() {
    if (pause === false) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, w, h);
        // let t0 = performance.now();
        fallObject(asteroid, "red");
        fallObject(prize, "green");
        launchMissile(missiles, "grey");
        shootBullet();
        Player.draw(Player.x, Player.y, Player.radius, "cyan");
        playerUpdate();
        pushMissile();
        collision();
        drawScore();
        if (missiles.length > 0) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Missile Incoming", 10, 50);
        }

        if (bulletCount === 5) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Reload - R", 10, 100);
        }
        frames += 1;
        // let t1 = performance.now();
        // let fps = 1000 / (t1 - t0);
        // if (fps < 60) {
        //     console.log("too slow");
        // }
        requestAnimationFrame(loop)
    }
}