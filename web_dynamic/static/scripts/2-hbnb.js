$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').click(function () {
    const amenity_id = $(this).attr('data-id');
    const amenity_name = $(this).attr('data-name');

    if ($(this).prop('checked') === true) {
      selectedAmenities[amenity_id] = amenity_name;
    } else if ($(this).prop('checked') === false) {
      delete selectedAmenities[amenity_id];
    }

    const selectedAmenitiesList = Object.values(selectedAmenities).join(', ');

    if (selectedAmenitiesList.length > 30) {
      $('.amenities h4').text(selectedAmenitiesList.substring(0, 29) + '...');
    } else {
      $('.amenities h4').text(selectedAmenitiesList);
    }

    if ($.isEmptyObject(selectedAmenities)) {
      $('.amenities h4').html('&nbsp;');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    },
    error: function (error) {
      $('DIV#api_status').removeClass('available');
    }
  });
});
