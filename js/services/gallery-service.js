'use strict'

var gImgs = _createImgs()

var gKeywords = {
    'happy':21,
    'funny': 30,
    'crazy': 13,
    'animal': 24,
    'kids' :19,
    'politics':25,
    'weird':21,
    'movies': 30,
    'dogs': 13,
    'cats': 24,
    'love' :19,
    'shock':25
}



function _createImg(id,keywords) {

    var img = {
        id:id,
        url: `img/${id}.jpg`,
        keywords:keywords
    }
    return img
}


function _createImgs() {
    var imgs = [
        _createImg(1, ['politics', 'crazy']),
        _createImg(2 , ['animal', 'happy','dogs','love']),
        _createImg(3 ,['animal', 'happy', 'kids','dogs']),
        _createImg(4, ['animal','cats']),
        _createImg(5, ['kids', 'funny']),
        _createImg(6, ['funny']),
        _createImg(7, ['funny', 'kids','shock']),
        _createImg(8, ['funny','movies']),
        _createImg(9, ['funny', 'kids', 'crazy','weird']),
        _createImg(10, ['funny', 'politics']),
        _createImg(11, ['funny', 'crazy','love','weird']),
        _createImg(12, ['funny','weird']),
        _createImg(13, ['happy','movies']),
        _createImg(14, ['crazy','movies']),
        _createImg(15, ['funny','weird']),
        _createImg(16, ['funny', 'happy','shock','movies']),
        _createImg(17, ['politics', 'crazy']),
        _createImg(18, ['funny','shock','movies'])
    ]
    return imgs
}

function getImgById(id) {
    var img = gImgs.find(img => img.id === id)
    return img
}


function getImgsForDisplay(imgs= gImgs) {
    if (imgs === []) return gImgs
    else return imgs
}

function getImgs() {
    return gImgs
}

function getKeywords() {
    return gKeywords
}
