$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').click(function () {
    const amenityID = $(this).attr('data-id');
    const amenityNAME = $(this).attr('data-name');

    if ($(this).prop('checked') === true) {
        slectedAmenities[amenityID = amenityNAME;
    } else if ($(this).prop('checked') === false) {
      delete selectedAmenities[amenityID];
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
});
