'use strict'


function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function onAddText(value) {
    addText(value)
}

function onSelectImg(id) {
    updateGMeme(id)
    drawImg()
}