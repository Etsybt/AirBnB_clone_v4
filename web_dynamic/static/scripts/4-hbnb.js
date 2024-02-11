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

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
      dataType: 'json',
      success: function (places) {
        $('.places').empty(); // Clear existing places
        for (const place of places) {
          const article = $('<article>');
          article.append($('<div class="title">').append(`<h2>${place.name}</h2>`));
          article.append($('<div class="price_by_night">').append(place.price_by_night));
          article.append($('<div class="information">')
            .append(`<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br>${place.max_guest} Guests</div>`)
            .append(`<div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>${place.number_rooms} Bedrooms</div>`)
            .append(`<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>${place.number_bathrooms} Bathroom</div>`));
          article.append($('<div class="user">').append(`<strong>Owner: ${place.user_id}</strong>`));
          article.append($('<div class="description">').append(place.description));
          $('.places').append(article);
        }
      },
      error: function (error) {
        console.log('Error fetching places:', error);
      }
    });
  });
});
