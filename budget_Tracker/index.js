const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter text and amount.");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValue();
        text.value = "";
        amount.value = "";
    }
}

function generateID(){
    return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">x</button>
    `;

    // Add event listener for the delete button
    item.querySelector(".delete-btn").addEventListener("click", () => {
        deleteTransaction(transaction.id);
    });

    list.appendChild(item);
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    Init(); // Reinitialize the list and balance after deletion
}

function updateValue(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`;
}

function Init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValue();
}

Init();

form.addEventListener("submit", addTransaction);
