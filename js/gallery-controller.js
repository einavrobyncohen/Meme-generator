'use strict'

function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', function(){
        gCtx.imageSmoothingEnabled = false
    }, false)
    addMouseListeners()
    renderGallery()
}


function showNextKeywords(isFirst) {
    const FirstKeyWordList =['Happy','Funny','Crazy','Animal','Kids','Politics']
    const SecondKeyWordList = ['Weird','Movies','Dogs','Cats','Love','Shock']
    var keywords = (isFirst)? FirstKeyWordList : SecondKeyWordList
    var elContainer = document.querySelector('.keywords-nav')
    const newStrHTML = `
    <button onclick="showNextKeywords(true)"><img src="ICONS/left.png"></button>
    <li><a onclick="onTouchKeyWord(this)">${keywords[0]}</a></li>
    <li><a onclick="onTouchKeyWord(this)">${keywords[1]}</a></li>
    <li><a onclick="onTouchKeyWord(this)">${keywords[2]}</a></li>
    <li><a onclick="onTouchKeyWord(this)">${keywords[3]}</a></li>
    <li><a onclick="onTouchKeyWord(this)">${keywords[4]}</a></li>
    <li><a onclick="onTouchKeyWord(this)">${keywords[5]}</a></li>
    <button onclick="showNextKeywords(false)"><img src="ICONS/right.png"></button>`
    elContainer.innerHTML = newStrHTML
}

function onTouchKeyWord(elKeyword) {
    var keywords = getKeywords()
    const keyWord = elKeyword.innerText.toLowerCase();
    keywords[keyWord]+=5
    elKeyword.style.fontSize = keywords[keyWord] + 'px'
    onEnterKeyWord(keyWord)
}

function removeSearch() {
    var elSearchInput = document.getElementById('keyword')
    elSearchInput.value = ''
    renderGallery()
}

function onEnterKeyWord(value) {
    var elInput = value.toLowerCase();
    const images = getImgs()
    var imgs = []
    if (elInput === '') {
        var searchBtn = document.querySelector('.search-button')
        searchBtn.innerHTML = `<img src="ICONS/search.png">`
        renderGallery()
        return;
    }
    var searchBtn = document.querySelector('.search-button')
    searchBtn.innerHTML = `<img src="ICONS/remove-search.png">`

    images.forEach(img => {
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

function removeSearchBtn(elBtn) {
    elBtn.innerHTML = `<img src="ICONS/search.png">`
    removeSearch()
}