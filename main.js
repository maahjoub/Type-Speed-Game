const words = [ 
    
    wordEasy = 
    [
        'علي', 'رؤي', 'لين', 
        'اثار',
        'امير',
        'ادم',
        'انس',
        'بارق',
        'ريان',
        'زين',
        'عمر',
        'كنان',
        'زيد',
        'نجم',
        'نوح'
    ],

    wordnormal = [
        'محمد', 'احمد', 'محمود',
        'اجلال',
        'احسان',
        'اخلاص',
        'توفيق',
        'حازم',
        'حسام',
        'حبيب',
        'مالك',
        'مروان',
        'حمزه',
        'غسان',
        'يوسف'
    ],
    wordHard = [
        'عبد الرحيم', 'عبد الرحمن', 'عبد الله',
        'ادهم',
        'لوساندا',
        'داوود',
        'عيسي',
        'ميريام',
        'شاهيناز',
        'مرجان',
        'ياسمين',
        'مهدية',
        'سلسبيل',
        'يعقوب',
        'شاهين'
    ]
]
const lvls = {
    "Easy" : 3,
    "Normal" : 4,
    "Hard" : 6,
}



let statrBtn = document.querySelector('.start')
let lvlNAme = document.querySelector('.message .lvl')
var secondsSpan = document.querySelector('.message .seconds')
let theWord = document.querySelector('.the-word')
let upComing = document.querySelector('.upcoming-words')
let Input = document.querySelector('.input')
var leftTimeSpan = document.querySelector('.time span')
let score = document.querySelector('.score .got')
let totalScore = document.querySelector('.score .total')
let finishMsg = document.querySelector('.finish')
let finishimg = document.querySelector('.finish img')
let level = document.getElementsByName("level")
let ChooseH2 = document.querySelector(".Choose")
let options = document.querySelector(".options")
var x = level.forEach((item) => {
    item.onclick = function () {
        item.setAttribute("checked", 'checked')
        lvlNAme.innerHTML = item.value
        secondsSpan.innerHTML = lvls[item.value]
        leftTimeSpan.innerHTML = lvls[item.value]
        defaultLevelSeconds = parseInt(lvls[item.value])
    }
})

totalScore.innerHTML = wordEasy.length 

Input.onpaste = function () {
    return false
}
statrBtn.onclick =function () {
    this.remove();
    ChooseH2.remove();
    options.remove();
    Input.focus()
    genWords()
}
 function genWords() {
    if (lvlNAme.innerHTML === "Easy") {
        action(wordEasy)
        startPlay(wordEasy)
    } else if (lvlNAme.innerHTML === "Normal") {
        action(wordnormal)
        startPlay(wordnormal)
    } else if (lvlNAme.innerHTML === "Hard") {
        action(wordHard)
        startPlay(wordHard)
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
 function startPlay(words) {
     leftTimeSpan.innerHTML = defaultLevelSeconds
    let start = setInterval(() => {
        leftTimeSpan.innerHTML--
        if (leftTimeSpan.innerHTML === "0") {
            clearInterval(start)
            if (theWord.innerHTML.toLowerCase() === Input.value.toLowerCase()) {
                Input.value = ""
                score.innerHTML++
                if (words.length > 0 ) {
                    genWords()
                } else {
                theWord.remove()
                Input.remove()
                upComing.remove()
                let span = document.createElement("span")
                span.className = 'good'
                finishimg.className = 'show'
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