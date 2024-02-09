$(document).ready(function() {
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        var checkedAmenities = {}; // Variable to store Amenity IDs
        $('input[type="checkbox"]:checked').each(function() {
            // Store Amenity ID in the variable
            var amenityId = $(this).data('id');
            var amenityName = $(this).data('name');
            checkedAmenities[amenityId] = amenityName;
        });
        // Update h4 tag inside the div Amenities with the list of Amenities checked
        var amenitiesList = Object.values(checkedAmenities).join(', ');
        $('.amenities h4').text('Amenities: ' + amenitiesList);
    });
});
