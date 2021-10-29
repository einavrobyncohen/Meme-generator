'use strict'

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log(ev)
    if(clickedCanvas(ev) ===-1) return;
    console.log(ev)
    const pos = getEvPos(ev)
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
    }
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function setLineDrag(isDrag) {
    gMeme.lines[getCurrSelectedLineIdx()].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[getCurrSelectedLineIdx()].pos.posx += dx
    gMeme.lines[getCurrSelectedLineIdx()].pos.posy += dy
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}


function onClickedCanvas(ev) {
    clickedCanvas(ev)
    renderInputText()
}


function onAddLine() {
    addLine()
    var elInput = document.getElementById('text-line')
    elInput.value = ''
}

function onDeleteLine() {
    deleteLine()
    renderInputText()
}

function onSetAlignment(direction) {
    setAlignment(direction)
}

function onSetStrokeColor(strokeColor) {
    setStrokeColor(strokeColor)
}

function onSetFontColor(fontColor) {
    setFontColor(fontColor)
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)
}

function onSwitchLine() {
    switchLine()
    renderInputText()
}

function onMoveLine(direction) {
    moveLine(direction)
}

function onChangeFontSize(request) {
    changeFontSize(request)
}

function onAddText(value) {
    addText(value)
}


function renderInputText() {
    var text = getTextForLineInput()
    var elInput = document.getElementById('text-line')
    elInput.value = `${text}`
}


function onUploadMeme() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-btn').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">Click Me!
        </a>`
    }
    doUploadMeme(imgDataUrl, onSuccess);
}

function onDownloadMeme(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpg')
    console.log(imgContent)
    elLink.href = imgContent
}

function onSaveMeme() {
    var memeUrl = gElCanvas.toDataURL('image/jpg')
    saveMeme(memeUrl)
}