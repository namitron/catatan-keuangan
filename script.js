// Inisialisasi Firebase Database
const database = firebase.database();

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description === '' || isNaN(amount)) {
        alert('Silakan masukkan deskripsi dan jumlah yang valid.');
        return;
    }

    const transaction = {
        description,
        amount,
        type
    };

    // Simpan transaksi di Firebase
    database.ref('transactions').push(transaction);

    displayTransaction(transaction);
    updateSummary();

    form.reset();
});

// Ambil data transaksi dari Firebase
database.ref('transactions').on('value', function(snapshot) {
    const data = snapshot.val();
    transactions = [];

    // Hapus isi tabel sebelum menampilkan ulang
    transactionTable.innerHTML = '';

    for (let key in data) {
        transactions.push(data[key]);
        displayTransaction(data[key]);
    }
    
    updateSummary();
});

function displayTransaction(transaction) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.description}</td>
        <td>Rp ${transaction.amount}</td>
        <td>${transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</td>
    `;
    transactionTable.appendChild(row);
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
