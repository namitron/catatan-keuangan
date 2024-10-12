// Add new transaction
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // Input validation
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Silakan masukkan deskripsi dan jumlah yang valid.');
        return;
    }

    const transaction = {
        description,
        amount,
        type
    };

    // Log the transaction before pushing to Firebase
    console.log('Transaksi yang akan ditambahkan:', transaction);

    // Push transaction to Firebase
    push(ref(database, 'transactions'), transaction)
        .then(() => {
            console.log('Transaksi berhasil ditambahkan');
            form.reset(); // Reset form setelah berhasil
        })
        .catch((error) => {
            console.error('Error menambahkan transaksi:', error);
        });
});
