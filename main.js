const wordEasy = [
    'علي', 'رؤي', 'لين',
]
const wordnormal = [
    'محمد', 'احمد', 'محمود',
]
const wordHard = [
    'عبد الرحيم', 'عبد الرحمن', 'عبد الله',
]
const lvls = {
    "Easy" : 3,
    "Normal" : 3,
    "Hard" : 3 ,
}
let defaultLevelNAme = "Easy"
let defaultLevelSeconds = lvls[defaultLevelNAme]
let statrBtn = document.querySelector('.start')
let lvlNAme = document.querySelector('.message .lvl')
let secondsSpan = document.querySelector('.message .seconds')
let theWord = document.querySelector('.the-word')
let upComing = document.querySelector('.upcoming-words')
let Input = document.querySelector('.input')
let leftTimeSpan = document.querySelector('.time span')
let score = document.querySelector('.score .got')
let totalScore = document.querySelector('.score .total')
let finishMsg = document.querySelector('.finish')
let level = document.getElementsByName("level")
level.forEach((item) => {
    item.onclick = function () {
        item.setAttribute("checked", 'checked')
        console.log(item.value);
        lvlNAme.innerHTML = item.value
    }
})

//lvlNAme.innerHTML = defaultLevelNAme
secondsSpan.innerHTML = defaultLevelSeconds
leftTimeSpan.innerHTML = defaultLevelSeconds
totalScore.innerHTML = wordEasy.length 

Input.onpaste = function () {
    return false
}
statrBtn.onclick =function () {
    this.remove()
    Input.focus()
    genWords()
}
 function genWords() {
    if (lvlNAme.innerHTML === "Easy") {
        action(wordEasy)
        startPlay()
    } else if (lvlNAme.innerHTML === "Normal") {
        action(wordnormal)
        startPlay()
    } else if (lvlNAme.innerHTML === "Hard") {
        action(wordHard)
        startPlay()
    }
 }
 function action(wordArray) {
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)]
    let WordIndex = wordArray.indexOf(randomWord)
    wordArray.splice(WordIndex, 1)
    theWord.innerHTML = randomWord
    upComing.innerHTML = ""
    for (let i = 0; i < wordArray.length; i++) {
        let div = document.createElement("div")
        let txt = document.createTextNode(wordArray[i])
        div.appendChild(txt)
        upComing.appendChild(div)
     }

 }
 function startPlay() {
     leftTimeSpan.innerHTML = defaultLevelSeconds
    let start = setInterval(() => {
        leftTimeSpan.innerHTML--
        if (leftTimeSpan.innerHTML === "0") {
            clearInterval(start)
            if (theWord.innerHTML.toLowerCase() === Input.value.toLowerCase()) {
                Input.value = ""
                score.innerHTML++
                if (wordEasy.length > 0 ) {
                    genWords()
                } else {
                let span = document.createElement("span")
                span.className = 'good'
                let spanText = document.createTextNode("Congratolations You Win ")
                span.appendChild(spanText)
                finishMsg.appendChild(span)
                }
            } else {
                let span = document.createElement("span")
                span.className = 'bad'
                let spanText = document.createTextNode("Game Over")
                span.appendChild(spanText)
                finishMsg.appendChild(span)
            }
        }
    }, 1000)
 }