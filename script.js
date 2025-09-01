// Global variables
let currentSection = "home";
let studentsData = [];
let activitiesData = [];
let currentSlide = 0;
let slideInterval;
let activitySliders = {};
let modalSlide = 0;

// DOM elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeData();
  initializeSlider();
  initializeActivitySliders();
  updateActiveSection();
});

// Navigation functionality
function initializeNavigation() {
  // Hamburger menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("data-section");
      navigateToSection(sectionId);

      // Close mobile menu
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Navigate to specific section
function navigateToSection(sectionId) {
  // Remove active class from all sections
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
    currentSection = sectionId;
  }

  // Add active class to corresponding nav link
  const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  // Update page title
  updatePageTitle(sectionId);

  // Load section-specific data
  loadSectionData(sectionId);
}

// Update page title based on section
function updatePageTitle(sectionId) {
  const titles = {
    home: "Beranda - XI TKJ 1",
    schedule: "Jadwal Pelajaran - XI TKJ 1",
    students: "Data Siswa - XI TKJ 1",
    leadership: "Kepengurusan - XI TKJ 1",
    activities: "Aktivitas - XI TKJ 1",
  };

  document.title = titles[sectionId] || "Portofolio Kelas X TKJ 1";
}

// Inisialisasi data sample student data absensi
function initializeData() {
  // Sample data dari 37 siswa XI TKJ 1
  studentsData = [
    { name: "Abdul Aziz Rendy Pratama", gender: "L", phone: "081234567001" },
    {
      name: "Achmad Revi Febryan Tri Putra",
      gender: "L",
      phone: "081234567002",
    },
    {
      name: "Ahmad Hafidz Salman Alfarisi",
      gender: "L",
      phone: "081234567003",
    },
    { name: "Ahmat Teguh Pambudi", gender: "L", phone: "081234567004" },
    { name: "Akhmat Tukhin", gender: "L", phone: "081234567005" },
    { name: "Al-Abidatus Sholicha", gender: "P", phone: "081234567006" },
    { name: "Amalia Maqsudah", gender: "P", phone: "081234567007" },
    { name: "Andra Ibrahim Ma'ruf", gender: "L", phone: "081234567008" },
    {
      name: "Arindra Pradita Pratama Putra",
      gender: "P",
      phone: "081234567009",
    },
    { name: "Astri Lestari", gender: "L", phone: "081234567010" },
    { name: "Azril Cahya Syahputra", gender: "L", phone: "081234567011" },
    { name: "Devin Julio Pratama", gender: "L", phone: "081234567012" },
    { name: "Diga Nikaya Akbar", gender: "L", phone: "081234567013" },
    { name: "Evan Favian Akmal", gender: "L", phone: "081234567014" },
    { name: "Fathan Ghani", gender: "L", phone: "081234567015" },
    { name: "Galih Juliansyah", gender: "L", phone: "081234567016" },
    { name: "Hamdani Navis Choiri", gender: "L", phone: "081234567017" },
    { name: "M. Khotibul Umam", gender: "L", phone: "081234567018" },
    { name: "M. Nur Shochibul Affa", gender: "L", phone: "081234567019" },
    { name: "Martdhian Priyo Arbianto", gender: "L", phone: "081234567020" },
    { name: "Moch Revaliza Hibatullah", gender: "L", phone: "081234567021" },
    { name: "Muhammad Faiq Al-Fikri", gender: "L", phone: "081234567022" },
    { name: "Muhammad Akhdan Ramadhan", gender: "L", phone: "081234567023" },
    { name: "Muhammad Luthfi An-Naufal", gender: "L", phone: "081234567024" },
    { name: "Muhammad Raihan Arrasyiid", gender: "L", phone: "081234567025" },
    {
      name: "Muhammad Revanda Aditya Nugraha",
      gender: "L",
      phone: "081234567026",
    },
    { name: "Nailatul Fauziyah", gender: "P", phone: "081234567027" },
    {
      name: "Nayla Salasa Bila Ainur Rohma",
      gender: "P",
      phone: "081234567028",
    },
    { name: "Ponariyo Astama", gender: "L", phone: "081234567029" },
    { name: "Rangga Aditya Alfareza", gender: "L", phone: "081234567030" },
    { name: "Rifatus Aprilia Utari", gender: "P", phone: "081234567031" },
    { name: "Rohan Isagani", gender: "L", phone: "081515884665" },
    { name: "Safina Eka Wulandari", gender: "P", phone: "081234567033" },
    { name: "Setiawan Anwar", gender: "L", phone: "081234567034" },
    { name: "Umam Hidayatullah", gender: "L", phone: "081234567035" },
    { name: "Wildan Firdaus Midfia", gender: "L", phone: "081234567036" },
    { name: "Zerry Afrian Syah Firdaus", gender: "L", phone: "081234567037" },
  ];

  activitiesData = []; // This will be populated from HTML content

  // Update UI to show current state
  updateStudentsDisplay();
  updateActivitiesDisplay();
}

