'use strict'


function renderSavedMemes(){
    var strHTML = ''
    var memes = loadFromStorage(KEY)
    if (!memes) return;
    for (var i=0; i<memes.length; i++) {
        strHTML += `<img class="meme-img" src="${memes[i]}">`
    }
    var elContainer = document.querySelector('.memes-container')
    elContainer.innerHTML = strHTML
}