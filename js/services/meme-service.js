'use strict'
var gElCanvas;
var gCtx;
var gKeywords = {
    'happy':12,
    'funny': 1
}

var gImgs = [
    {
        id:1,
        url: 'img/1.jpg',
        keywords:['happy']
    },

    {
        id:2,
        url: 'img/2.jpg',
        keywords:['happy']
    }
]

var gMeme = {
    seletedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 25,
            align:'left',
            color:'red'
        }
    ]
}

function drawImg() {
    var imgId = gMeme.seletedImgId
    var selectedImg = getImgById(imgId)

    var img = new Image()
    img.src = selectedImg.url

    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
      drawText()
    };
}

function drawText() {
    var text = gMeme.lines[0].txt
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '30px Impact';
    gCtx.fillText(text, 20,50);
    gCtx.strokeText(text, 20,50);
}


function addText(value) {
    gMeme.lines[0].txt = value
    drawImg();
}


function updateGMeme(id) {
    gMeme.seletedImgId = id
}

function getImgById(id) {
    var img = gImgs.find(img => img.id === id)
    return img
}