// Load section-specific data
function loadSectionData(sectionId) {
  switch (sectionId) {
    case "home":
      // Restart slider when returning to home
      if (slideInterval) clearInterval(slideInterval);
      startSlider();
      break;
    case "students":
      updateStudentsDisplay();
      break;
    case "activities":
      updateActivitiesDisplay();
      break;
    case "leadership":
      // Leadership data is static in HTML, but could be dynamic
      break;
    case "schedule":
      // Schedule data is static in HTML
      break;
  }
}

// Initialize slider functionality
function initializeSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (!slides.length) return;

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      updateSlider();
      resetSliderInterval();
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
      resetSliderInterval();
    });
  }

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
      resetSliderInterval();
    });
  });

  // Start auto-slide
  startSlider();
}

// Update slider display
function updateSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Start automatic slider
function startSlider() {
  slideInterval = setInterval(() => {
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }
  }, 4000); // Ganti slide setiap 4 detik
}

// Reset slider interval
function resetSliderInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    startSlider();
  }
}

// Activity slider functionality
function initializeActivitySliders() {
  // Initialize all activity sliders
  activitySliders.activity1 = 0;
  activitySliders.activity2 = 0;
}

function changeActivitySlide(activityId, direction, btn) {
  // Cari card yang benar berdasarkan tombol yang diklik
  let card = btn.closest(".activity-card");
  if (!card) return;
  const slider = card.querySelector(".activity-slider");
  const slides = slider.querySelectorAll(".activity-slide");
  const dots = card.querySelectorAll(".activity-dot");

  if (activitySliders[activityId] === undefined)
    activitySliders[activityId] = 0;
  activitySliders[activityId] += direction;

  if (activitySliders[activityId] < 0) {
    activitySliders[activityId] = slides.length - 1;
  } else if (activitySliders[activityId] >= slides.length) {
    activitySliders[activityId] = 0;
  }

  updateActivitySlider(activityId, slides, dots);
}

function goToActivitySlide(activityId, slideIndex, dot) {
  let card = dot.closest(".activity-card");
  if (!card) return;
  const slider = card.querySelector(".activity-slider");
  const slides = slider.querySelectorAll(".activity-slide");
  const dots = card.querySelectorAll(".activity-dot");

  activitySliders[activityId] = slideIndex;
  updateActivitySlider(activityId, slides, dots);
}

function updateActivitySlider(activityId, slides, dots) {
  const currentIndex = activitySliders[activityId];

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Activity modal functionality
function openActivityModal(activityId) {
  const modal = document.getElementById("activity-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalLocation = document.getElementById("modal-location");
  const modalDescription = document.getElementById("modal-description");
  const modalSlides = document.getElementById("modal-slides");
  const modalDots = document.getElementById("modal-dots");
  const modalParticipants = document.querySelector(".participants-list");

  // ========== Activity data ==========
  // Content aktivitas modal content atau popup dengan backdrop blur
  const activityData = {
    activity1: {
      title: "Peluncuran Portofolio kelas",
      date: "19 Juni 2025",
      location: "Undefined",
      description:
        "Pembuatan informasi konten berbasis website sebagai portofolio kelas dengan menjadi bentuk contoh pemanfaatan teknologi komputer dengan baik. Dalam hal ini website portofolio kelas mendasari informasi atau konten di dalamnya yang diunggah sebagai apresiasi dokumentasi aktivitas siswa dan siswi yang sebelumnya dilakukan profesional content.",
      images: [
        "img/aktifitas1/portofolio-digital-qrcode.png",
        "img/aktifitas1/foto-laptop-pemrograman.jpg",
        "img/aktifitas1/tampilan-website-portokelas-di-macbook.png",
      ],
      participants: ["Rohan Isagani"],
    },
    activity2: {
      //sesuaikan dengan card utama
      title: "Profil Pelajar Pancasila",
      date: "26 September 2024",
      location: "D.I Yogyakarta",
      description:
        "Melakukan kegiatan belajar dalam rangka P5 dengan mengunjungi tempat-tempat yang mendukung suatu rangkaian pembelajaran yang seru. Beberapa tempat yang dikunjungi antara lain adalah Museum Senobudoyo, BLPT Yogyakarta, Museum Mbah Marijan, Lava Tour Merapi Adventure, malioboro,  dan lainnya. ",
      images: [
        "img/Aktivitas-P5/P5-fotbar-rest-area.jpg",
        "img/Aktivitas-P5/P5-splitcer.jpg",
        "img/Aktivitas-P5/P5-BLPT.jpg",
        "img/Aktivitas-P5/P5-fotbar.jpg",
        "img/Aktivitas-P5/P5-xtkj1fotomalioboro.png",
      ],
      participants: [
        "Siswa/i X TKJ 1",
        "Guru TKJ",
        "Angkatan Thn Ajaran 2024",
        "Guru SMKN 2 Lamongan",
      ],
    },
    activity3: { //TIDAK SESUAI DAN AKAN DIHAPUS ACTIVITY 3 
      //sesuaikan dengan card utama
      title: "Belajar Matematika Dasar",
      date: "10 Juni 2025",
      location: "Ruang Kelas X TKJ 1",
      description:
        "Kegiatan pembelajaran matematika dasar yang mencakup materi aljabar, geometri, dan statistik. Sesi ini bertujuan untuk memperkuat pemahaman dasar matematika sebagai fondasi untuk mata pelajaran teknis lainnya. Pembelajaran dilakukan dengan metode interaktif dan praktik langsung untuk meningkatkan pemahaman siswa.",
      images: [
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      ],
      participants: [
        "Siswa/i X TKJ 1",
        "Guru Matematika",
        "Tutor sebaya",
        "Tim belajar",
      ],
    },
    activity4: {
      //sesuaikan dengan card utama
      title: "Logika Pemrograman Scratch",
      date: "29 Agustus 2025",
      location: "Laboratorium Informatika SMKN 2 Lamongan",
      description:
        "Memahami logika pemrograman dasar dengan menggunakan media game scratch sebagai bentuk interaktif yang mudah bagi pemula. Dalam kegiatan ini siswa dan siswi XI TKJ 1 diajak untuk mengenal konsep dasar pemrograman seperti urutan, dan pengulangan melalui pembuatan proyek sederhana di platform Scratch. Pelaksanaan kegiatan ini berlangsung di laboratorium informatika SMKN 2 Lamongan yang pada saat itu sedang tidak digunakan untuk pembelajaran reguler oleh kelas lainnya. Hal ini memungkinkan siswa untuk belajar dalam lingkungan yang kondusif dengan fasilitas yang memadai seperti proyektor.",
      images: [
        "img/aktifitas2/scratch-dan-lkpd.jpg",
        "img/aktifitas2/scratch1.jpg",
        "img/aktifitas2/scratch2.jpg",
        "img/aktifitas2/scratch3.png",
      ],
      participants: [
        "Siswa/i X TKJ 1",
        "Guru MP Pilihan Jurusan XI TKJ 1",
        "Tim belajar",
      ],
    },
  };

  const data = activityData[activityId];
  if (!data) return;

  // Populate modal content
  modalTitle.textContent = data.title;
  modalDate.innerHTML = `<i class="fas fa-calendar"></i> ${data.date}`;
  modalLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
  modalDescription.textContent = data.description;

  // Populate images
  modalSlides.innerHTML = "";
  modalDots.innerHTML = "";

  data.images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = `modal-slide ${index === 0 ? "active" : ""}`;
    slide.innerHTML = `<img src="${image}" alt="${data.title} ${index + 1}">`;
    modalSlides.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = `modal-dot ${index === 0 ? "active" : ""}`;
    dot.onclick = () => goToModalSlide(index);
    modalDots.appendChild(dot);
  });

  // Populate participants
  modalParticipants.innerHTML = "";
  data.participants.forEach((participant) => {
    const tag = document.createElement("span");
    tag.className = "participant-tag";
    tag.textContent = participant;
    modalParticipants.appendChild(tag);
  });

  // Setup modal navigation
  setupModalNavigation(data.images.length);

  // Show modal
  modal.classList.add("active");
  modalSlide = 0;
}

