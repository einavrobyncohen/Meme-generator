'use strict'


var gElCanvas;
var gCtx;
var gCurrFontFamily = 'Impact'

var gKeywords = {
    'happy':12,
    'funny': 1
}

var gImgs = _createImgs()

var gMeme = {
    seletedImgId: 5,
    selectedLineIdx: 0,
    lines:[
        {
            txt: '',
            size: 35,
            align:'center',
            color:'white',
            stroke:'black',
            pos: {
                posx: 230,
                posy: 50
            },
            isSelected: true
        },
        {
            txt: '',
            size: 35,
            align:'center',
            color:'white',
            stroke:'black',
            pos: {
                posx: 230,
                posy: 500
            },
            isSelected: false
        }
    ]
}

function doUploadMeme(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then((url)=>{
        console.log('Got back live url:', url);
        onSuccess(url)
    })
    .catch((err) => {
        console.error(err)
    })
}

function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines[currLineIdx].isSelected = false;
    gMeme.selectedLineIdx = gMeme.lines.length-1
    drawImg();
}

function deleteLine() {
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines.splice(currLineIdx,1)
    gMeme.selectedLineIdx = 0
    gMeme.lines[0].isSelected = true;
    drawImg();
}

function switchLine() { 
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines[currLineIdx].isSelected = false;
    if (currLineIdx === gMeme.lines.length-1) {
        gMeme.lines[0].isSelected = true;
        gMeme.selectedLineIdx = 0
    }
    else if (currLineIdx < gMeme.lines.length) {
        gMeme.lines[currLineIdx+1].isSelected = true;
        gMeme.selectedLineIdx = currLineIdx+1
    }  
    drawText()
}

function getTextForLineInput() {
    const currLineIdx = getCurrSelectedLineIdx()
    return gMeme.lines[currLineIdx].txt
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
        gCtx.strokeStyle = `${line.stroke}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.font = `${line.size}px ${gCurrFontFamily}`;
        gCtx.textAlign = `${line.align}`
        gCtx.fillText(line.txt, posx,posy);
        gCtx.strokeText(line.txt,posx,posy);
        drawTextBox(posx-215, posy-40, idx)
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
    gCtx.rect(x, y, gElCanvas.width-30, 60);
    gCtx.lineDashOffset = 0;

    // gCtx.shadowOffsetX = 2;
    // gCtx.shadowOffsetY = 2;
    // gCtx.shadowBlur = 2;
    // gCtx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    gCtx.strokeStyle = (!isSelected)? 'white': 'yellow'
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

function setFontColor(fontColor) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currSelectedLineIdx].color = fontColor
    drawImg();
}

function setStrokeColor(strokeColor) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currSelectedLineIdx].stroke = strokeColor
    drawImg();
}

function setAlignment(direction) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currSelectedLineIdx]
    switch (direction) {
        case 'left':
            currLine.align = 'end'
            break;
        case 'center':
            currLine.align = 'center'
            break;  
        case 'right':
            currLine.align = 'start'
            break; 
    }
    drawImg();
}

function _createLine() {
    const middleCanvasWidth = gElCanvas.width/2
    const middleCanvasHeight = gElCanvas.height/2

    var line = {
        txt: '',
        size: 25,
        align:'center',
        color:'white',
        stroke:'black',
        pos: {
            posx: middleCanvasWidth,
            posy: middleCanvasHeight
        },
        isSelected: true
    }  
    
    return line
}


function _createImg(id) {

    var img = {
        id:id,
        url: `img/${id}.jpg`,
        keywords:['happy']
    }

    return img
}

function _createImgs() {
    var imgs = [
        _createImg(1),
        _createImg(2),
        _createImg(3),
        _createImg(4),
        _createImg(5),
        _createImg(6),
        _createImg(7),
        _createImg(8),
        _createImg(9),
        _createImg(10),
        _createImg(11),
        _createImg(12),
        _createImg(13),
        _createImg(14),
        _createImg(15),
        _createImg(16),
        _createImg(17),
        _createImg(18)
    ]
 
    return imgs
}