'use strict'

const KEY = 'memesDB'
var gElCanvas;
var gCtx;
var gCurrFontFamily = 'Impact'
var gStartPos;
var gStartPosSticker;
var gMemesForStorage = []

var gMeme = {
    seletedImgId: 0,
    selectedLineIdx: 0,
    selectedStickerIdx:null,
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
    ],
    stickers: []
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gMeme.stickers.forEach((sticker,idx) => {
        if (ev.offsetX >= sticker.pos.x && ev.offsetX <= sticker.pos.x+ sticker.width && ev.offsetY >= sticker.pos.y && ev.offsetY<= sticker.pos.y+sticker.height) {
            console.log('sticker')
            sticker.isDrag = true;
            gStartPosSticker = pos;
            document.body.style.cursor = 'grabbing'
            gMeme.selectedStickerIdx = idx
        }
    })
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
        renderCanvas()
        return;

    } else if(gMeme.stickers === []) {
        return;

    }
    else if(gMeme.stickers[getSelectedStickerIdx()].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPosSticker.x
        const dy = pos.y - gStartPosSticker.y
        gStartPosSticker = pos;
        moveSticker(dx, dy)
        renderCanvas()
    }
}


function onUp() {
    setLineDrag(false)
    gMeme.stickers[getSelectedStickerIdx()].isDrag = false;
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
    gMeme.stickers[getSelectedStickerIdx()].pos.x += dx
    gMeme.stickers[getSelectedStickerIdx()].pos.y += dy
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    
    return pos
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
        renderCanvas();
    }

    return clickedLine
}

function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines[currLineIdx].isSelected = false
    gMeme.selectedLineIdx = gMeme.lines.length-1
    renderCanvas()
}

function deleteLine() {
    if (gMeme.lines.length ===1) return;
    const currLineIdx = getCurrSelectedLineIdx()
    gMeme.lines.splice(currLineIdx,1)
    gMeme.selectedLineIdx = 0
    gMeme.lines[0].isSelected = true
    renderCanvas()
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

function changeFontSize(request) {
    const currLineIdx = getCurrSelectedLineIdx()
    if(request === 'inc') gMeme.lines[currLineIdx].size+=5
    else if (request === 'dec') gMeme.lines[currLineIdx].size-=5
    renderCanvas();
    _keepStickerOnCanvas()
}

function renderCanvas() {
    var imgId = gMeme.seletedImgId
    var selectedImg = getImgById(imgId)
    var img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        var aspectRatio = img.width / img.height
        gCtx.drawImage(img, 0, 0, gElCanvas.height * aspectRatio, gElCanvas.height);
        drawText()
        gMeme.stickers.forEach(sticker => {
            var stickerImg= new Image()
            stickerImg.src = sticker.src
            stickerImg.onload = () => {
                gCtx.drawImage(stickerImg, sticker.pos.x, sticker.pos.y, sticker.width, sticker.height);
            }
            
        })
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
    renderCanvas();
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
    renderCanvas()
    _keepStickerOnCanvas()

}

function setFontColor(fontColor) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currSelectedLineIdx].color = fontColor
    renderCanvas()
}

function setStrokeColor(strokeColor) {
    const currSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currSelectedLineIdx].stroke = strokeColor
    renderCanvas()
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
    renderCanvas()
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
    gMeme.stickers=[]
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


function saveMeme(memeUrl) {
    gMemesForStorage.push(memeUrl)
    _saveMemesToStorage()
}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemesForStorage)
}

function updateGMeme(id) {
    gMeme.seletedImgId = id
}

function getTextForDisplay() {
    const currLineIdx = getCurrSelectedLineIdx()
    return gMeme.lines[currLineIdx].txt
}

function getSelectedStickerIdx() {
    return gMeme.selectedStickerIdx
}


function getCurrSelectedLineIdx() {
    const idx = gMeme.selectedLineIdx
    return idx
}