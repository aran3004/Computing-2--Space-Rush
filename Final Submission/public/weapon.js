let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let Weapon = {
    x: 100,
    y: 0,
    width: 10,
    height: 20,
    vel: 1,
    colour: "grey",
    draw: function draw(x, y, width, height, colour) {
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, width, height, colour);
        ctx.fill();
    }
};

export default Object.freeze(Weapon);