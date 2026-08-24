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

class ClickSpark {
  constructor(options = {}) {
    this.sparkColor = options.sparkColor || '#3b82f6';
    this.sparkSize = options.sparkSize || 10;
    this.sparkRadius = options.sparkRadius || 15;
    this.sparkCount = options.sparkCount || 8;
    this.duration = options.duration || 400;

    this.sparks = [];
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9999'
    });

    document.body.appendChild(this.canvas);
    this.resize();

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('click', (e) => this.handleClick(e));

    requestAnimationFrame((t) => this.draw(t));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  easeOut(t) {
    return t * (2 - t);
  }

  handleClick(e) {
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    for (let i = 0; i < this.sparkCount; i++) {
      this.sparks.push({
        x,
        y,
        angle: (2 * Math.PI * i) / this.sparkCount,
        startTime: now
      });
    }
  }

  draw(timestamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.sparks = this.sparks.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= this.duration) return false;

      const progress = elapsed / this.duration;
      const eased = this.easeOut(progress);

      const distance = eased * this.sparkRadius;
      const lineLength = this.sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      this.ctx.strokeStyle = this.sparkColor;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();

      return true;
    });

    requestAnimationFrame((t) => this.draw(t));
  }
}

// Inisialisasi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  new ClickSpark({
    sparkColor: '#007AFF', // Sesuaikan warna dengan tema Anda
    sparkSize: 12,
    sparkRadius: 25,
    sparkCount: 10,
    duration: 400
  });
});