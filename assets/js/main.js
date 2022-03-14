// toggle menu 
const navMenu = document.getElementById('nav__menu');
const navToggle = document.getElementById('nav__toggle');
const navClose = document.getElementById('nav__close');

navToggle.addEventListener('click', function(){
    navMenu.classList.toggle('show-menu');
})

navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
}) 


// modal 
const modalView = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll('.services__button');
const modalClose = document.querySelectorAll('.services__modal-close');

function openModal(i){
    modalView[i].classList.add("active-modal");
}

modalBtns.forEach((btn, i) => {
    btn.addEventListener("click", function(){
        openModal(i);
    })
})

modalClose.forEach((btn, i) => {
    btn.addEventListener("click", function(){
        modalView[i].classList.remove("active-modal");
    })
})

// Swiper

let swiperProjects = new Swiper(".projects__container", {
    spaceBetween: 24,
    loop:true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
            slidesPerView: 2,
          spaceBetween: 30,
        }
      },
  });

// Active link 
const sections = document.querySelectorAll('section[id]');
const navItem = document.querySelectorAll('.nav__item');


function scrollActive(){
    // scrollY indicates in which point you are now
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        // homeSection = the header height and the home section hieght 
        const homeSection = document.getElementById("home").offsetHeight; 
        // sectionHeight = each section height
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - homeSection;
        const sectionId = current.getAttribute('id');


        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            if(sectionId === "home"){
                navItem.forEach(item => item.classList.remove(".active-link"))
            }else{
                document.querySelector('.nav__item a[href*=' + sectionId + ']').classList.add('active-link')
            }
            
        }
        else {
            if(sectionId != "home"){
                document.querySelector('.nav__item a[href*=' + sectionId + ']').classList.remove('active-link')
            }
        }
    })
}

window.addEventListener('scroll', scrollActive)

// SCroll reveal

const sr = ScrollReveal({
    origin:'left',
    distance: '60px',
    duration: 2500,
    delay:400,
    // reset:true
})
sr.reveal('.home__img', {origin: 'right'})
sr.reveal('.home__data'), {origin: 'left'}
sr.reveal('.about__container', {origin: 'top'},{delay:400});
sr.reveal('.services__container, .projects__container', {origin: 'top'})
sr.reveal ('.contact__header', {origin: 'left'})
sr.reveal ('.contact__form', {origin: 'right'})
sr.reveal ('.footer__container', {origin: 'bottom'})

// Form spree

window.addEventListener("DOMContentLoaded", function () {
    // get the form elements defined in your form HTML above
  
    let form = document.getElementById("my-form");
    // var button = document.getElementById("my-form-button");
    let status = document.getElementById("status");
    // Success and Error functions for after the form is submitted
  
    function success() {
      form.reset();
      status.innerHTML = "Thanks!";
      status.classList.add("success");
      timeOutClass("success");
    }
  
    function error() {
        status.innerHTML = "Oops! There was a problem.";
      status.classList.add("error");
      timeOutClass("error");

    }
  
    // handle the form submission event
  
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      let data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }

function timeOutClass(text){
    setTimeout(() => {
        document.getElementById("status").classList.remove(text);
        document.getElementById("status").innerHTML = "";
    }, 4000);
}
  