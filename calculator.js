const numberButtons=document.querySelectorAll(".numbers");
const display=document.querySelector(".display");
const tracker=document.querySelector(".operations-tracker");
let displayValue;

// Adding keyboard support.
const numberKeys=["0","1","2","3","4","5","6","7","8","9","."];
const operatorKeys=["+","-","/","x","^"];
const restOfKeys=["c","Enter","Backspace","%"];

let selectedButton;

window.addEventListener("keydown",(event)=>{
    if (numberKeys.includes(event.key)==false && operatorKeys.includes(event.key)==false && restOfKeys.includes(event.key)==false) return;
    if (event.key=="c"){
        return clear();
    } else if (event.key=="Backspace") {
        return removeLastChar();
    } else if (event.key=="%") {
        return calculatePercentage();
    };
    if (event.key=="Enter"){
        selectedButton=document.querySelector(`button[data-key="="]`);
    } else {
        selectedButton=document.querySelector(`button[data-key="${event.key}"]`);
    };
    if (numberKeys.includes(selectedButton.textContent)) {
        return inputNumber();
    } else if (operatorKeys.includes(selectedButton.textContent)) {
        return chooseOperation();
    } else if (selectedButton.textContent=="="){
        return getResult();
    };
})

// Code associated to buttons containing numbers and the comma. They allow input of numeric values.
numberButtons.forEach((button)=>{
    button.addEventListener("click", (event)=>{
        selectedButton=event.target;
        return inputNumber ();
    });
})

function inputNumber(){
    if (previousSelectedButton!=undefined && previousSelectedButton.textContent=="=") {clear()};
    if (display.textContent=="0" || chainOperators) {display.textContent=""};
    if (display.textContent.includes(".") && selectedButton.textContent===".") {return};
    chainOperators=false;
    display.textContent += selectedButton.textContent;
    displayValue=+display.textContent;
    previousSelectedButton=selectedButton;
}

//Code associated to buttons containing operators signs.
const operatorButtons=document.querySelectorAll(".operators button")
let num1;
let operator;
let previousSelectedButton;
let chainOperators=false;

function chooseOperation (){
    //This condition was added to prevent the code from breaking if the user tries to click an operator button after one had already been clicked.
    if (previousSelectedButton.textContent=="x" || previousSelectedButton.textContent=="/" || previousSelectedButton.textContent=="+" || previousSelectedButton.textContent=="-"){return};

    // Code to run for chained math operations. By chained operations I mean the act of pressing an operator button and inputting a number more than once in a row, without using the equal button in between to get the results.
    if (num1){
        num2=displayValue;
        fixResult();
        displayValue=+display.textContent;
        num1=displayValue; 
        tracker.textContent=num1;
        operator=selectedButton.textContent; 
        tracker.textContent+=operator;  
        chainOperators=true;
        previousSelectedButton=selectedButton;
        display.textContent="";
    
    // Code to run for the first time or after equal button has been pressed.
    } else {
        num1=displayValue;
        tracker.textContent=num1;
        display.textContent="";
        displayValue=+display.textContent;
        operator=selectedButton.textContent;
        tracker.textContent+=operator;
        previousSelectedButton=selectedButton;
    }
};

operatorButtons.forEach((button)=>{
    button.addEventListener("click",(event)=>{
      selectedButton=event.target;
      return chooseOperation();
    })
});

// Code associated to equal button.
const equalButton=document.querySelector(".equal");
let num2;

function getResult(){
    //This condition and num1 to undefined were added to prevent the function from running more than once in a row, in case the user clicks the equal button multiple times, as it was breaking the code. 
    if (!num1){return};
    num2=displayValue;
    tracker.textContent+=num2;
    fixResult();
    displayValue=+display.textContent;
    num1=undefined;
    previousSelectedButton=selectedButton;
};

equalButton.addEventListener("click",(event)=>{
    selectedButton=event.target;
    return getResult();
});

// Code associated with clear button.
const clearButton=document.querySelector(".clear");
clearButton.addEventListener("click",clear)

function clear(){
    num1="";
    num2="";
    displayValue="";
    display.textContent="0";
    tracker.textContent="";
    operator="";
}

//Code associated with backSpaceButton.
const backSpaceButton=document.querySelector(".backspace");
backSpaceButton.addEventListener("click",removeLastChar)

function removeLastChar(){
    display.textContent=display.textContent.slice(0,display.textContent.length-1);
    displayValue=+display.textContent;
}

// Code associated with change sign button.
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

// Code associated with percentageButton.
const percentageButton=document.querySelector(".percentage");
percentageButton.addEventListener("click", calculatePercentage)

function calculatePercentage(){
    if (display.textContent.includes("%")) {return};
    if (operator=="x" || operator=="/"){
        displayValue=(+display.textContent)/100;
    } else if (operator=="+" || operator=="-"){
        displayValue=((+display.textContent)/100)*num1;
    }
    display.textContent=display.textContent+"%";
}


//Math-operation functions;
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