const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";
let result = 0;
let hasOp = false;

for(let key of keys) {
    const val = key.dataset.key;
    const keyClass = key.className;

    key.addEventListener('click', () => {
        console.log("input = " + input);
        console.log("result = " + result);
        console.log("val = " + val);
        console.log("hasOp = " + hasOp);
        
        switch(val) {
            case "clear":
                input = "";
                result = 0;
                hasOp = false;
                displayInput.innerHTML = input;
                displayOutput.innerHTML = "0";
                break;
            case "backspace":
                input = input.slice(0, -1);
                if(input.length == 0) {
                    hasOp = false;
                    displayInput.innerHTML = 0;
                } else {
                    displayInput.innerHTML = format(input);
                }
                break;
            case "=":
                evaluate();
                hasOp = false;
                break;
            case "negate":
                result = eval(input)*-1;
                hasOp = false;
                displayInput.innerHTML = input;
                displayOutput.innerHTML = result;
                input = result;
                break;
            case "percent":
                if(input.length != 0) {
                    result = input/100;
                    displayInput.innerHTML = result;
                    displayOutput.innerHTML = result;
                    input = result;    
                }
                break;
            default:
                if(keyClass.includes("operator") && hasOp) {
                    evaluate();
                } else if (keyClass.includes("operator")) {
                    hasOp = true;
                }
                if(!(val == "." && input.toString().slice(-1) == ".")) {
                    input += val;
                    displayInput.innerHTML = format(input);
                }
                break;
        }
    });
}

function format(input) {
    let string = input.split("");
    for(let i = 0; i < string.length; i++) {
        switch(string[i]) {
            case "*":
                string[i] = ` <span class="key operator">x</span> `
                break;
            case "/":
                string[i] = ` <span class="operator">÷</span> `
                break;
            case "+":
                string[i] = ` <span class="operator">+</span> `
                break;
            case "-":
                if(i != 0) {
                    string[i] = ` <span class="operator">-</span> `
                }
                break;
        }
    }
    return string.join("");
}

function evaluate() {
    result = eval(input);
    displayInput.innerHTML = format(input);
    displayOutput.innerHTML = result;
    input = result;
}