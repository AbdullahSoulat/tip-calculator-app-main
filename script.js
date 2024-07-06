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

// Calcuting tip per person and total per person
function calculateTotal(bill, people, tip) {
    console.log(numOfPeople.value);
    let total = ((Number(bill) * Number(tip) / 100) + Number(bill)) / Number(people);
    let thisTip = (Number(bill) * Number(tip) / 100) / Number(people);
    total = roundToTwo(total);
    thisTip = roundToTwo(thisTip);
    tipPerPerson.innerHTML = "$"+thisTip;
    totalPerPerson.innerHTML = "$"+total;
}

inputElements.forEach((element) => {
    element.addEventListener('input', (e) => {
        if (bill.value != "" && numOfPeople.value != "" && customTip.value != "") {
            calculateTotal(bill.value, numOfPeople.value, customTip.value);
        }
    })
})


givenTipAmounts.forEach((tip) => {
    tip.addEventListener('click', (e) => {
        e.target.style.backgroundColor = 'red';
    })
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