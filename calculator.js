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
let chain=false;

numberButtons.forEach((button)=>{
    button.addEventListener("click",(event)=>{
        if (display.textContent=="0" || chain) {display.textContent=""}
        chain=false;
        display.textContent += button.textContent;
        displayValue=+display.textContent;
        target=event.target
    })
})

const operatorButtons=document.querySelectorAll(".operators button")
let num1;
let operator;
let target;

operatorButtons.forEach((button)=>{
    button.addEventListener("click",(event)=>{
        if (target.textContent=="x" || target.textContent=="/" || target.textContent=="+" || target.textContent=="-"){return};
        if (num1){
            num2=displayValue;
            if (Number.isInteger(operate(operator,num1,num2))===false){
                display.textContent=operate(operator,num1,num2).toFixed(2);
            } else{
                display.textContent=operate(operator,num1,num2);
            };
            displayValue=+display.textContent;
            num1=displayValue; 
            operator=button.textContent;   
            chain=true;
            target=event.target;
        } else {
            num1=displayValue;
            display.textContent="";
            displayValue=+display.textContent;
            operator=button.textContent;
        };
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
    num1=undefined;
})

const clearButton=document.querySelector(".clear");
clearButton.addEventListener("click",()=>{
    num1="";
    num2="";
    displayValue="";
    display.textContent="0";
    operator="";
})