$(document).ready(function () {
  $("#nav-main-oldy .navbar-oldy ul li a").click(function (e) {
    $("#nav-main-oldy .navbar-oldy ul li a").removeClass("active");
    $(this).addClass("active");
    closeMenu();
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});
