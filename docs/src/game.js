var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var A2 = H / 20 * 7;
var A1 = H / 20 * 15;

var clock = 0;
var count = 0;
var point = 0;

var modeN;
var modeV;
var intervalV;
var speedN;
var speedV;

var level = document.getElementById('level');
var counter = document.getElementById('counter');
var pointer = document.getElementById('pointer');
var speeder = document.getElementById('speeder');
var viewer = document.getElementById('viewer');
var sound = document.getElementById('input-sound');

var objects = [];

var lastKey = null;

function clear() {
    context.clearRect(0, 0, W, H);
    context.beginPath();
    context.moveTo(W / 3 * 1, 0);
    context.lineTo(W / 3 * 1, H);
    context.moveTo(W / 3 * 2, 0);
    context.lineTo(W / 3 * 2, H);
    context.moveTo(W / 3 * 3, 0);
    context.lineTo(W / 3 * 3, H);
    context.moveTo(0, A2);
    context.lineTo(W, A2);
    context.moveTo(0, A1);
    context.lineTo(W, A1);
    context.stroke();
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function areaX(x) {
    if (x < (W / 3 * 1))
        return CL;
    else if (x < (W / 3 * 2))
        return CM;
    else
        return CR;
}

function areaY(y) {
    if (y < A2 - 40)
        return 3;
    else if (y < A1 - 40)
        return 2;
    else
        return 1;
}

function move() {
    var f = setInterval(function() {
        clear();

        var interval = Math.floor(intervalV / Math.floor(speedV / 10)) * 10

        if (clock % interval == 0) objects.push(Object.fromInt(rand(modeV)));

        if (objects.length == 0) {
            clock++;
            return;
        }

        objects.forEach(object => {
            context.drawImage(object.image, object.x, object.y);
            object.y = object.y + (speedV / 100);
        });

        if (lastKey != null) {
            get = objects[0].input(lastKey, areaY(objects[0].y));

            if (get == 0) {
                end(f, 'miss');
                return;
            }

            count++;
            point += get;
            speedV++;

            counter.innerHTML = count;
            pointer.innerHTML = point;
            speeder.innerHTML = Math.floor(speedV / 10);
            viewer.innerHTML = get;

            sound.play();

            objects.shift();

            lastKey = null;

        } else if (objects.length != 0 && objects[0].y > 600) {
            end(f, 'over');
        }

        clock++;
    }, 5);
}

function start() {
    modeN = document.location.search.substring(1).split(',')[0];
    speedN = document.location.search.substring(1).split(',')[1];
    level.innerHTML = `${modeN}(${speedN})`;

    if (modeN == 'easy') {
        modeV = 8;
        intervalV = 160;
    } else {
        modeV = 18;
        intervalV = 120;
    }
    if (speedN == 'slow') speedV = 40;
    else if (speedN == 'normal') speedV = 80;
    else speedV = 120;

    document.addEventListener('keydown', e => {
        if (lastKey == null) lastKey = e.keyCode;
    });
    canvas.addEventListener('click', e => {
        var x = e.clientX - e.target.getBoundingClientRect().left;

        if (lastKey == null) lastKey = areaX(x);
    }, false);

    move();
}

function end(f, sound) {
    clearInterval(f);
    document.getElementById(`${sound}-sound`).play();
    alert(`game over`);
}

start();
