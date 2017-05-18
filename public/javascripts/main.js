$(document).ready(function () {
  console.log("jquery ready");

  $('.book-form').on('submit', function (e) {
    e.preventDefault();
    console.log($('#search-form').serializeArray());
  });
});