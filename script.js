console.log("js çalıştıııııı")

// const slides = document.querySelectorAll('.slide');
// const dots = document.querySelectorAll('.dot');
// let currentIndex = 0;

// // Function to change slide
// function goToSlide(index) {
//   const slider = document.querySelector('.slider');
//   // Slaytı kaydırma işlemi
//   slider.style.transform = `translateX(-${index * 100}%)`;

//   // Aktif noktayı güncelle
//   dots.forEach(dot => dot.classList.remove('active'));
//   dots[index].classList.add('active');
// }

// // Function to handle dot clicks
// dots.forEach(dot => {
//   dot.addEventListener('click', () => {
//     const index = parseInt(dot.getAttribute('data-slide'));
//     currentIndex = index;
//     goToSlide(index);
//   });
// });

// // Initialize the first slide
// goToSlide(currentIndex);


/* icon 0 dan oluşturma  start   */
document.querySelectorAll('.HomeScreenIcon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.querySelectorAll('svg path').forEach(path => {
            path.style.transition = "none";  // Anlık olarak animasyonu sıfırla
            path.style.strokeDashoffset = "200"; // Baştan başlatmak için geri sıfırla

            setTimeout(() => {
                path.style.transition = "stroke-dashoffset 1s ease-in-out";
                path.style.strokeDashoffset = "0"; // Yeniden çizilmeye başlasın
            }, 10); // Küçük bir gecikme ekleyerek sıfırlama işleminin algılanmasını sağla
        });
    });
});


console.log("js çalıştıııııı")


// Slider işlevselliği
// Slider işlevselliği
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;

  // Aktif slaytı ve noktayı güncelle
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    slide.style.transition = "transform 1s ease, opacity 1s ease"; // Yavaş geçiş
    slide.style.transform = "scale(1.2)"; // Slaytlar küçülecek
    slide.querySelectorAll(".animate-text").forEach((el) => {
      el.style.animation = "none";
      el.offsetHeight; // Reflow
      el.style.animation = null;
    });
  });
  dots.forEach((dot) => dot.classList.remove("active"));

  // Aktif olan slayt
  slides[currentSlide].classList.add("active");
  slides[currentSlide].style.transform = "scale(1)"; // Yeni slayt büyüyecek
  dots[currentSlide].classList.add("active");

  // Animasyonlu içerikler için zamanlamayı ayarla
  setTimeout(() => {
    const activeSlide = slides[currentSlide];
    activeSlide.querySelectorAll(".animate-text").forEach((el) => {
      el.style.animation = "fadeInUp 1s ease forwards";
    });
  }, 500); // Slayt geçişinin ardından içerik animasyonu
}

// Nokta tıklama işlevselliği
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Otomatik slider
setInterval(() => {
  currentSlide++;
  showSlide(currentSlide);
}, 7000); // Geçiş süresi 7 saniye

// Sayfa yükleme animasyonları
document.addEventListener("DOMContentLoaded", () => {
  // Sayfa yüklendiğinde ilk slaytı başlat
  showSlide(currentSlide);
});
