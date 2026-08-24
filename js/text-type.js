class TextType {
  constructor(element, options = {}) {
    this.element = element;
    this.texts = options.texts || [];
    this.typingSpeed = options.typingSpeed || 75;
    this.deletingSpeed = options.deletingSpeed || 50;
    this.pauseDuration = options.pauseDuration || 1500;
    this.loop = options.loop !== undefined ? options.loop : true;

    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    if (this.texts.length > 0) {
      this.type();
    }
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      if (!this.loop && this.textIndex === 0) return;
      delay = 500;
    }

    setTimeout(() => this.type(), delay);
  }
}

// Inisialisasi setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('typewriter');
  if (target) {
    new TextType(target, {
      texts: [
        "Apple Developer",
        "Fullstack Web Developer"
      ],
      typingSpeed: 75,
      deletingSpeed: 50,
      pauseDuration: 1500,
      loop: true
    });
  }
});