// Global variables
let currentSection = "home";
let studentsData = [];
let activitiesData = [];

// DOM elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeData();
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
    home: "Beranda - X TKJ 1",
    students: "Data Siswa - X TKJ 1",
    leadership: "Kepengurusan - X TKJ 1",
    activities: "Aktivitas - X TKJ 1",
  };

  document.title = titles[sectionId] || "Portofolio Kelas X TKJ 1";
}

// Initialize data with sample student data
function initializeData() {
  // Sample data for 37 students (can be replaced with real data)
  studentsData = [
    { name: "Abdul Aziz Rendy Pratama", gender: "L", phone: "081234567001" },
    { name: "Achmad Revi Febryan Triputra", gender: "L", phone: "081234567002" },
    { name: "Ahmad Hafidz Salman Alfarisi", gender: "L", phone: "081234567003" },
    { name: "Ahmat Teguh Pambudi", gender: "L", phone: "081234567004" },
    { name: "Akhmat Tukhin", gender: "L", phone: "081234567005" },
    { name: "Al-Abidatus Sholicha", gender: "p", phone: "081234567006" },
    { name: "Amalia Maqsudah", gender: "P", phone: "081234567007" },
    { name: "Andra Ibrahim Ma'ruf", gender: "L", phone: "081234567008" },
    { name: "Arindra Pradita Pratama Putra", gender: "L", phone: "081234567009" },
    { name: "Astri Lestari", gender: "L", phone: "081234567010" },
    { name: "Azril Cahya Syahputra", gender: "L", phone: "081234567011" },
    { name: "Devin Julio Pratama", gender: "L", phone: "081234567012" },
    { name: "Diga Nikaya Akbar", gender: "L", phone: "081234567013" },
    { name: "Evan Favian Akmal", gender: "L", phone: "081234567014" },
    { name: "Fathan Ghani", gender: "L", phone: "081234567015" },
    { name: "Galih Juliansyah", gender: "L", phone: "081234567016" },
    { name: "Hamdani Navis Choiri", gender: "L", phone: "081234567017" },
    { name: "Reza Pahlevi", gender: "L", phone: "081234567018" },
    { name: "Sari Wulandari", gender: "P", phone: "081234567019" },
    { name: "Taufik Hidayat", gender: "L", phone: "081234567020" },
    { name: "Ulfa Azizah", gender: "P", phone: "081234567021" },
    { name: "Vino Bastian", gender: "L", phone: "081234567022" },
    { name: "Winda Kusuma", gender: "P", phone: "081234567023" },
    { name: "Xavier Anggara", gender: "L", phone: "081234567024" },
    { name: "Yuni Shara", gender: "P", phone: "081234567025" },
    { name: "Zaki Mubarak", gender: "L", phone: "081234567026" },
    { name: "Arief Budiman", gender: "L", phone: "081234567027" },
    { name: "Bella Safira", gender: "P", phone: "081234567028" },
    { name: "Candra Kirana", gender: "P", phone: "081234567029" },
    { name: "Dani Pratama", gender: "L", phone: "081234567030" },
    { name: "Eka Sari", gender: "P", phone: "081234567031" },
    { name: "Fandi Ahmad", gender: "L", phone: "081234567032" },
    { name: "Gina Puspita", gender: "P", phone: "081234567033" },
    { name: "Hafiz Ramadhan", gender: "L", phone: "081234567034" },
    { name: "Intan Permata", gender: "P", phone: "081234567035" },
    { name: "Jihan Aulia", gender: "P", phone: "081234567036" },
    { name: "Kevin Andika", gender: "L", phone: "081234567037" },
  ];

  activitiesData = []; // This will be populated from HTML content

  // Update UI to show current state
  updateStudentsDisplay();
  updateActivitiesDisplay();
}

// Load section-specific data
function loadSectionData(sectionId) {
  switch (sectionId) {
    case "students":
      updateStudentsDisplay();
      break;
    case "activities":
      updateActivitiesDisplay();
      break;
    case "leadership":
      // Leadership data is static in HTML, but could be dynamic
      break;
  }
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
