const input = document.getElementById("name");
const button = document.getElementById("button");
const lista = document.getElementById("list");
const lis = document.querySelectorAll('li')

button.addEventListener("click", (e) => {
    e.preventDefault();

    if (input.value.trim() !== "") {
        saveUcenik();
    } else {
        alert("Upiši ime")
    }
});

function saveUcenik() {
    const uceniciIzStorage = localStorage.getItem("ucenici")
    if (uceniciIzStorage) {
        let ucenici = JSON.parse(uceniciIzStorage);
        const ucenik = {
            ime: input.value
        }
        ucenici.push(ucenik);
        localStorage.setItem("ucenici", JSON.stringify(ucenici));
        displayName(input.value)
    } else {
        const ucenici = [{
            ime: input.value
        }];
        const stringifiedUcenici = JSON.stringify(ucenici);
        localStorage.setItem("ucenici", stringifiedUcenici);
        displayName(input.value)
    }
}

function loadUcenici() {
    const data = localStorage.getItem("ucenici");
    if (data) {
        const ucenici = JSON.parse(data)
        const imena = ucenici.map((ucenik) => ucenik.ime);
        randomPick(imena)

        let newLi;
        const lis = imena.map((ime) => {
            newLi = document.createElement("li");
            const newContent = document.createTextNode(ime);
            newLi.appendChild(newContent);
            return newLi;
        })

        lis.map((li) => {
            lista.appendChild(li)
        });
    }
}

function displayName(name) {
    newLi = document.createElement("li");
    const newContent = document.createTextNode(name);
    newLi.appendChild(newContent);
    lista.appendChild(newLi)
}

function randomPick(obj) {
    const heading = document.getElementById("pick")
    if (obj) {
        const no = Math.floor(Math.random() * obj.length);
        pickedStudent = obj[no]
        heading.innerHTML = pickedStudent;
    }
}

// clock *******
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'lightyellow';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'lightyellow');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// date *****
//const date = new Date();
//document.getElementById("date").innerHTML = date;

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();
document.querySelector("#date").innerHTML = (today.toLocaleDateString("en-US", options));

loadUcenici()