'use strict'

function init() {

    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', function(){
        gCtx.imageSmoothingEnabled = false
    }, false)


    introduceEventListeners()
    renderGallery()
}

function introduceEventListeners() {
    addMouseListeners()
    addTouchListeners()
}

function showNextKeywords() {
    var elContainer = document.querySelector('.keywords-nav')
    const strHTML ='<button onclick="showPreviousKeywords()"><img src="ICONS/left.png"></button>'
    const newStrHTML = `
    <li><a onclick="onTouchKeyWord(this)">Weird</a></li>
    <li><a onclick="onTouchKeyWord(this)">Movies</a></li>
    <li><a onclick="onTouchKeyWord(this)">Dogs</a></li>
    <li><a onclick="onTouchKeyWord(this)">Cats</a></li>
    <li><a onclick="onTouchKeyWord(this)">Love</a></li>
    <li><a onclick="onTouchKeyWord(this)">Shock</a></li>`
    elContainer.innerHTML = strHTML +newStrHTML
}

function showPreviousKeywords() {
    var elContainer = document.querySelector('.keywords-nav')
    const strHTML ='<button onclick="showNextKeywords()"><img src="ICONS/right.png"></button>'
    const newStrHTML = `
    <li><a onclick="onTouchKeyWord(this)">Happy</a></li>
    <li><a onclick="onTouchKeyWord(this)">Funny</a></li>
    <li><a onclick="onTouchKeyWord(this)">Crazy</a></li>
    <li><a onclick="onTouchKeyWord(this)">Animal</a></li>
    <li><a onclick="onTouchKeyWord(this)">Kids</a></li>
    <li><a onclick="onTouchKeyWord(this)">Politics</a></li>`
    elContainer.innerHTML = newStrHTML+strHTML 
}


function onTouchKeyWord(elKeyword) {
    const keyWord = elKeyword.innerText.toLowerCase();
    gKeywords[keyWord]+=5
    elKeyword.style.fontSize = gKeywords[keyWord] + 'px'
    onEnterKeyWord(keyWord)
}

function removeSearch() {
    var elSearchInput = document.getElementById('keyword')
    elSearchInput.value = ''
    renderGallery()
}

function onEnterKeyWord(value) {
    var elInput = value.toLowerCase();
    var imgs = []
    if (elInput === '') {
        var searchBtn = document.querySelector('.search-button')
        searchBtn.innerHTML = `<img src="ICONS/search.png">`
        renderGallery()
        return;
    }
    var searchBtn = document.querySelector('.search-button')
    searchBtn.innerHTML = `<img src="ICONS/remove-search.png">`

    gImgs.forEach(img => {
        var keyWordsLength = img.keywords.length
        for (var i=0; i<keyWordsLength ; i++) {
            if(img.keywords[i].substr(0, value.length).toLowerCase() === elInput) {
                imgs.push(img)
            }
        }
    })
    renderGallery(imgs)
}

function renderGallery(images) {
    var imgs = getImgsForDisplay(images)
    const strHTML = imgs.map(img => {
        return ` <img class="img${img.id} grid-square" onclick="onSelectImg(${img.id})" src="${img.url}">`
    })
    var elGallery = document.querySelector('.image-gallery-container')
    const elSection = '<section class="image-gallery">'
    elGallery.innerHTML =  elSection+strHTML.join('')+ '</section>'
}

function onSelectImg(id) {
    var elEditor = document.querySelector('.meme-editor')
    elEditor.hidden = false
    var elMain = document.querySelector('main')
    elMain.hidden = true
    updateGMeme(id)
    drawImg()
}

function showGallery() {
    var elEditor = document.querySelector('.meme-editor')
    elEditor.hidden = true
    var elSaved = document.querySelector('.saved-memes')
    elSaved.hidden= true
    var elInput = document.getElementById('text-line')
    elInput.value = ''
    resetCanvas()
    var elMain = document.querySelector('main')
    elMain.hidden = false
    document.body.classList.remove('menu-open')
}

function showSaved() {
    var elEditor = document.querySelector('.meme-editor')
    elEditor.hidden = true
    var elSaved = document.querySelector('.saved-memes')
    elSaved.hidden= false
    var elInput = document.getElementById('text-line')
    elInput.value = ''
    resetCanvas()
    var elMain = document.querySelector('main')
    elMain.hidden = true
    document.body.classList.remove('menu-open')
    renderSavedMemes()

}

function toggleMenu(elBtn) {
    document.body.classList.toggle('menu-open')
    if (document.body.classList.contains('menu-open')) {
        elBtn.innerText = 'X'
    } else {
        elBtn.innerText = '☰'
    }
}

function toggleSearchBtn(elBtn) {
    elBtn.innerHTML = `<img src="ICONS/search.png">`
    removeSearch()
}