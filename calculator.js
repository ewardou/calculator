function add(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    return num1/num2
}

function operate(operator,num1,num2){
    switch (operator){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "/":
            return divide(num1,num2);
        case "x":
            return multiply(num1,num2);
    }
}
const numberButtons=document.querySelectorAll(".numbers button");
const display=document.querySelector(".display");
let displayValue

numberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        display.textContent += button.textContent;
        displayValue=+display.textContent;
    })
})