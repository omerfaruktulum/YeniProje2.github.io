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

// Mobile product navigation
function initMobileProductNavigation() {
    const products = document.querySelectorAll('.productContainer');
    const dots = document.querySelectorAll('.product-dot');
    let currentProductIndex = 0;

    function showProduct(index) {
        // Tüm ürünleri gizle
        products.forEach(product => {
            product.style.display = 'none';
        });

        // Aktif ürünü göster
        products[index].style.display = 'flex';

        // Aktif dot'u güncelle
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Dot'lara tıklama olayı ekle
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProductIndex = index;
            showProduct(currentProductIndex);
        });
    });

    // Mobil görünümde ürün navigasyonunu başlat
    function checkMobileView() {
        if (window.innerWidth <= 576) {
            showProduct(currentProductIndex);
        } else {
            // Desktop görünümde tüm ürünleri göster
            products.forEach(product => {
                product.style.display = 'flex';
            });
        }
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde kontrol et
    window.addEventListener('load', checkMobileView);
    window.addEventListener('resize', checkMobileView);
}

// Hamburger menü işlevselliği
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeButton = document.querySelector('.mobile-menu-close');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
}

// Fonksiyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    initMobileProductNavigation();
    initHamburgerMenu();
});

function initProductDots() {
    const productContainers = document.querySelectorAll('.productContainer');
    const productDots = document.querySelectorAll('.product-dot');
    const totalProducts = productContainers.length;
    
    let itemsPerPage = 4; // Varsayılan değer

    function updateItemsPerPage() {
        if (window.innerWidth <= 576) {
            itemsPerPage = 1;
        } else if (window.innerWidth <= 990) {
            itemsPerPage = 2;
        } else if (window.innerWidth <= 1200) {
            itemsPerPage = 3;
        } else {
            itemsPerPage = 4;
        }
    }

    function showProducts(dotIndex) {
        // Önce tüm ürünleri gizle
        productContainers.forEach(container => {
            container.style.display = 'none';
        });

        // Dot'ları güncelle
        productDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Seçili dot'u aktif yap
        productDots[dotIndex].classList.add('active');

        // İlgili ürünleri göster
        const startIndex = dotIndex * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);

        for (let i = startIndex; i < endIndex; i++) {
            if (productContainers[i]) {
                productContainers[i].style.display = 'flex';
            }
        }
    }

    // Dot'lara tıklama olayı ekle
    productDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showProducts(index);
        });
    });

    // Sayfa yüklendiğinde ve yeniden boyutlandığında
    window.addEventListener('resize', () => {
        updateItemsPerPage();
        showProducts(0); // İlk sayfayı göster
    });

    // Başlangıçta
    updateItemsPerPage();
    showProducts(0);
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    initProductDots();
});
