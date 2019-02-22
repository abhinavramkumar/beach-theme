//-- Variables Navbar Buttons & Actions
const navbarToggle = document.getElementById('navbar-toggle');
const navbarClose = document.querySelector('.Navbar__close');
const navbar = document.querySelector('.Navbar');
const portfolios = Array.from(document.querySelectorAll('.Portfolio__portfolio'));
const portfolioControls = Array.from(document.querySelectorAll('.Portfolio__toolbar > button'));

const sliderControl = Array.from(document.querySelectorAll('button.control'));
const testimonialContainer = document.querySelector('.Testimonial__container');

// Stats Counters
const clients = document.getElementById('clients');
const projects = document.getElementById('projects');
const coffee = document.getElementById('coffee');
const awards = document.getElementById('awards');

//-- eventHandlers
const toggleNavbar = e => {
  if (navbar.classList.contains('active')) {
    navbar
      .classList
      .remove('active');
  } else {
    navbar
      .classList
      .add('active');
  }
};
const countUpOptions = {
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: '.'
};

var clTime = new CountUp(clients, 0, 21, 0, 3.0, countUpOptions);
var pTime = new CountUp(projects, 0, 40, 0, 3.0, countUpOptions);
var coTime = new CountUp(coffee, 0, 866, 0, 3.0, countUpOptions);
var aTime = new CountUp(awards, 0, 15, 0, 3.0, countUpOptions);

/* Handle OnScroll actions */
const onScroll = e => {
  const triggerY = 2533;
  if (window.pageYOffset > triggerY) {
    if (!clTime.error && !pTime.error && !coTime.error && !aTime.error) {
      clTime.start();
      pTime.start();
      coTime.start();
      aTime.start();
    } else {
      console.log("Counter Up Error!");
    }
  }
};

/* Portfolio Filtering */
const filterPortfolio = e => {
  // the category code
  const selectedCategory = e
    .target
    .dataset
    .target
    .split(" ");

  // Filtered Array
  let resultPortfolios = [];
  let unselectedPortfolios = [];

  if (selectedCategory.length === 1) {
    resultPortfolios = portfolios.filter((el, index) => {
      return el.dataset.cat === selectedCategory[0]
        ? true
        : false;
    });
  } else {
    resultPortfolios = Array.from(portfolios);
  }

  portfolios.map(result => {
    if (!result.classList.contains('shrink')) {
      result
        .classList
        .add('shrink');
    }
  });

  resultPortfolios.map(result => {
    if (result.classList.contains('shrink')) {
      result
        .classList
        .remove('shrink');
    }
  });

};

/* Switch Slider */
const switchSlider = e => {
  const controls = Array.from(e.target.parentNode.children);
  controls.map(control => {
    if (control.classList.contains('active')) {
      control
        .classList
        .remove('active');
    }
  });

  e
    .target
    .classList
    .add('active');

  if (e.target.dataset.id === "1") {
    if (testimonialContainer.classList.contains('switch')) {
      testimonialContainer
        .classList
        .remove('switch');
    }
  } else {
    if (!testimonialContainer.classList.contains('switch')) {
      testimonialContainer
        .classList
        .add('switch');
    }
  }
};

//-- Events
document.addEventListener('scroll', onScroll);
navbarToggle.addEventListener('click', toggleNavbar);
navbarClose.addEventListener('click', toggleNavbar);
portfolioControls.map(el => {
  el.addEventListener('click', filterPortfolio);
});
sliderControl.map(controller => {
  controller.addEventListener('click', switchSlider);
})