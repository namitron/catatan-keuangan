const form = document.getElementById('form');
const transactionTable = document.getElementById('transaction-table');
const incomeTotalDisplay = document.getElementById('income-total');
const expenseTotalDisplay = document.getElementById('expense-total');
const balanceDisplay = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Display existing transactions on load
transactions.forEach(displayTransaction);
updateSummary();

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const transaction = {
        description,
        amount,
        type
    };

    transactions.push(transaction);
    displayTransaction(transaction);
    updateSummary();
    updateLocalStorage();

    form.reset();
});

function displayTransaction(transaction) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.description}</td>
        <td>Rp ${transaction.amount}</td>
        <td>${transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</td>
        <td><button onclick="removeTransaction(${transactions.indexOf(transaction)})">Hapus</button></td>
    `;
    transactionTable.appendChild(row);
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    transactionTable.innerHTML = '';
    transactions.forEach(displayTransaction);
    updateSummary();
    updateLocalStorage();
}

function updateSummary() {
    const incomeTotal = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const expenseTotal = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const balance = incomeTotal - expenseTotal;

    incomeTotalDisplay.textContent = `Rp ${incomeTotal}`;
    expenseTotalDisplay.textContent = `Rp ${expenseTotal}`;
    balanceDisplay.textContent = `Rp ${balance}`;
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
