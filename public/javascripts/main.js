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
    function(start, end, label){
      $("input[name='date_from']").val(start.format('YYYY-MM-DD'));
      $("input[name='date_to']").val(end.format('YYYY-MM-DD'));
    });


  /* click on book-btn: start */

  $('.book-form').on('submit', function (e) {
    e.preventDefault();

    var theForm = $(this);
    var url = theForm.attr("action"),
    method  = theForm.attr("method"),
    dataObj = $('#search-form').serializeToJSON();

    // http://api.jquery.com/jquery.ajax/
    $.ajax({
      url: url,
      method: method,
      data: dataObj,
      dataType: "json"
    }).done(function(obj){
      theForm.closest(".thumbnailParent").remove();
        console.log("success", obj);
    }).fail(function(obj) {
      console.log("failed", obj);
    })

  });

  /* ### booking.hbs END ### */

});