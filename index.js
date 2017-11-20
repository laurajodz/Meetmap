const MEETUP_SEARCH_URL = "https://api.meetup.com/find/upcoming_events/?key=524472e125072465129556564d2f74";

/*function handleSearch() {
  $('.search').on('click', event => {
  renderMap();
  });
}*/

// function handleSearch() {
//   $('.search').on('click', event => {
//   //$('#js-set-params').submit(function(event) {
//     event.preventDefault();
//     //const cat = $('.js-cat-id').val();
//     let cat = document.getElementById("category").value;
//     console.log(cat);
//     renderMap();
//   });
//}


function renderMap() {
  $('.container').html(
    `<div id="map">
    </div>`
  );
  initMap();
}

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.0902, lng: -95.7129},
    zoom: 4
  });
  infoWindow = new google.maps.InfoWindow;
  renderAdjust();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      //infoWindow.open(map);
      map.setCenter(pos);
      map.setZoom(12);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

/*function initMap() {
  var loc = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: loc
  });
  renderAdjust();
}*/

function getDataFromApi(searchTerm, callback) {
  const query = {
    //set inital search terms:
    //date is today
    //radius: 5,
    //category is all meetups
    key: '524472e125072465129556564d2f74'
  }
  $.getJSON(MEETUP_SEARCH_URL, query, callback);
}


function renderAdjust() {
  $('.container').append(
   `<form action="" method="" class="adjust-params" id="js-adjust-params">
      <fieldset role="radiogroup">
        <legend>Choose Categories</legend>
        <div class = "category">
          <input type="radio" class="js-cat" id=js-cat-id" value="All Meetups" name="cat"><label for="js-cat-id">All Meetups</label></input>
          <input type="radio" class="js-cat" id=js-cat-id" value="Arts" name="cat"><label for="js-cat-id">Arts</label></input>
          <input type="radio" class="js-cat" id=js-cat-id" value="Beliefs" name="cat"><label for="js-cat-id">Beliefs</label></input>


            <option value="Beliefs">Beliefs</option>
            <option value="Book Clubs">Book Clubs</option>
            <option value="Career & Business">Career & Business</option>
            <option value="Dance">Dance</option>
            <option value="Family">Family</option>
            <option value="Fashion & Beauty">Fashion & Beauty</option>
            <option value="Film">Film</option>
            <option value="Food & Drink">Food & Drinks</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Hobbies & Crafts">Hobbies & Crafts</option>
            <option value="LGBTQ">LGBTQ</option>
            <option value="Language & Culture">Language & Culture</option>
            <option value="Learning">Learning</option>
            <option value="Movements">Movements</option>
            <option value="Music">Music</option>
            <option value="Outdoors & Adventure">Outdoors & Adventure</option>
            <option value="Pets">Pets</option>
            <option value="Photography">Photography</option>
            <option value="Sci-Fi & Games">Sci-Fi & Games</option>
            <option value="Social">Social</option>
            <option value="Sports & Fitness">Sports & Fitness</option>
            <option value="Tech">Tech</option>
            <option value="Writing">Writing</option>
          </select>
        </div>

          <label for="js-new-cat-id">Change Meetup categories or enter search term</label><input type="textbox" class="" placeholder="All Meetups" id="js-new-cat-id" value="" name="js-new-cat"></input>
          <ul class="new-dropdown-cats">
            <li>All Meetups</li>
            <li>Arts</li>
            <li>Beliefs</li>
            <li>Book Clubs</li>
          </ul>
        </div>
        <div class = "location">
          <label for="js-location-id">Enter Zip Code or City</label><input type="text" class="js-loc" id="js-location-id" value="test" name="js-location"></input
        </div>
        <div class = "new-location">
          <label for="js-new-location-id">Change Zip Code or City/State</label><input type="text" class="" id="js-new-location-id" value="" name="js-new-location"></input>
        </div>
        <div class = "radius">
          <label for="js-radius-id">Select Radius</label><input type="text" class="" id="js-radius-id" value="" name="js-radius"></input>
          <ul class="dropdown-radius">
            <li>2 miles</li>
            <li>5 miles</li>
            <li>10 miles</li>
            <li>25 miles</li>
            <li>50 miles</li>
            <li>100 miles</li>
          </ul>
        </div>
        <div class = "date-range">
          <label for="js-date-range-id">Select Date Range</label><input type="text" class="" id="js-date-range-id" value="" name="js-date-range"></input>
          <ul class="dropdown-date-range">
            <li>Today</li>
            <li>Next three days</li>
            <li>This week</li>
            <li>Next week</li>
            <li>This month</li>
          </ul>
        </div>
        <div class = "membership">
          <label for="js-membership-id"></label><input type="radio" class="" id="js-membership-id" value="" name="js-membership"></input>
          <ul class="membership-type">
            <li>All Meetups</li>
            <li>My Groups' Meetups</li>
          </ul>
        </div>
      </fieldset>
    </form>`
  );
}

$(renderMap);
