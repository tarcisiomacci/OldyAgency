$(document).ready(function () {
  $("#nav-main-oldy .navbar-oldy ul li a").click(function (e) {
    $("#nav-main-oldy .navbar-oldy ul li a").removeClass("active");
    $(this).addClass("active");
    closeMenu();
  });

  //// portfolio

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  //// filters
  $("#portfolio .gallery .icons a, #portfolio .inline .icon a").click(
    function () {
      const typePromo = $(this).attr("class");
      const arr = typePromo.split("_");
      const promo = arr[1];

      console.log(typePromo);

      $("#portfolio #job-gallery .job").hide("fast");
      $("#portfolio #job-gallery ." + promo).show("fast");

      $("#portfolio .gallery .icons a").removeClass("active");
      $("#portfolio .gallery .icons a." + typePromo).addClass("active");
    }
  );

  //set current slide
  $("#portfolio .job a").click(function () {
    const oId = $(this).attr("id");
    const arr = oId.split("_");
    const currentSlide = arr[1];

    $("#custom-slider .cd-slider ul li.item").removeClass("current");
    $("#custom-slider .cd-slider ul li." + currentSlide).addClass("current");

    const actPosition = $(".cd-slider").find(".current").index();

    const totalJob =
      parseInt($("#custom-slider .cd-slider ul li.item").length) - 1;

    console.log("actPosition", actPosition);
    console.log("totalJob", totalJob);

    if (totalJob === actPosition) {
      $(".next").addClass("hide-nav");
    } else {
      $(".next").removeClass("hide-nav");
    }
    if (actPosition === 0) {
      $(".prev").addClass("hide-nav");
    } else {
      $(".prev").removeClass("hide-nav");
    }
  });

  //// slider
  $(function () {
    $(".prev").on("click", function (event) {
      event.preventDefault();
      prevSlide();
    });

    $(".next").on("click", function (event) {
      event.preventDefault();
      nextSlide();
    });

    // if ($(".item").length <= 1) {
    //   $(".next").addClass("hide-nav");
    // }

    // $(".prev").addClass("hide-nav");

    function nextSlide() {
      const atual = $(".cd-slider").find(".current"),
        next = atual.next();

      next
        .addClass("current")
        .removeClass("prev_slide")
        .siblings()
        .removeClass("current");
      next.prevAll().addClass("prev_slide");

      if (next.index() > 0) {
        $(".prev").removeClass("hide-nav");
      }
      if (next.index() == $(".item").last().index()) {
        $(".next").addClass("hide-nav");
      }
    }

    function prevSlide() {
      const atual = $(".cd-slider").find(".current"),
        prev = atual.prev();

      prev
        .addClass("current")
        .removeClass("prev_slide")
        .siblings()
        .removeClass("current");

      if (prev.index() !== $(".item").last().index()) {
        $(".next").removeClass("hide-nav");
      }
      if (prev.index() == 0) {
        $(".prev").addClass("hide-nav");
      }
    }
  });
});
