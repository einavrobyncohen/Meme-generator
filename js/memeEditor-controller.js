'use strict'

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}


function onStickerClicked(elSticker) {
    const sticker = {
        isDrag: false,
        src: elSticker.src,
        pos: {
            x: gElCanvas.width/2,
            y: gElCanvas.height/2
        },
        width: 100,
        height: 82
    }
    gMeme.stickers.push(sticker)
    console.log(gMeme.stickers)
    renderCanvas()

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
    var text = getTextForDisplay()
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