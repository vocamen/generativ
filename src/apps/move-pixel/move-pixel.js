var imageData;
var width;
var height;
var c;
var oldCellData;
var newCellData;
var timer;
var stepWidth = 1;
var stepHeight = 10;

function loadCanvas(imagePath) {

    var oc = document.getElementById("originalCanvas");
    var ctx = oc.getContext("2d");
    var img = new Image();
    img.onload = function () {

        if (timer) {
            clearTimeout(timer);
            timer = 0;
        }

        oc.width = img.width;
        oc.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var originalImgData = ctx.getImageData(0, 0, img.width, img.height);
        var originalPixels = originalImgData.data;

        oldCellData = new Array(img.width * img.height);
        newCellData = new Array(img.width * img.height);

        for (var x = 0; x < img.width; x++) {
            for (var y = 0; y < img.height; y++) {
                var i = (x + y * img.width) * 4;

                var r = originalPixels[i];
                var g = originalPixels[i + 1];
                var b = originalPixels[i + 2];
                var a = originalPixels[i + 3];

                var tmpPv = rgbToInt(r, g, b)

                oldCellData[x + y * img.width] = tmpPv;
            }
        }
    };
    //img.crossOrigin = 'anonymous';
    img.src = imagePath;
}

function createImageData(canvasId, rule) {
    currentRule = rule;

    var element = document.getElementById(canvasId);
    c = element.getContext("2d");

    element.width = $(element).width();
    element.height = $(element).height();

    width = element.clientWidth;
    height = element.clientHeight;

    imageData = c.createImageData(width, height);

    anim();

    c.putImageData(imageData, 0, 0);
}

function widthSort() {
    for (var x = 0; x < width - 1; x += 1) {
        var ssum = 0;
        for (var y = 0; y < height - 1; y += 1) {
            var index = x + y * width;

            var nx = Math.round(Math.sin(6.283 * 0.2 * x / width) / Math.cos(6.283 * 0.2 * y / height) * width);
            var ny = Math.round(Math.sin(6.283 * 0.2 * y / height)  * height);
//            var newIndex = ( width - nx + (height - ny) * width);
            var newIndex = (nx + (height - ny) * width);

            newCellData[index] = oldCellData[newIndex];
        }
    }
}


var i = 0;

function anim() {
    widthSort();
    draw(imageData);
    timer = setTimeout(anim, 3000);
    oldCellData = newCellData.slice(0);
    c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var index = x + y * width;

            var r = newCellData[index] >> 16 & 0xFF;
            var g = newCellData[index] >> 8 & 0xFF;
            var b = newCellData[index] & 0xFF;

            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}