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

function power(num1,num2){
    return num1**num2;
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
        case "^":
            return power(num1,num2);
    }
}

function fixResult(){
    if (operator==="/" && num2===0){
        display.textContent="ERROR";
    } else if (Number.isInteger(operate(operator,num1,num2))===false){
        display.textContent=operate(operator,num1,num2).toFixed(2);
    } else{
        display.textContent=operate(operator,num1,num2);
    };
}

const numberButtons=document.querySelectorAll(".numbers button");
const display=document.querySelector(".display");
const tracker=document.querySelector(".operations-tracker");
let displayValue;
let chain=false;

numberButtons.forEach((button)=>{
    button.addEventListener("click",(event)=>{
        if (display.textContent=="0" || chain) {display.textContent=""};
        if (display.textContent.includes(".") && event.target.textContent===".") {return};
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
            fixResult();
            displayValue=+display.textContent;
            num1=displayValue; 
            tracker.textContent=num1;
            operator=button.textContent; 
            tracker.textContent+=operator;  
            chain=true;
            target=event.target;
            display.textContent="";
        } else {
            num1=displayValue;
            if (target.textContent!="="){tracker.textContent+=num1} else if(target.textContent=="="){tracker.textContent=num1};
            display.textContent="";
            displayValue=+display.textContent;
            operator=button.textContent;
            tracker.textContent+=operator;
        };
    })
})

const equalButton=document.querySelector(".equal");
let num2;
equalButton.addEventListener("click",(event)=>{
    if (!num1){return};
    num2=displayValue;
    tracker.textContent+=num2;
    fixResult();
    displayValue=+display.textContent;
    num1=undefined;
    target=event.target;
})

const clearButton=document.querySelector(".clear");
clearButton.addEventListener("click",()=>{
    num1="";
    num2="";
    displayValue="";
    display.textContent="0";
    tracker.textContent="";
    operator="";
})

const backSpaceButton=document.querySelector(".backspace");
backSpaceButton.addEventListener("click",()=>{
    display.textContent=display.textContent.slice(0,display.textContent.length-1);
    displayValue=+display.textContent;
})

const changeSignButton=document.querySelector(".change-sign");
changeSignButton.addEventListener("click",()=>{
    if (!display.textContent.includes("-")){
        display.textContent="-"+display.textContent;
        displayValue=+display.textContent;
    } else if (display.textContent.includes("-")) {
        display.textContent=display.textContent.replace("-","");
        displayValue=+display.textContent;
    }
})

const percentageButton=document.querySelector(".percentage");
percentageButton.addEventListener("click",()=>{
    if (display.textContent.includes("%")) {return};
    if (operator=="x" || operator=="/"){
        displayValue=(+display.textContent)/100;
    } else if (operator=="+" || operator=="-"){
        displayValue=((+display.textContent)/100)*num1;
    }
    display.textContent=display.textContent+"%";
    
})