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
    if (num2===0){return "Error"}
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

const operatorButtons=document.querySelectorAll(".operators button")
let num1;
let operator;

operatorButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        num1=displayValue;
        display.textContent="";
        displayValue=+display.textContent;
        operator=button.textContent;
    })
})

const equalButton=document.querySelector(".equal");
let num2;
equalButton.addEventListener("click",()=>{
    if (!num1){return};
    num2=displayValue;
    if (Number.isInteger(operate(operator,num1,num2))===false){
        display.textContent=operate(operator,num1,num2).toFixed(2);
    } else{
        display.textContent=operate(operator,num1,num2);
    };
    displayValue=+display.textContent;
    num1=0;
})

const clearButton=document.querySelector(".clear");
clearButton.addEventListener("click",()=>{
    num1="";
    num2="";
    displayValue="";
    display.textContent="";
    operator="";
})