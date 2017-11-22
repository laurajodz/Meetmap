const MEETUP_SEARCH_URL = "https://api.meetup.com/find/upcoming_events/?key=524472e125072465129556564d2f74";

//var map, infoWindow;
var map;
var markers = [];
function initMap() {
  var styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
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
  //infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      //infoWindow.open(map);
      map.setCenter(pos);
      map.setZoom(13);
      // var marker = new google.maps.Marker({
      //   position: pos,
      //   map: map,
      //   title: 'You are here'
      // });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  showMarkers();
}

  // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  // infoWindow.setPosition(pos);
  // infoWindow.setContent(browserHasGeolocation ?
  //   'Error: The Geolocation service failed.' :
  //   'Error: Your browser doesn\'t support geolocation.');
  //   infoWindow.open(map);
  // }

var locations = [
    {title: 'Meetup 1', location: {lat: 34.0762, lng: -118.2637}},
    {title: 'Meetup 2', location: {lat: 34.0760, lng: -118.2637}},
    {title: 'Meetup 3', location: {lat: 34.0750, lng: -118.2600}},
    {title: 'Meetup 4', location: {lat: 34.0781, lng: -118.2605}},
    {title: 'Meetup 5', location: {lat: 34.0766, lng: -118.2637}},
    {title: 'Meetup 6', location: {lat: 34.0700, lng: -118.2600}}
  ];

function showMarkers() {
  $('#btn').click(event => {
    event.preventDefault();
    var largeInfowindow = new google.maps.InfoWindow();
    //var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
    // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers
      markers.push(marker);
    }
  });
  //openWindow();
}

// Create an onclick event to open an infowindow at each marker.
// function openWindow(marker) {
//   marker.addListener('click', function() {
//     populateInfoWindow(this, largeInfowindow);
//   });
//   //bounds.extend(markers[i].position);
// }

    // Extend the boundaries of the map for each marker
    //map.fitBounds(bounds);

    //This function populates the infowindow when the marker is clicked. We'll only allow
    //one infowindow which will open at the marker that is clicked, and populate based
    //on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}

// const queryTargetKeyword = $(event.currentTarget).find('#js-keyword');
// const queryKeyword = queryTarget.val();
// const queryTargetCategory = $(event.currentTarget).find('#js-keyword');
// const queryCategory = queryTarget.val();


function displayResults(data){
    data.events.forEach(ev => {
        $('.results').append(ev.description);
    });
}



$(function(){
    $('#btn').click(function(e){
        const q = {
            key: "524472e125072465129556564d2f74",
            description: `${keyword}`,
            
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
    });
})

// map.data.loadGeoJson('http://www.CORS-ENABLED-SITE.com/data.json');
