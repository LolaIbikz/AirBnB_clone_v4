window.addEventListener('load', function () {
  // task 3
  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // task 2
  const amenityIds = {};
  $('input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenityIds[$(this).attr('data-id')];
    }
    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  });

  // task 4
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function (data) {
    for (const place of data) {
      const template = `<article>
        <div class="title">
          <h2>${place.name}</h2>
          <div class="price_by_night">
        $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
        <br />
        ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article> <!-- End 1 PLACE Article -->`;
      $('section.places').append(template);
    }
  });
});

// task 5
// filter places based on checked amenities when button clicked

$('button').on('click', () => {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify({"amenities": Object.keys(checkedAmenities)}),
    contentType: 'application/json',
    success: (data, textStatus, jqXHR) => {
      if (jqXHR.status === 200) {
	      $('section.places').empty();
        populate(data);
      }
    }
  });		
});
});

//task 6
// Add states to list
  const stateCheckbox = $('.state_checkbox');
  stateCheckbox.on('change', function() {
    const stateId = $(this).data('id');
    const stateName = $(this).data('name');

    if ($(this).is(':checked')) {
      checkedStates[stateId] = stateName;
    } else {
      delete checkedStates[stateId];
    }
    const selectedStates = Object.values(checkedStates).join(', ');
    $('.locations h4').text(selectedStates);
  });

  // task 6
  // Add cities to list
  const cityCheckbox = $('.city_checkbox');
  cityCheckbox.on('change', function() {
    const cityId = $(this).data('id');
    const cityName = $(this).data('name');

    if ($(this).is(':checked')) {
      checkedCities[cityId] = cityName;
    } else {
      delete checkedCities[cityId];
    }
    const selectedCities = Object.values(checkedCities).join(', ');
    $('.locations h4').text(selectedCities);
  });
