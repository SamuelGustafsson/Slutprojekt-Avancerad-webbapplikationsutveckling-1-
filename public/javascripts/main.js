$(document).ready(function () {
  console.log("jquery ready");



  /* ### booking.hbs START ### */

  // http://www.daterangepicker.com/

  /*set current date*/
  var dateNow = moment().format('YYYY-MM-DD');
  $("input[name='date_from'], input[name='date_to']").val(dateNow)

  /*
    activate the daterange picker.
    change the format and reassign values to the hidden input fields(date_from and date_to)
  */
  $('input[name="daterange"]').daterangepicker({
    locale: {
      format: 'YYYY-MM-DD'
    },
  },
    function (start, end, label) {
      $("input[name='date_from']").val(start.format('YYYY-MM-DD'));
      $("input[name='date_to']").val(end.format('YYYY-MM-DD'));
    });


  /* click on book-btn: start */

  $(document).on('submit', '.book-form', function (e) {
    e.preventDefault();

    var theForm = $(this);
    var url = theForm.attr("action"),
      method = theForm.attr("method"),
      dataObj = $('#search-form').serializeToJSON();

    // http://api.jquery.com/jquery.ajax/
    $.ajax({
      url: url,
      method: method,
      data: dataObj,
      dataType: "json"
    }).done(function (obj) {
      theForm.closest(".thumbnailParent").remove();
      console.log("success", obj);
    }).fail(function (obj) {
      console.log("failed, have you logged in?", obj);

      // Add jquery confirm
      togglebBokAlertBox({ hideBoxAfter: 1500 });
    })

  });

  function togglebBokAlertBox(obj) {
    var selector = ".bookAlertBox";
    $(selector).show();
    setInterval(function () {
      $(selector).hide();
    }, obj.hideBoxAfter);
  }
  /* ### booking.hbs END ### */



  /* click on search-btn: start */

  /* activate this block:
      if you want to send and update cars with a ajax post req.
      ( the form in booking.hbs sends an GET req by default (user can change the query data in the url...) )
  */

  $(document).on('submit', '#search-form', function (e) {
    e.preventDefault();

    var theForm = $(this);
    var url = theForm.attr("action") + "/filter",
      method = "POST",
      dataObj = $(theForm).serializeToJSON();

    console.log(url);
    console.log(method);
    console.log(dataObj);

    // POST request AJAX
    // http://api.jquery.com/jquery.ajax/
    $.ajax({
      url: url,
      method: method,
      data: dataObj,
      dataType: "json"
    }).done(function (obj) {
      console.log("success", obj);
      renderCars(obj);
    }).fail(function (obj) {
      console.log("failed, have you logged in?", obj);
    })
  });

  function renderCars(obj) {
    $("#thumbnailParentParent").empty();

    $.each(obj.cars, function (key, i_obj, index) {
      var carHTML = $("<div class='col-sm-6 col-md-4 thumbnailParent'><div class='thumbnail'><img src='" + i_obj.image + "' alt='" + i_obj.image + "'><div class='caption'><h3>" + i_obj.brand + "</h3><p>Model: " + i_obj.model + "</p><p>Price: " + i_obj.price + "</p><p>Transmisson: " + i_obj.automatic + "</p><p>Seats: " + i_obj.seats + "</p><form action='/bookings/car/" + i_obj._id + "' method='POST' class='book-form'><button type='submit' class='btn btn-success pull-right'>BOOK</button></form><p><a href='/cars/" + i_obj._id + "' class='btn btn-primary' role='button'>Details</a></p></div></div></div>");
      $("#thumbnailParentParent").append(carHTML);
    });
  }
});