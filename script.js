document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;

    // Mendapatkan tanggal dan waktu saat ini
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTime = now.toLocaleDateString('id-ID', options);

    // Menghitung total harga
    const pricePerKg = 22000; // Harga per kg
    const totalPrice = pricePerKg * quantity;

    // Simpan pesanan ke Local Storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ name, quantity, dateTime, totalPrice });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Tampilkan notifikasi
    const notification = document.getElementById('notification');
    notification.textContent = `Pesanan berhasil! Nama: ${name}, Jumlah: ${quantity} kg, Total Harga: ${totalPrice} IDR, Tanggal: ${dateTime}`;
    notification.classList.remove('hidden');

    // Reset form
    this.reset();

    // Tampilkan daftar pesanan
    displayOrders();
});

// Fungsi untuk menampilkan daftar pesanan
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = ''; // Kosongkan daftar sebelum menampilkan

    orders.forEach((order, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nama: ${order.name}, Jumlah: ${order.quantity} kg, Total Harga: ${order.totalPrice} IDR, Tanggal: ${order.dateTime}`;

        // Membuat tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            deleteOrder(index);
        };

        listItem.appendChild(deleteButton);
        orderList.appendChild(listItem);
    });
}

// Fungsi untuk menghapus pesanan
function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1); // Menghapus pesanan berdasarkan index
    localStorage.setItem('orders', JSON.stringify(orders)); // Simpan kembali ke Local Storage
    displayOrders(); // Tampilkan daftar pesanan yang diperbarui
}

// Tampilkan daftar pesanan saat halaman dimuat
window.onload = displayOrders;