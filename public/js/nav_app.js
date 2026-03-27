const hamburger = document.querySelector(".hamberger");
const outside = document.querySelector(".outside");

hamburger.addEventListener("click", () => {

    outside.classList.toggle("active");

    hamburger.classList.toggle("open");

});

///////////// new.ejs
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')

    }, false)
  })
})()