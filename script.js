const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click",() => {
  //Toggle mobile menu visibility 
  document.body.classList.toggle("show-mobile-menu");
});
//Close menu when the close buton is clicked
menuCloseButton.addEventListener("click" , () =>menuOpenButton.click())




// JS - persistent + URL-based fallback
document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.nav-link'));
  if (!links.length) return;

  // Try to restore from localStorage
  const savedHref = localStorage.getItem('activeLink');
  if (savedHref) {
    const saved = links.find(l => l.getAttribute('href') === savedHref);
    if (saved) saved.classList.add('active');
  }

  // If no saved active, try matching current URL (multi-page sites)
  if (!document.querySelector('.nav-link.active')) {
    const current = location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      const linkFile = link.getAttribute('href').split('/').pop() || '';
      if (linkFile === current || (current === '' && (linkFile === 'index.html' || linkFile === '/'))) {
        link.classList.add('active');
      }
    });
  }

  // Attach click handlers to set active and save to localStorage
  links.forEach(link => {
    link.addEventListener('click', () => {
      // Immediately update classes (good for SPAs or to show visual feedback before navigation)
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Save href so the active state persists after navigation/reload
      localStorage.setItem('activeLink', link.getAttribute('href'));
      // NOTE: Do not call e.preventDefault() unless you want to prevent navigation (for SPA)
    });
  });
});


 const slider = document.getElementById("slider");
  const images = document.querySelectorAll(".image");
  const dotsContainer = document.getElementById("dots");
  let index = 0;

  function getVisibleImages() {
    if (window.innerWidth <= 480) return 1; 
    if (window.innerWidth <= 768) return 2; 
    return 3; 
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const visible = getVisibleImages();
    const total = images.length - visible + 1; 
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.onclick = () => goToSlide(i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function moveSlide(step) {
    const visible = getVisibleImages();
    const total = images.length;
    const maxIndex = total - visible; // ✅ fix: prevents half image
    index = Math.min(Math.max(index + step, 0), maxIndex);
    slider.style.transform = `translateX(${-index * (100 / visible)}%)`;
    updateDots();
  }

  function goToSlide(n) {
    const visible = getVisibleImages();
    index = n;
    slider.style.transform = `translateX(${-index * (100 / visible)}%)`;
    updateDots();
  }

  window.addEventListener("resize", () => {
    createDots();
    moveSlide(0);
  });

  createDots();
// let currentIndex = 0;
//     const slider = document.getElementById('slider');
//     const dots = document.querySelectorAll('.dot');
//     const totalGroups = 2; // 6 images / 3 per view

//     function updateSlider() {
//       slider.style.transform = `translateX(-${currentIndex * 100}%)`;
//       dots.forEach((dot, i) => {
//         dot.classList.toggle('active', i === currentIndex);
//       });
//     }

//     function moveSlide(step) {
//       currentIndex += step;
//       if (currentIndex < 0) currentIndex = totalGroups - 1;
//       if (currentIndex >= totalGroups) currentIndex = 0;
//       updateSlider();
//     }

//     function goToSlide(index) {
//       currentIndex = index;
//       updateSlider();
//     }
