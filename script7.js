let timerEl = document.getElementById("timer");
let quote = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let submitbnt = document.getElementById("submitBtn");
let resetbtn = document.getElementById("resetBtn");
let textareaEl = document.getElementById("quoteInput");
let spinnerEl = document.getElementById("spinner");
let required = document.getElementById("requiredMsg");
let count = 0;
let given = "";
let intervelid = null;

textareaEl.addEventListener('blur',function(e){
    if(e.target.value === ""){
        required.textContent = "Required*"
        required.style.color = 'red'
    }
    else{
        required.textContent = "";
    }
})
function start() {
    count = 0;
    intervelid = setInterval(function() {
        count += 1;
        timerEl.textContent = count;

    }, 1000);

}
start();

function displayQuote(data) {
    spinnerEl.classList.add("d-none");
    quote.textContent = data.content;
    given = data.content;
}

function quoteGennerator() {
    let options = {
        method: "GET"
    };

    let url = "https://apis.ccbp.in/random-quote";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            displayQuote(data);
        });
    spinnerEl.classList.remove("d-none");
}
quoteGennerator();

function regenerate() {
    clearInterval(intervelid);
    start();
    quoteGennerator();
    resultEl.textContent = "";
    textareaEl.value = "";

}

resetbtn.addEventListener("click", regenerate);

submitbnt.onclick = function() {
    let userinput = textareaEl.value;
    
    if (userinput === given) {

        resultEl.textContent = "You typed in " + (timerEl.textContent) + " seconds";
      
        resultEl.classList.add('correctAns')
        clearTimeout(intervelid);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
        resultEl.classList.add('wrongAns');
    }
};