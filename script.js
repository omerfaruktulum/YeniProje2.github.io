
/* icon 0 dan oluşturma  start   */
document.querySelectorAll(".HomeScreenIcon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.querySelectorAll("svg path").forEach((path) => {
        path.style.transition = "none"; // Anlık olarak animasyonu sıfırla
        path.style.strokeDashoffset = "200"; // Baştan başlatmak için geri sıfırla
  
        setTimeout(() => {
          path.style.transition = "stroke-dashoffset 1s ease-in-out";
          path.style.strokeDashoffset = "0"; // Yeniden çizilmeye başlasın
        }, 10); // Küçük bir gecikme ekleyerek sıfırlama işleminin algılanmasını sağla
      });
    });
  });
  
  
  // Define product images
  const products = {
    Product1: {
      image1: "assets/product-01-05.jpg",
      image2: "assets/product-01-1-1.jpg",
    },
    Product2: {
      image1: "assets/product-02-3.jpg",
      image2: "assets/product-02-1-1.jpg",
    },
    Product3: {
      image1: "assets/product-03-4.jpg",
      image2: "assets/product-03-1-1.jpg",
    },
    Product4: {
      image1: "assets/product-06-3.jpg",
      image2: "assets/product-06-1-1.jpg",
    },
    Product5: {
      image1: "assets/product-07-04-2.jpg",
      image2: "assets/product-07-1-1.jpg",
    },
    Product6: {
      image1: "assets/product-08-04.jpg",
      image2: "assets/product-08-1-1.jpg",
    },
    Product7: {
      image1: "assets/product-12-3.jpg",
      image2: "assets/product-12-1-1.jpg",
    },
    Product8: {
      image1: "assets/product-17-1-1.jpg",
      image2: "assets/product-17-3.jpg",
    },
    Product9: {
      image1: "assets/product-14-3.jpg",
      image2: "assets/product-14-1-1.jpg",
    },
    Product10: {
      image1: "assets/favProducts/product-11-3.jpg",
      image2: "assets/product-11-1-1.jpg",
    },
    Product11: {
      image1: "assets/favProducts/product-13-4.jpg",
      image2: "assets/product-13-1-1.jpg",
    },
    Product12: {
      image1: "assets/favProducts/product-10-3.jpg",
      image2: "assets/favProducts/product-10-3.jpg",
    },
  
  
    
    
  
  };
  
  /* header ın kayması için   */
  
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  
  window.addEventListener("scroll", function () {
      let currentScroll = window.pageYOffset;
  
      if (currentScroll > lastScrollTop) {
          // Aşağı kaydırırken header gizle
          header.style.top = "-100px"; 
      } else {
          // Yukarı kaydırırken header geri gelsin
          header.style.top = "0";
      }
  
      lastScrollTop = currentScroll;
  });
  
  
  
  // Ürün slider'ı için tamamen yeni ve basit bir yaklaşım
  function initProductSlider() {
    const productContainers = document.querySelectorAll(".productContainer");
    const productDots = document.querySelectorAll(".product-dot");
    const totalProducts = productContainers.length;
  
    // Varsayılan değerler
    let itemsPerPage = 4;
    let currentPage = 0;
    let totalPages = 0;
  
    // Ekran boyutuna göre sayfa başına ürün sayısını belirle
    function calculateItemsPerPage() {
      const width = window.innerWidth;
      console.log("Mevcut ekran genişliği: " + width + "px");
  
      if (width <= 576) {
        console.log("Mobil görünüm: 1 ürün gösteriliyor");
        return 1;
      } else if (width <= 990) {
        console.log("Tablet görünüm: 2 ürün gösteriliyor");
        return 2;
      } else if (width <= 1200) {
        console.log("Küçük masaüstü görünüm: 3 ürün gösteriliyor");
        return 3;
      } else {
        console.log("Masaüstü görünüm: 4 ürün gösteriliyor");
        return 4;
      }
    }
  
    // Sayfayı hazırla
    function setupPage() {
      // Önce tüm ürünleri gizle
      productContainers.forEach((container) => {
        container.style.display = "none";
      });
  
      // Ekran boyutuna göre ürün sayısını belirle
      itemsPerPage = calculateItemsPerPage();
  
      // Toplam sayfa sayısını hesapla
      totalPages = Math.ceil(totalProducts / itemsPerPage);
      console.log("Toplam sayfa sayısı: " + totalPages);
  
      // Dot'ların görünürlüğünü ayarla
      productDots.forEach((dot, index) => {
        if (index < totalPages) {
          dot.style.display = "inline-block";
        } else {
          dot.style.display = "none";
        }
      });
  
      // Aktif sayfanın geçerli olduğundan emin ol
      if (currentPage >= totalPages) {
        currentPage = 0;
      }
    }
  
    // Belirli bir sayfayı göster
    function showPage(pageIndex) {
      // Tüm ürünleri gizle
      productContainers.forEach((container) => {
        container.style.display = "none";
      });
  
      // Sayfa indeksi geçerli mi kontrol et
      if (pageIndex >= totalPages) {
        pageIndex = 0;
      }
  
      // Sayfa indeksini güncelle
      currentPage = pageIndex;
  
      // Tüm dot'ları pasif yap
      productDots.forEach((dot) => {
        dot.classList.remove("active");
      });
  
      // Aktif dot'u işaretle
      if (productDots[pageIndex]) {
        productDots[pageIndex].classList.add("active");
      }
  
      // Sayfa için başlangıç ve bitiş indekslerini hesapla
      const startIndex = pageIndex * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);
  
      console.log("Gösterilen sayfa: " + pageIndex);
      console.log("Ürün aralığı: " + startIndex + " - " + (endIndex - 1));
      console.log("Görüntülenecek ürün sayısı: " + (endIndex - startIndex));
  
      // İlgili ürünleri göster
      for (let i = startIndex; i < endIndex; i++) {
        if (productContainers[i]) {
          productContainers[i].style.display = "flex";
        }
      }
    }
  
    // Dot'lara tıklama olayını ekle
    productDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        console.log("Dot " + index + " tıklandı");
        setupPage(); // Sayfayı hazırla
        showPage(index); // Tıklanan sayfayı göster
      });
    });
  
    // Pencere boyutu değiştiğinde
    window.addEventListener("resize", () => {
      console.log("Pencere boyutu değişti");
      setupPage(); // Sayfayı hazırla
      showPage(currentPage); // Mevcut sayfayı göster
    });
  
    // İlk yükleme
    setupPage(); // Sayfayı hazırla
    showPage(0); // İlk sayfayı göster
  }
  
  // Hamburger menü işlevselliği
  function initHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const closeButton = document.querySelector(".mobile-menu-close");
  
    function toggleMenu() {
      mobileMenu.classList.toggle("active");
      menuOverlay.classList.toggle("active");
    }
  
    hamburger.addEventListener("click", toggleMenu);
    closeButton.addEventListener("click", toggleMenu);
    menuOverlay.addEventListener("click", toggleMenu);
  }
  
  // Sayfa yüklendiğinde çalıştır
  document.addEventListener("DOMContentLoaded", () => {
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
  
    // Sayfa yüklendiğinde ilk slaytı başlat
    showSlide(currentSlide);
  
    // Ürün slider'ını başlat
    initProductSlider();
  
    // Hamburger menüyü başlat
    initHamburgerMenu();
  
    // Icon animasyonlarını başlat
    document.querySelectorAll(".HomeScreenIcon").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        icon.querySelectorAll("svg path").forEach((path) => {
          path.style.transition = "none"; // Anlık olarak animasyonu sıfırla
          path.style.strokeDashoffset = "200"; // Baştan başlatmak için geri sıfırla
  
          setTimeout(() => {
            path.style.transition = "stroke-dashoffset 1s ease-in-out";
            path.style.strokeDashoffset = "0"; // Yeniden çizilmeye başlasın
          }, 10); // Küçük bir gecikme ekleyerek sıfırlama işleminin algılanmasını sağla
        });
      });
    });
  });
  