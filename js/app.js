// Fungsi untuk meload file HTML eksternal ke dalam elemen placeholder
// targetId: ID elemen di index.html (tanpa #)
// fileName: Jalur ke file HTML komponen
async function loadComponent(targetId, fileName) {
    const placeholder = document.getElementById(targetId);
    
    if (!placeholder) {
        console.error(`Placeholder dengan ID "${targetId}" tidak ditemukan.`);
        return;
    }

    try {
        // 1. Ambil file HTML
        const response = await fetch(fileName);
        
        if (!response.ok) {
            throw new Error(`Gagal mengambil file: ${fileName} (Status: ${response.status})`);
        }

        // 2. Ubah response menjadi text
        const htmlContent = await response.text();

        // 3. Masukkan content ke dalam placeholder
        placeholder.innerHTML = htmlContent;

    } catch (error) {
        placeholder.innerHTML = `<p style="color:red; text-align:center;">Gagal memuat komponen: ${targetId}</p>`;
        console.error(error);
    }
}

// Jalankan loader setelah DOM utama selesai dimuat
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('footer-placeholder', 'view/themes/footer.html')
    ]);

    // Jalankan ulang observer animasi scroll setelah footer selesai di-load
    if (window.initializeScrollAnimations) {
        window.initializeScrollAnimations();
    }
});