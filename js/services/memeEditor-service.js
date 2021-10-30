'use strict'


const KEY = 'memesDB'
var gElCanvas;
var gCtx;
var gCurrFontFamily = 'Impact'
var gStartPos;

var gSticker = _createStickers()
var gStartPosSticker;

var gMemesForStorage = []

var gMeme = {
    seletedImgId: 0,
    selectedLineIdx: 0,
    lines:[
        {
            txt: '',
            size: 30,
            align:'center',
            color:'white',
            stroke:'black',
            pos: {
                posx: 230,
                posy: 65
            },
            isSelected: true,
            isDrag: false
        },
        {
            txt: '',
            size: 30,
            align:'center',
            color:'white',
            stroke:'black',
            pos: {
                posx: 230,
                posy: 460
            },
            isSelected: false,
            isDrag: false
        }
    ]
}


function onDown(ev) {
    const pos = getEvPos(ev)
    if(ev.target.nodeName === 'IMG'){
        gSticker.selectedStickerIdx = +ev.target.src.charAt(ev.target.src.length-5)-1
        gSticker.stickers[gSticker.selectedStickerIdx].isPicked = true;
        gSticker.stickers[gSticker.selectedStickerIdx].isPlaced = true;
        drawSticker()
        return;
    }
    if(ev.offsetX >=190 && ev.offsetX <= 290 && ev.offsetY >=240 && ev.offsetY <=345) {
        if (!gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) return
        if (!gSticker.stickers[gSticker.selectedStickerIdx].isPicked) return
        gSticker.stickers[gSticker.selectedStickerIdx].isDrag = true;
        gStartPosSticker = pos;
        document.body.style.cursor = 'grabbing'

        return;
    }
    if(ev.offsetX >= gSticker.stickers[gSticker.selectedStickerIdx].pos.posx && ev.offsetX <= gSticker.stickers[gSticker.selectedStickerIdx].pos.posx+gSticker.stickers[gSticker.selectedStickerIdx].width && ev.offsetY>= gSticker.stickers[gSticker.selectedStickerIdx].pos.posy && ev.offsetY <= gSticker.stickers[gSticker.selectedStickerIdx].pos.posy+ gSticker.stickers[gSticker.selectedStickerIdx].height ) {
        gSticker.stickers[gSticker.selectedStickerIdx].isDrag = true;
        gStartPosSticker = pos;
        document.body.style.cursor = 'grabbing'
    }
    if(clickedCanvas(ev) ===-1) return;
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}


function onMove(ev) {
    const line = gMeme.lines[getCurrSelectedLineIdx()]
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveLine(dx, dy)
        drawImg()
    } else if(gSticker.stickers[gSticker.selectedStickerIdx].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPosSticker.x
        const dy = pos.y - gStartPosSticker.y
        gStartPosSticker = pos;
        moveSticker(dx, dy)
        drawSticker()
    }
}

function onUp() {
    setLineDrag(false)
    gSticker.stickers[gSticker.selectedStickerIdx].isDrag = false;
    gSticker.stickers[gSticker.selectedStickerIdx].isPicked = false;
    document.body.style.cursor = 'grab'
}

function setLineDrag(isDrag) {
    gMeme.lines[getCurrSelectedLineIdx()].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[getCurrSelectedLineIdx()].pos.posx += dx
    gMeme.lines[getCurrSelectedLineIdx()].pos.posy += dy
}

function moveSticker(dx, dy) {
    gSticker.stickers[gSticker.selectedStickerIdx].pos.posx += dx
    gSticker.stickers[gSticker.selectedStickerIdx].pos.posy += dy
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    
    return pos
}

function _createStickers() {
    var allStickers = {
        selectedStickerIdx: 0,
        stickers: [
            {
                isPlaced: false,
                isPicked:false,
                isDrag:false,
                url: 'STICKERS/1.gif',
                pos: {
                    posx: 190,
                    posy: 230
                },
                width: 100,
                height: 82
            },
            {
                isPlaced: false,
                isPicked:false,
                isDrag:false,
                url: 'STICKERS/2.gif',
                pos: {
                    posx: 190,
                    posy: 230
                },
                width: 150,
                height: 100
            },
            {
                isPlaced: false,
                isPicked:false,
                isDrag:false,
                url: 'STICKERS/3.png',
                pos: {
                    posx: 190,
                    posy: 230
                },
                width: 100,
                height: 100
            },
            {
                isPlaced: false,
                isPicked:false,
                isDrag:false,
                url: 'STICKERS/4.png',
                pos: {
                    posx: 190,
                    posy: 230
                },
                width: 150,
                height: 150
            },
            {
                isPlaced: false,
                isPicked:false,
                isDrag:false,
                url: 'STICKERS/5.png',
                pos: {
                    posx: 190,
                    posy: 230
                },
                width: 100,
                height: 150
            }
        ]
    }
        

    return allStickers
}


