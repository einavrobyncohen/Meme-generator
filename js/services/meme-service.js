'use strict'


var gElCanvas;
var gCtx;
var gCurrFontFamily = 'Impact'
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
    lines:[
        {
            txt: '',
            size: 25,
            align:'left',
            color:'red',
            pos: {
                posx: 20,
                posy: 60
            },
            isSelected: true
        },
        {
            txt: '',
            size: 25,
            align:'left',
            color:'red',
            pos: {
                posx: 20,
                posy: 270
            },
            isSelected: false
        }
    ]
}


function switchLine() { //switchcase? toggle?
    const currLineIdx = getCurrSelectedLineIdx()
    if (!currLineIdx) {
        gMeme.selectedLineIdx = 1
        gMeme.lines[0].isSelected = false;
        gMeme.lines[1].isSelected = true;

    } else {
        gMeme.selectedLineIdx = 0
        gMeme.lines[1].isSelected = false;
        gMeme.lines[0].isSelected = true;
    }
    drawText()
}

function moveLine(direction) {
    const currLineIdx = getCurrSelectedLineIdx()
    if(direction === 'up') gMeme.lines[currLineIdx].pos.posy--
    if(direction === 'down') gMeme.lines[currLineIdx].pos.posy++
    drawImg();

}

function changeFontSize(request) {
    const currLineIdx = getCurrSelectedLineIdx()
    if(request === 'inc') gMeme.lines[currLineIdx].size++
    else if (request === 'dec') gMeme.lines[currLineIdx].size--
    drawImg();
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

    gMeme.lines.forEach( (line,idx) => {
        var posx = line.pos.posx
        var posy = line.pos.posy
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = 'white';
        gCtx.font = `${line.size}px ${gCurrFontFamily}`;
        gCtx.fillText(line.txt, posx,posy);
        gCtx.strokeText(line.txt,posx,posy);
        drawTextBox(posx-10, posy-40, idx)
    })
    
}

function addText(value) {
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines[currLineIdx].txt = value
    drawImg();
}


function drawTextBox(x,y,idx) {
    var isSelected = gMeme.lines[idx].isSelected
    gCtx.beginPath();
    gCtx.rect(x, y, 280, 50);
    gCtx.strokeStyle = (isSelected)? 'black' : 'white'
    gCtx.stroke();
}


function updateGMeme(id) {
    gMeme.seletedImgId = id
}

function getImgById(id) {
    var img = gImgs.find(img => img.id === id)
    return img
}

function getCurrSelectedLineIdx() {
    const idx = gMeme.selectedLineIdx
    return idx
}

function setFontFamily(fontFamily) {
    switch (fontFamily) {
        case 'IMPACT':
            gCurrFontFamily = 'Impact'
            break;
        case 'ARIEL':
            gCurrFontFamily = 'Ariel'
            break;  
        case 'MONOSPACE':
            gCurrFontFamily = 'Monospace'
            break; 
        case 'FANTASY':
            gCurrFontFamily = 'Fantasy'
            break;
    }
    drawImg();
}