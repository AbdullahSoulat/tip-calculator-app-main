// Outputs
const tipPerPerson = document.getElementById('tipPerPerson');
const totalPerPerson = document.getElementById('totalPerPerson');

// Inputs
const bill = document.getElementById('bill');
const numOfPeople = document.getElementById('numOfPeople');
const customTip = document.getElementById('customTip');

const inputElements = document.querySelectorAll('input');
const givenTipAmounts = document.querySelectorAll('[id = "tipAmount"]');

const errorMsg = document.getElementById('errorMsg');
let currentGivenTip = document.getElementById('tipAmount');
let previousGivenTip = document.getElementById('tipAmount');
let selectedTip = '';
let customTipSelected = true;

// Calcuting tip per person and total per person
function calculateTotal(bill, people, tip) {
    const total = ((Number(bill) * Number(tip) / 100) + Number(bill)) / Number(people);
    const thisTip = (Number(bill) * Number(tip) / 100) / Number(people);
    tipPerPerson.innerHTML = "$" + roundToTwo(thisTip);
    totalPerPerson.innerHTML = "$" + roundToTwo(total);
}

inputElements.forEach((element) => {
    element.addEventListener('input', (e) => {
        // Only display output if all inputs have been made
        if (bill.value != "" && numOfPeople.value != "" && (customTip.value != "" || selectedTip != "")) {
            if (selectedTip != "") {
                calculateTotal(bill.value, numOfPeople.value, selectedTip);
            } else {
                calculateTotal(bill.value, numOfPeople.value, customTip.value);
            } 
        }
    })
})

givenTipAmounts.forEach((tip) => {
    tip.addEventListener('click', (e) => {
        customTipSelected = false;

        previousGivenTip = currentGivenTip;
        previousGivenTip.style.backgroundColor = 'hsl(183, 100%, 15%)';
        previousGivenTip.style.color = 'white';

        currentGivenTip = e.target;
        currentGivenTip.style.backgroundColor = 'hsl(172, 67%, 45%)';
        currentGivenTip.style.color = 'hsl(183, 100%, 15%)';

        selectedTip = currentGivenTip.innerHTML.slice(0, -1);
        customTip.value = "";
    })
})

customTip.addEventListener('click', (e) => {
    customTipSelected = true;
    selectedTip = "";
    currentGivenTip.style.backgroundColor = 'hsl(183, 100%, 15%)';
    currentGivenTip.style.color = 'white';
})

// Displaying if number of people is zero
function checkZeroPeople(people) {
    if (people === "0") {
        errorMsg.classList.remove('hidden');
        numOfPeople.style.borderColor = 'red';
    } else {
        errorMsg.classList.add("hidden");
        if (numOfPeople === document.activeElement) {  
            numOfPeople.style.borderColor = "transparent";
        } else {
            numOfPeople.style.borderColor = "#58a59b";
        }
    }
}

numOfPeople.addEventListener('input', (e) => {
    checkZeroPeople(numOfPeople.value);
})

function roundToTwo(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

function resetCalculator() {
    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";

    inputElements.forEach((input) => {
        input.value = "";
    })
}
