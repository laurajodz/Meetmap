const MEETUP_SEARCH_URL = "https://api.meetup.com/find/upcoming_events/?key=524472e125072465129556564d2f74";

function renderMap() {
  $('.container').html(
    `<div id="map">
    </div>`
  );
initMap();
getDataFromApi();
}

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.0902, lng: -95.7129},
    zoom: 4
  });
  infoWindow = new google.maps.InfoWindow;
  renderAdjustParams();

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

function getDataFromApi() {
  console.log("Hi");
  const query = {
    //set inital display terms:
    //date is today
    // start_date_range:
    // end_date_range:
    radius: 5
  }
  $.getJSON(MEETUP_SEARCH_URL, query);
  console.log(query);
}

function renderAdjustParams() {
  $('.container').append(
    `<form action="" method="" class="adjust-params" id="js-adjust-params">
      <fieldset role="group">
        <legend>Change Location</legend>
        <div class="location">
          <label for="js-location-id">Enter Zip Code or City</label><input type="text" class="js-loc" id="js-location-id" value="" name="js-location"></input
        </div>
        <div class="radius">
          <button class="dropbtn">Radius</button>
          <div id="radius-dropdown" class="dropdown-content">
            <p>2 miles</p>
            <p>5 miles</p>
            <p>10 miles</p>
            <p>25 miles</p>
            <p>50 miles</p>
            <p>100 miles</p>
          </div>
        </div>
      </fieldset>
      <fieldset role="group">
        <legend>Change Categories</legend>
        <div class="categories">
          <div>
            <input type="checkbox" id="js-cat-all" value="All Meetups" name="cat">
            <label for="js-cat-all">All Meetups</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-arts" value="Arts" name="cat">
            <label for="js-cat-arts">Arts</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-beliefs" value="Beliefs" name="cat">
            <label for="js-cat-beliefs">Beliefs</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-book" value="Book Clubs" name="cat">
            <label for="js-cat-book">Book Clubs</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-career" value="Career & Business" name="cat">
            <label for="js-cat-career">Career & Business</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-dance" value="Dance" name="cat">
            <label for="js-cat-dance">Dance</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-family" value="Family" name="cat">
            <label for="js-cat-family">Family</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-fashion" value="Fashion & Beauty" name="cat">
            <label for="js-cat-fashion">Fashion & Beauty</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-film" value="Film" name="cat">
            <label for="js-cat-film">Film</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-food" value="Food & Drinks" name="cat">
            <label for="js-cat-food">Food & Drinks</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-health" value="Health & Wellness" name="cat">
            <label for="js-cat-health">Health & Wellness</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-hobbies" value="Hobbies & Crafts" name="cat">
            <label for="js-cat-hobbies">Hobbies & Crafts</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-lgbtq" value="LGBTQ" name="cat">
            <label for="js-cat-lgbtq">LGBTQ</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-language" value="Language & Culture" name="cat">
            <label for="js-cat-language">Language & Culture</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-learning" value="Learning" name="cat">
            <label for="js-cat-learning">Learning</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-movements" value="Movements" name="cat">
            <label for="js-cat-movements">Movements</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-music" value="Music" name="cat">
            <label for="js-cat-music">Music</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-outdoors" value="Outdoors & Adventure" name="cat">
            <label for="js-cat-outdoors">Outdoors & Adventure</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-pets" value="Pets" name="cat">
            <label for="js-cat-pets">Pets</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-photography" value="Photography" name="cat">
            <label for="js-cat-photography">Photography</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-scifi" value="Sci-Fi & Games" name="cat">
            <label for="js-cat-scifi">Sci-Fi & Games</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-social" value="Social" name="cat">
            <label for="js-cat-social">Social</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-sports" value="Sports & Fitness" name="cat">
            <label for="js-cat-sports">Sports & Fitness</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-tech" value="Tech" name="cat">
            <label for="js-cat-tech">Tech</label>
          </div>
          <div>
            <input type="checkbox" id="js-cat-writing" value="Writing" name="cat">
            <label for="js-cat-writing">Writing</label>
          </div>
          <div class="keyword">
            <label for="js-key">Enter Keyword(s)</label>
            <input type="text" id="js-keyword" value="" name="key">
          </div>
        </div>
      </fieldset>
      <fieldset role="group">
        <legend>Change Date Range</legend>
        <div class="date-range">
          <button class="dropbtn">Date Range</button>
          <div id="date-range-dropdown" class="dropdown-content"
            <ul class="dropdown-date-range">
              <li>Today</li>
              <li>Next three days</li>
              <li>This week</li>
              <li>Next week</li>
              <li>This month</li>
            </ul>
          </div>
        </div>
      </fieldset>
      <fieldset role="group">
        <legend>Change Membership Status</legend>
        <div class="membership">
          <button class="dropbtn">Membership</button>
          <div id="membership-dropdown" class="dropdown-content"
            <ul class="dropdown-membership">
              <li>All Meetups</li>
              <li>My Groups' Meetups</li>
            </ul>
          </div>
        </div>
      </fieldset>
    </form>`
  );
}


// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// function setRadius() {
//     document.getElementById("radius-dropdown").classList.toggle("show");
// }
//
// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

$(renderMap);