function closeActivityModal() {
  const modal = document.getElementById("activity-modal");
  modal.classList.remove("active");
}

function setupModalNavigation(imageCount) {
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");

  prevBtn.onclick = () => changeModalSlide(-1, imageCount);
  nextBtn.onclick = () => changeModalSlide(1, imageCount);
}

function changeModalSlide(direction, imageCount) {
  modalSlide += direction;

  if (modalSlide < 0) {
    modalSlide = imageCount - 1;
  } else if (modalSlide >= imageCount) {
    modalSlide = 0;
  }

  updateModalSlider();
}

function goToModalSlide(slideIndex) {
  modalSlide = slideIndex;
  updateModalSlider();
}

function updateModalSlider() {
  const slides = document.querySelectorAll(".modal-slide");
  const dots = document.querySelectorAll(".modal-dot");

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === modalSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === modalSlide);
  });
}

// Update students display
function updateStudentsDisplay() {
  const studentsTbody = document.getElementById("students-tbody");
  const totalStudentsElement = document.getElementById("total-students");
  const maleStudentsElement = document.getElementById("male-students");
  const femaleStudentsElement = document.getElementById("female-students");

  if (studentsData.length === 0) {
    studentsTbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; padding: 2rem; color: #666;">Tidak ada data siswa</td></tr>';
    totalStudentsElement.textContent = "0";
    maleStudentsElement.textContent = "0";
    femaleStudentsElement.textContent = "0";
    return;
  }

  // Clear existing content
  studentsTbody.innerHTML = "";

  // Calculate statistics
  const maleCount = studentsData.filter(
    (student) => student.gender === "L"
  ).length;
  const femaleCount = studentsData.filter(
    (student) => student.gender === "P"
  ).length;

  // Update statistics
  totalStudentsElement.textContent = studentsData.length;
  maleStudentsElement.textContent = maleCount;
  femaleStudentsElement.textContent = femaleCount;

  // Generate student rows
  studentsData.forEach((student, index) => {
    const studentRow = createStudentRow(student, index + 1);
    studentsTbody.appendChild(studentRow);
  });
}

// Create individual student row
function createStudentRow(student, number) {
  const row = document.createElement("tr");

  const genderClass = student.gender === "L" ? "gender-male" : "gender-female";
  const genderText = student.gender === "L" ? "Laki-laki" : "Perempuan";

  row.innerHTML = `
        <td><span class="absen-number">${number}</span></td>
        <td class="student-name">${student.name}</td>
        <td><span class="student-gender ${genderClass}">${genderText}</span></td>
        <td class="student-phone">${student.phone}</td>
    `;

  return row;
}

