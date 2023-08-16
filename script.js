'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//!used forEach insted of IF
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////

const header = document.querySelector(`.header`);
const allSections = document.querySelectorAll(`.section`);
const allButtons = document.getElementsByTagName(`button`);
document.getElementsByClassName(`btn`);

const logo = document.querySelector('nav__logo');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //!MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});

//!New way for scroll all nav__links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
/////////////////////////////////

//! Sticky navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//! Lazy effect reveal: Intersection Observer API

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////

//! Lazy effect loading images
const imgTarget = document.querySelectorAll('img[data-src]');
const loading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //*replacing the src img
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0.15,
  rootMargin: `200px`,
});
imgTarget.forEach(img => imgObserver.observe(img));

////////////////////////////////

//! Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const goToSlide = function (e) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - e)}%)`)
  );
};
goToSlide(0);
let currentSlide = 0;
const maxSlide = slides.length;

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activeDot(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
};

const preSlide = function () {
  if (currentSlide === 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
};

//!next slide right
btnRight.addEventListener('click', nextSlide);
//!next slide Left
btnLeft.addEventListener('click', preSlide);

//!switch slides with Arrow KeyBoard
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    preSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  }
});

///////////////////////////////////////////////////////////////////////////
//! cookies message
// const message = document.createElement(`div`);
// message.classList.add('cookie__message');

// message.innerHTML = `we use cookies. <button class="btn btn--close-cookie">Got it!</button>`;

// // header.prepend(message)
// header.append(message);

// document
//   .querySelector(`.btn--close-cookie`)
//   .addEventListener('click', function () {
//     // message.remove()
//     message.parentElement.removeChild(message);
//   });

// message.style.width = '100%';
// message.style.textAlign = 'center';
// message.style.fontSize = '15px';
// message.style.fontWeight = 'bold';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //! Old way for sticky nav
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//! Old scroll for all nav__links
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//!
//////////////////////////////////
// //!
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {});

// message.textContent = `we use loreamdasdad dsadf fgasd`;
// message.style.height= Number.parseFloat(getComputedStyle(message).height,10)+40+'px'

// const s1Coords = section1.getBoundingClientRect();

// console.log(e.target.getBoundingClientRect());
// console.log('(Current scroll(X/Y)', window.pageXOffset, pageYOffset);

// console.log(
//   `height/width viewport`,
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//!smooth scroll 1st way: OLD WAY
// window.scrollTo(
//   s1Coords.left + window.pageXOffset,
//   s1Coords.top + window.pageYOffset
// );

// window.scrollTo({
//   left: s1Coords.left + window.pageXOffset,
//   top: s1Coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });
