'use strict'


function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)

}

function onSwitchLine() {
    switchLine()
    var elInput = document.getElementById('text-line')
    elInput.value = ''
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
    updateGMeme(id)
    drawImg()
}