// Update activities display
function updateActivitiesDisplay() {
  const activitiesGrid = document.getElementById("activities-grid");

  if (activitiesData.length === 0) {
    // Show no data message (already in HTML)
    return;
  }

  // Clear existing content
  activitiesGrid.innerHTML = "";

  // Generate activity cards
  activitiesData.forEach((activity) => {
    const activityCard = createActivityCard(activity);
    activitiesGrid.appendChild(activityCard);
  });
}

// Create individual activity card
function createActivityCard(activity) {
  const card = document.createElement("div");
  card.className = "activity-card";

  card.innerHTML = `
        <div class="activity-image">
            <i class="fas fa-image"></i>
        </div>
        <div class="activity-content">
            <h3 class="activity-title">${
              activity.title || "[Judul Aktivitas]"
            }</h3>
            <p class="activity-description">${
              activity.description || "[Deskripsi aktivitas]"
            }</p>
            <p class="activity-date">${activity.date || "[Tanggal]"}</p>
        </div>
    `;

  return card;
}

// Update active section on page load
function updateActiveSection() {
  // Check if there's a hash in URL
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    navigateToSection(hash);
  } else {
    navigateToSection("home");
  }
}

// Handle browser back/forward
window.addEventListener("popstate", function () {
  updateActiveSection();
});

// Update URL hash when navigating
function updateURLHash(sectionId) {
  history.pushState(null, null, `#${sectionId}`);
}

// Enhanced navigation function that updates URL
const originalNavigateToSection = navigateToSection;
navigateToSection = function (sectionId) {
  originalNavigateToSection(sectionId);
  updateURLHash(sectionId);
};

// Smooth scroll behavior for internal links
document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href").startsWith("#")
  ) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    navigateToSection(targetId);
  }
});

// Add loading states for dynamic content
function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '<div class="loading"></div>';
  }
}

function hideLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const loadingElement = element.querySelector(".loading");
    if (loadingElement) {
      loadingElement.remove();
    }
  }
}

// Function to add student data (for future use when real data is available)
function addStudent(studentData) {
  studentsData.push(studentData);
  updateStudentsDisplay();
}

// Function to add activity data (for future use when real data is available)
function addActivity(activityData) {
  activitiesData.push(activityData);
  updateActivitiesDisplay();
}

// Function to update leadership data (for future use)
function updateLeadershipData(leadershipData) {
  // This function can be used to update leadership positions dynamically
  const positions = [
    "wali-kelas",
    "ketua",
    "wakil-ketua",
    "bendahara",
    "wakil-bendahara",
    "sekretaris",
    "wakil-sekretaris",
  ];

  positions.forEach((position) => {
    const element = document.querySelector(`.${position} .leader-name`);
    if (element && leadershipData[position]) {
      element.textContent = leadershipData[position];
    }
  });
}

// Responsive image handling
function handleResponsiveImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.addEventListener("error", function () {
      this.style.display = "none";
    });
  });
}

// Initialize responsive images when page loads
document.addEventListener("DOMContentLoaded", handleResponsiveImages);

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", lazyLoadImages);
}

// Accessibility improvements
function improveAccessibility() {
  // Add ARIA labels
  const hamburgerBtn = document.getElementById("hamburger");
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute("aria-label", "Toggle navigation menu");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  // Update aria-expanded on hamburger toggle
  hamburger.addEventListener("click", function () {
    const isExpanded = navMenu.classList.contains("active");
    hamburgerBtn.setAttribute("aria-expanded", isExpanded);
  });

  // Add keyboard navigation
  navLinks.forEach((link) => {
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", improveAccessibility);

// Error handling for failed operations
function handleError(error, context) {
  console.error(`Error in ${context}:`, error);

  // Show user-friendly error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
            <strong>Terjadi kesalahan:</strong> ${
              error.message ||
              "Tidak dapat memuat data. Silakan coba lagi nanti."
            }
        </div>
    `;

  return errorDiv;
}

// Export functions for potential external use
window.ClassPortfolio = {
  navigateToSection,
  addStudent,
  addActivity,
  updateLeadershipData,
};
