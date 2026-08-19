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

function setLanguage(lang) {
    // 1. Simpan pilihan bahasa ke localStorage
    localStorage.setItem('selectedLanguage', lang);

    // 2. Ambil semua elemen yang memiliki atribut data-en dan data-id
    const elements = document.querySelectorAll('[data-en][data-id]');

    elements.forEach(el => {
        if (lang === 'id') {
            el.textContent = el.getAttribute('data-id');
        } else {
            el.textContent = el.getAttribute('data-en');
        }
    });

    // 3. Update status tombol aktif (EN / ID)
    const btnEn = document.getElementById('btn-en');
    const btnId = document.getElementById('btn-id');

    if (btnEn && btnId) {
        if (lang === 'id') {
            btnId.classList.add('bg-primary-container', 'text-white');
            btnId.classList.remove('text-on-surface-variant');
            btnEn.classList.remove('bg-primary-container', 'text-white');
            btnEn.classList.add('text-on-surface-variant');
        } else {
            btnEn.classList.add('bg-primary-container', 'text-white');
            btnEn.classList.remove('text-on-surface-variant');
            btnId.classList.remove('bg-primary-container', 'text-white');
            btnId.classList.add('text-on-surface-variant');
        }
    }
}

// 4. Jalankan otomatis saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);
});