const form = document.getElementById('form');
const transactionList = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');

let transactions = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const transaction = {
        description,
        amount
    };

    transactions.push(transaction);
    displayTransaction(transaction);
    updateBalance();

    form.reset();
});

function displayTransaction(transaction) {
    const listItem = document.createElement('li');
    listItem.textContent = `${transaction.description}: Rp ${transaction.amount}`;
    transactionList.appendChild(listItem);
}

function updateBalance() {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    balanceDisplay.textContent = `Rp ${total}`;
}
