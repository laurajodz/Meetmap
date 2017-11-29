var map;


function initMap() {
  var styles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444" //gray
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2" //light gray
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#07889B"  //blue
            },
            {
                "visibility": "on"
            }
        ]
    }
]

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.0902, lng: -95.7129},
    zoom: 4,
    styles: styles,
    mapTypeControl: false
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // var circle = new google.maps.Circle({
      //         center: geolocation,
      //         radius: position.coords.accuracy
      //       });
      //       autocomplete.setBounds(circle.getBounds());
      map.setCenter(pos);
      map.setZoom(13);
    })
  }
}


function searchButtonHandler(e){

  //0. clear any existing markers from a previous search

  //1. get all inputs
  const radius = $('input[name="rad"]:checked').val();
  console.log('Radius: ', radius);

  const category = $('input[name="cat"]:checked').val();
  //const categories = categoriesChecked.map((index, target) => target.value).toArray();
  console.log('Categories: ', category);

  const key = $('#keyword').val();
  console.log('Keywords: ', key);

  let fromdate = $('#from').datepicker("getDate");
  fromdate = $.datepicker.formatDate("yy-mm-ddT00:00:00", fromdate);
  let todate = $('#to').datepicker("getDate");
  todate = $.datepicker.formatDate("yy-mm-ddT23:59:59", todate);
  console.log('Date Range: ', fromdate, todate);

  const membership = $('input[name="member"]:checked').val();
  console.log('Membership Status: ', membership);


  //2. make the call to Meetup
  const q = {
    key: "524472e125072465129556564d2f74",
    radius: radius,
    fields: 'group_topics',
    topic_category: category,
    text: key,
    start_date_range: fromdate,
    end_date_range: todate,
    self_groups: membership,
    callback:"handlerequest"
  }

  $.ajax({
    url:'https://api.meetup.com/find/upcoming_events',
    method:'GET',
    data: q,
    dataType:"jsonp",
    crossDomain:true
  }).done(res => {
    displayResults(res.data);
  })
}


function displayResults(data){
  console.log('data:', data);
  locations = data.events.map(function(ev){
    return {
      title: ev.name,
      group: ev.group.name,
      location: {
        lat: ev.group.lat,
        lng: ev.group.lon
      },
      url: ev.link
    }
  });
  console.log('locations:', locations);
  showMarkers(locations);
}


//3. display markers
function showMarkers(locations) {
  var pinColor = "E37222";
  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);
  var infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++) {
    // Get the position, title, group, and url from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    var group = locations[i].group;
    var url = locations[i].url;
    // Create a marker per location
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      group: group,
      url: url,
      icon: pinImage,
      animation: google.maps.Animation.DROP,
      id: i
    });
    console.log(title);
    bounds.extend(marker.position);
    //Create an onclick event to open an infowindow at each marker and
    //populate the infowindow when the marker is clicked. We'll only allow
    //one infowindow which will open at the marker that is clicked, and
    //populate based on that markers position.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent('<a href="' + locations[i].url + '" target="_blank">'
        + locations[i].title + '</a><p>' + locations[i].group + '</p>');
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
  // Extend the boundaries of the map
  map.fitBounds(bounds);
}


function getCategories() {
  $.ajax({
    url:'https://api.meetup.com/find/topic_categories',
    method:'GET',
    dataType:"jsonp",
    crossDomain:true
  }).done(res => {
    displayCategories(res.data);
  })
}

function displayCategories(data) {
  const results = data.map((index) => renderResult(index));
  $('.categories').html(results);
}

function renderResult(result) {
  return `<div>
    <input type="radio" id=${result.id} value=${result.id} name="cat">
    <label for=${result.id}>${result.name}</label>
  </div>`;
}


//location handler
function initAutocomplete() {

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
          bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}


$(function(){
  //runs once when the page loads
  initMap();
  getCategories();
  initAutocomplete();

  // where you set all your event handlers

  //form handler
  $('#params').submit(function(e){
    e.preventDefault();
  });

  // event handler for the Button
  $('#btn').click(searchButtonHandler);

  //event handler for the dates
  var dateFormat = "yy-mm-dd",
  from = $( "#from" ).datepicker({
      minDate: 0,
      defaultDate: new Date(),
      showOtherMonths: true,
      selectOtherMonths: true
    })
    .on( "change", function() {
    to.datepicker( "option", "minDate", getDate( this ) );
    }),
  to = $( "#to" ).datepicker({
      minDate: 0,
      defaultDate: 7,
      showOtherMonths: true,
      selectOtherMonths: true
    })
    .on( "change", function() {
    from.datepicker( "option", "maxDate", getDate( this ) );
    });
  getDate();

  $( "#from" ).datepicker( "setDate", +1);
  $( "#to" ).datepicker( "setDate", "+1w");

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }
    return date;
  }
});
