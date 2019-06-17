window.onload = function() {
    pencil();
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var clear = document.getElementById('clearCanvas');
var colorEl = document.getElementById('color');
// context.lineWidth = 5;
// context.lineCap = 'round';
var mouse = {x: 0, y: 0};
var start_mouse = {x: 0, y: 0};
var circle = false;
var rectange = false;
var trait = false;
var down = false;

// Effacement du contenu

clear.onclick = function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// On définit le pointeur pour commencer à dessiner

function draw(e) {
    xPos = e.clientX - canvas.offsetLeft - 5;
    yPos = e.clientY - canvas.offsetTop - 40;
    
    if (down == true) {
        context.lineTo(xPos, yPos);
        context.stroke();
    }
}

function gomme() {
    context.strokeStyle = "white";
    context.lineWidth = 20;
}

colorEl.addEventListener('change', function() {
    context.strokeStyle = this.value;
    context.lineWidth = 5;
})

function pencil() {
    circle = false;
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', function () {
        canvas.addEventListener('mouseup', function () {
            down = false;
        });
        down = true;
        context.beginPath();
        context.moveTo(xPos, yPos);
        canvas.addEventListener('mousemove', draw);
    });
    
    context.strokeStyle = "black";
    context.lineWidth = 5;
}

// Importation de l'image sur le canvas

document.getElementById('files').onchange = function(e) {
    var img = new Image();
    img.onload = drawImg;
    img.src = URL.createObjectURL(this.files[0])
};

function drawImg() {
    context.drawImage(this, 380, 250, 500, 425);
}

function rond() {
    down = false;
    circle = true;
    // clearCanvas();
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousemove', function(e) {
        if (circle == true) {
            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        }
    }, false);

    canvas.addEventListener('mousedown', function(e) {
        if (circle == true) {
            canvas.addEventListener('mousemove', rond, false);
            canvas.addEventListener("mouseup", function() {
                down = false;
            });
        }
        canvas.addEventListener('mouseup', function() {
            if (circle == true) {
                canvas.removeEventListener('mousemove', rond, false);
                context.drawImage(canvas, 0, 0);
            }
        }, false);

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

        start_mouse.x = mouse.x;
        start_mouse.y = mouse.y;

    }, false);

    var x = (mouse.x + start_mouse.x) / 2;
    var y = (mouse.y + start_mouse.y) / 2;

    var radius = Math.max (
        Math.abs(mouse.x - start_mouse.x),
        Math.abs(mouse.y - start_mouse.y)) / 2;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

};

function multi_tab() {
    down = false;
    rectangles = true;

    canvas.addEventListener('mousemove', function (e) {
        if (rectangles == true) {
            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        }
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        if (rectangles == true) {
            canvas.addEventListener('mousemove', multi_tab, false);

            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

            start_mouse.x = mouse.x;
            start_mouse.y = mouse.y;

            multi_tab();
        }
    }, false);

    canvas.addEventListener('mouseup', function () {
        if (rectangles == true) {
            canvas.removeEventListener('mousemove', multi_tab, false);

            context.drawImage(canvas, 0, 0);


        }
    }, false);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    var width = Math.abs(mouse.x - start_mouse.x);
    var height = Math.abs(mouse.y - start_mouse.y);
    context.strokeRect(x, y, width, height);

}

function full_circle() {
    down = false;
    circle = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousemove', function(e) {
        if (circle == true) {
            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY; 
        }
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        if (circle == true) {
            canvas.addEventListener('mousemove', full_circle, false);
            canvas.addEventListener('mouseup', function () {
                down = false;
            });
        }
        canvas.addEventListener('mouseup', function () {
            if (circle == true) {
                canvas.removeEventListener('mousemove', full_circle, false);
                context.drawImage(canvas, 0, 0);
            }
        }, false);

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

        start_mouse.x = mouse.x;
        start_mouse.y = mouse.y;

    }, false);

    var x = (mouse.x + start_mouse.x) / 2;
    var y = (mouse.y + start_mouse.y) / 2;

    var radius = Math.max(
        Math.abs(mouse.x - start_mouse.x),
        Math.abs(mouse.y - start_mouse.y)) / 2;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
    context.fillStyle = colorEl.value;
    context.closePath();
}

function full_carre() {
    down = false;
    rectangles = true;

    canvas.addEventListener('mousemove', function (e) {
        if (rectangles == true) {
            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        }
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        if (rectangles == true) {
            canvas.addEventListener('mousemove', full_carre, false);

            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

            start_mouse.x = mouse.x;
            start_mouse.y = mouse.y;

            full_carre();
        }
    }, false);

    canvas.addEventListener('mouseup', function () {
        if (rectangles == true) {
            canvas.removeEventListener('mousemove', full_carre, false);

            context.drawImage(canvas, 0, 0);


        }
    }, false);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    var width = Math.abs(mouse.x - start_mouse.x);
    var height = Math.abs(mouse.y - start_mouse.y);
    context.beginPath();
    context.fillStyle = colorEl.value;
    context.fillRect(x, y, width, height);
    context.closePath();

}

function saveImage() {
    imageSave = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    window.location.href = imageSave;
}

var tailleElt = document.getElementById('taille');
tailleElt.addEventListener('change', function(e){
    context.lineWidth = this.value;
})

function traits() {
    down = false;
    trait = true;
    canvas.addEventListener('mousemove', function(e) {
        if (trait == true) {
            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        }
    }, false);

    canvas.addEventListener('mousedown', function(e) {
        if (trait == true) {
            canvas.addEventListener('mousemove', traits, false);

            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

            start_mouse.x = mouse.x;
            start_mouse.y = mouse.y;
        }
    }, false);

    canvas.addEventListener('mouseup', function () {
        if (trait == true) {
            canvas.removeEventListener('mousemove', traits, false);

            context.drawImage(canvas, 0, 0);

        }
    }, false);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(start_mouse.x, start_mouse.y);
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
}




