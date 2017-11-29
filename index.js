var map;

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

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      map.setZoom(13);
    })
  }
}


function searchButtonHandler(e){

  //1. get all inputs
  const city = $('#location-id').val();
  console.log('City: ', city);

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
    // city: city,
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
  var infowindow = new google.maps.InfoWindow();
  //var bounds = new google.maps.LatLngBounds();
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
      animation: google.maps.Animation.DROP,
      id: i
    });
    console.log(title);
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
}

  //bounds.extend(markers[i].position);
    // Extend the boundaries of the map for each marker
    //map.fitBounds(bounds);

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

$(function(){
  //runs once when the page loads
  initMap();
  getCategories();

  //clear any existing markers from previous search


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
      defaultDate: new Date(),
      showOtherMonths: true,
      selectOtherMonths: true
    })
    .on( "change", function() {
    to.datepicker( "option", "minDate", getDate( this ) );
    }),
  to = $( "#to" ).datepicker({
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
