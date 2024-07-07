let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pi = Math.PI;


let Comp = {
    x: 0,
    y: 0,
    radius: 0,
    vel: 0,
    draw: function draw(x, y, radius, colour) {
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.arc(x, y, radius, 0, 2 * pi, true);
        ctx.fill();
    }
};

export default Object.freeze(Comp);