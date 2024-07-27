function openMenu() {
  document.body.classList.add("menu-expanded");
}

function closeMenu() {
  document.body.classList.remove("menu-expanded");
}

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);

    if (this.form) {
      this.url = this.form.getAttribute("action");
    }

    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");

    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });

    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    this.formButton.disabled = true;
    this.formButton.innerHTML = "Enviando ...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);

      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });

      if (response.ok) {
        this.displaySuccess();
      } else {
        this.displayError();
      }
    } catch (error) {
      this.displayError();
      console.error(error);
    } finally {
      this.formButton.disabled = false;
      this.formButton.innerHTML = "Enviar";
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h3 class='success'>Mensagem enviada com sucesso.</h3>",
  error: "<h3 class='error'>Não foi possível enviar sua mensagem.</h3>",
});

formSubmit.init();

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.slidesContainer = this.carousel.querySelector(
      "[data-carousel-slides-container]"
    );
    this.slides = this.slidesContainer.children;
    this.prevButton = this.carousel.querySelector(
      "[data-carousel-button-previous]"
    );
    this.nextButton = this.carousel.querySelector(
      "[data-carousel-button-next]"
    );
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.visibleSlides = window.innerWidth <= 767 ? 1 : 5;
    this.autoplayInterval = 3000; // Intervalo do autoplay em milissegundos

    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());

    window.addEventListener("resize", () => {
      this.visibleSlides = window.innerWidth <= 767 ? 1 : 5;
      this.updateSlidesPosition();
    });

    this.startAutoplay();
  }

  updateSlidesPosition() {
    const offset = -(this.currentIndex * (100 / this.visibleSlides));
    this.slidesContainer.style.transform = `translateX(${offset}%)`;
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalSlides - this.visibleSlides;
    }
    this.updateSlidesPosition();
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - this.visibleSlides) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSlidesPosition();
  }

  startAutoplay() {
    this.autoplay = setInterval(() => this.nextSlide(), this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplay) {
      clearInterval(this.autoplay);
    }
  }
}

document
  .querySelectorAll("[data-carousel]")
  .forEach((carousel) => new Carousel(carousel));
