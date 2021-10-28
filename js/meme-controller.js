'use strict'

function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    window.addEventListener('resize', function(){
        gCtx.imageSmoothingEnabled = false;
    }, false)

}

function toggleMenu(elBtn) {
    document.body.classList.toggle('menu-open')
    if (document.body.classList.contains('menu-open')) {
        elBtn.innerText = 'X'
    } else {
        elBtn.innerText = '☰'
    }
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
    elLink.href = imgContent
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

function onSelectImg(id) {
    var elEditor = document.querySelector('.meme-editor')
    elEditor.hidden = false;

    var elMain = document.querySelector('main')
    elMain.hidden = true;
    
    updateGMeme(id)
    drawImg()
}

function renderInputText() {
    var text = getTextForLineInput()
    var elInput = document.getElementById('text-line')
    elInput.value = `${text}`

}

function hideEditor() {
    var elEditor = document.querySelector('.meme-editor')
    elEditor.hidden = true;

    var elMain = document.querySelector('main')
    elMain.hidden = false;
}