function drawSticker() {
    drawImg();
    var img = new Image()
    img.src = gSticker.stickers[gSticker.selectedStickerIdx].url
    img.onload = () => {
        gCtx.drawImage(img, gSticker.stickers[gSticker.selectedStickerIdx].pos.posx, gSticker.stickers[gSticker.selectedStickerIdx].pos.posy, gSticker.stickers[gSticker.selectedStickerIdx].width, gSticker.stickers[gSticker.selectedStickerIdx].height);
        drawText()
    }
}

function clickedCanvas(ev) {
    var clickedLine;
    if (document.body.clientWidth < 740) {
        clickedLine = gMeme.lines.findIndex(line => {
            console.log()
            return (
              ev.offsetX > line.pos.posx-220 &&
              ev.offsetX < (line.pos.posx+gElCanvas.width-60)/3 &&
              ev.offsetY > (line.pos.posy-70)/2 &&
              ev.offsetY < (line.pos.posy+30)/2
            )
          })
    } else {
        clickedLine = gMeme.lines.findIndex(line => {
            return (
              ev.offsetX > line.pos.posx-215 &&
              ev.offsetX < line.pos.posx+gElCanvas.width-30 &&
              ev.offsetY > line.pos.posy-40 &&
              ev.offsetY < line.pos.posy+60
            )
          })
    }
    if (clickedLine !== -1) {
        gMeme.lines[clickedLine].isSelected = true;
        gMeme.selectedLineIdx = clickedLine

        for (var i=0; i<gMeme.lines.length; i++) {
            if (i=== clickedLine) continue;
            gMeme.lines[i].isSelected = false;
        }
        drawImg();
        if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
            drawSticker();
        }
    }

    return clickedLine
}

function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines[currLineIdx].isSelected = false
    gMeme.selectedLineIdx = gMeme.lines.length-1
    drawImg()
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
}

function deleteLine() {
    if (gMeme.lines.length ===1) return;
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines.splice(currLineIdx,1)
    gMeme.selectedLineIdx = 0
    gMeme.lines[0].isSelected = true
    drawImg()
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
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


function changeFontSize(request) {
    const currLineIdx = getCurrSelectedLineIdx()
    if(request === 'inc') gMeme.lines[currLineIdx].size+=5
    else if (request === 'dec') gMeme.lines[currLineIdx].size-=5
    drawImg();
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
    
}

function drawImg() {
    var imgId = gMeme.seletedImgId
    var selectedImg = getImgById(imgId)
    var img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        var aspectRatio = img.width / img.height
        gCtx.drawImage(img, 0, 0, gElCanvas.height * aspectRatio, gElCanvas.height);
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
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
    
}

function drawTextBox(x,y,idx) {
    var isSelected = gMeme.lines[idx].isSelected
    gCtx.beginPath()
    gCtx.rect(x, y, gElCanvas.width-30, 60);
    gCtx.lineDashOffset = 0;
    gCtx.strokeStyle = (!isSelected)? 'white': 'purple'
    gCtx.stroke()
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
    drawImg()
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }

}

function setFontColor(fontColor) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currSelectedLineIdx].color = fontColor
    drawImg()
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
    
}

function setStrokeColor(strokeColor) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currSelectedLineIdx].stroke = strokeColor
    drawImg()
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
    
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
    drawImg()
    if (gSticker.stickers[gSticker.selectedStickerIdx].isPlaced) {
        drawSticker();
    }
}

function _createLine() {
    const middleCanvasWidth = gElCanvas.width/2
    const middleCanvasHeight = gElCanvas.height/2

    var line = {
        txt: '',
        size: 30,
        align:'center',
        color:'white',
        stroke:'black',
        pos: {
            posx: middleCanvasWidth,
            posy: middleCanvasHeight
        },
        isSelected: true,
        isDrag: false
    }  
    return line
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

function updateGMeme(id) {
    gMeme.seletedImgId = id
}


function getCurrSelectedLineIdx() {
    const idx = gMeme.selectedLineIdx
    return idx
}

function resetCanvas() {
    gMeme.lines.forEach((line, idx) => {
        if (!idx) line.isSelected = true;
        else line.isSelected = false;
        line.txt = ''
    })
    gMeme.lines[0].isSelected = true;
    gMeme.selectedLineIdx = 0
    const secondLine = restoreLines();
    gMeme.lines = secondLine
    gSticker.stickers.forEach(sticker => {
        sticker.isPicked = false
        sticker.isPlaced = false
    })
}

function restoreLines() {
    var lines= [
        {
            txt: '',
            size: 30,
            align:'center',
            color:'white',
            stroke:'black',
            pos: {
                posx: 230,
                posy: 50
            },
            isSelected: true,
            isDrag: false
        },
        {
            txt: '',
            size: 30,
            align:'center',
            color:'white',
            stroke:'black',
            pos: {
                posx: 230,
                posy: 460
            },
            isSelected: false,
            isDrag: false
        }
    ]
    return lines
}

function saveMeme(memeUrl) {
    gMemesForStorage.push(memeUrl)
    _saveMemesToStorage()
}


function _saveMemesToStorage() {
    saveToStorage(KEY, gMemesForStorage)
}
