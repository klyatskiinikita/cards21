const button = document.getElementById("func-button");
const counter = document.getElementById("counter");
const result = document.getElementById("result");
const nicks = document.getElementsByName("nickname");
const values = document.getElementsByName("value");
const cards = document.getElementsByName("card");
const cardsAndNominals = [
    [
        [
            "img/6C.png", 
            "img/6D.png",
            "img/6H.png",
            "img/6S.png"
        ], 6
    ],
    [
        [
            "img/7C.png",
            "img/7D.png",
            "img/7H.png",
            "img/7S.png"
        ], 7
    ],
    [
        [
            "img/8C.png",
            "img/8D.png",
            "img/8H.png",
            "img/8S.png"
        ], 8
    ],
    [
        [
            "img/9C.png",
            "img/9D.png",
            "img/9H.png",
            "img/9S.png"
        ], 9
    ],
    [
        [
            "img/10C.png",
            "img/10D.png",
            "img/10H.png",
            "img/10S.png"
        ], 10
    ],
    [
        [
            "img/JC.png",
            "img/JD.png",
            "img/JH.png",
            "img/JS.png"
        ], 2
    ],
    [
        [
            "img/QC.png",
            "img/QD.png",
            "img/QH.png",
            "img/QS.png"
        ], 3
    ],
    [
        [
            "img/KC.png",
            "img/KD.png",
            "img/KH.png",
            "img/KS.png"
        ], 4
    ],
    [
        [
            "img/AC.png",
            "img/AD1.png",
            "img/AH.png",
            "img/AS.png"
        ], 11
    ],
];
button.addEventListener("click", start);
let count;
let nick;
let cArr;
while (nick == "" || nick == null) {
    nick = prompt("enter your name: ");
}
nicks[0].innerHTML = nick;

function start() {
    cArr = [...cardsAndNominals];
    count = 0;
    counter.innerHTML = "0/3";
    result.innerHTML = "";
    values.forEach(item => item.innerHTML = 0);
    cards.forEach(item => item.setAttribute("src", ""));
    button.innerHTML = "make a roll";
    button.setAttribute("class", button.getAttribute("class").replace("btn-primary", "btn-warning"));
    button.removeEventListener("click", start);
    button.addEventListener("click", roll);
}

function roll()  
{
    console.log(cArr);
    let playerCardIndex = Math.floor(Math.random() * cArr.length);
    let playerSuitIndex = Math.floor(Math.random() * cArr[playerCardIndex][0].length);
    console.log(playerCardIndex);
    console.log(playerSuitIndex);
    cards[0].setAttribute("src", cArr[playerCardIndex][0][playerSuitIndex]);
    values[0].innerHTML = Number(values[0].innerHTML) + cArr[playerCardIndex][1];
    let rivalCardIndex = Math.floor(Math.random() * cArr.length);
    let rivalSuitIndex = Math.floor(Math.random() * cArr[rivalCardIndex][0].length);
    console.log(rivalCardIndex);
    console.log(rivalSuitIndex);
    cards[1].setAttribute("src", cArr[rivalCardIndex][0][rivalSuitIndex]);
    values[1].innerHTML = Number(values[1].innerHTML) + cArr[rivalCardIndex][1];
    cards.forEach(item => item.animate(
        [
            { transform: "scale(1) rotateY(0)" },
            { transform: "scale(1.5) rotateY(90deg)" },
            { transform: "scale(1) rotateY(180deg)" }
        ],
        {
            duration: 400,
            direction: "alternate-reverse"
        }
    ));
    count++;
    counter.innerHTML = count + "/3";
    if (count == 3) {
        if(values[0].innerHTML != values[1].innerHTML)
            result.innerHTML = "the winner is " + (Number(values[0].innerHTML) > Number(values[1].innerHTML) ? nicks[0].innerHTML : nicks[1].innerHTML);
        else result.innerHTML = "draw";
        button.innerHTML = "restart the game";
        button.setAttribute("class", button.getAttribute("class").replace("btn-warning", "btn-primary"));
        button.removeEventListener("click", roll);
        button.addEventListener("click", start);
    }
}