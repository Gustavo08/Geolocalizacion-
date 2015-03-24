var map;
var geocoder;
var lat;
var lng;
var l = 18.528837799999998;
var lo = -88.2783345;
var prueba;

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errores, {timeout:5000});
    } else{
      alert("Tu navegador no soporta o no tiene habilitada la Geolocalización");
    }

function successFunction(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    document.getElementById("coordenadas").value = "Latitud : " + " " +  lat + " " + " Longitud : " +  " " + lng;
    alert("Latitud : " + lat + " " + "Longitud : " + lng)

    map.setCenter(new GLatLng( lat, lng), 15);
    map.openInfoWindow(map.getCenter(),
    document.createTextNode("Hola, tú ubicación es esta"));
}

function errores(error){
  if (error.TIMEOUT){
    alert("Se acabo el tiempo de espera");
  }else if (error.PERMISSION_DENIED){
    alert("Permiso denegado");
  }
}

    function initialize() {
      map = new GMap2(document.getElementById("map_canvas"));
      map.setCenter(new GLatLng( 18.500189,-88.296146), 15);
      map.openInfoWindow(map.getCenter(),
      document.createTextNode("Punto de ubicación de prueba"));
      document.getElementById("map_canvas").disabled = true;      
      map.addControl(new GSmallMapControl());
      map.addControl(new GMapTypeControl());
      
      geocoder = new GClientGeocoder();
    }

    function addAddressToMap(response) {
      map.clearOverlays();
      if (!response || response.Status.code != 200) {
        alert("Lo sentimos, no se ha encontrado su dirección");
      } else {
        place = response.Placemark[0];
        point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
        map.setCenter(point, 15);
        
        marker = new GMarker(point, {draggable: true});
        
        GEvent.addListener(marker, function() {
          map.closeInfoWindow();
        });

        GEvent.addListener(marker, function() {
          document.getElementById("punto").value = marker.getLatLng().toUrlValue();
          marker.openInfoWindowHtml(place.address);
          generateKML(place.address, marker.getLatLng().lng(), marker.getLatLng().lat());
        });
        
        map.addOverlay(marker);
        marker.openInfoWindowHtml(place.address);
        document.getElementById("punto").value = marker.getLatLng().toUrlValue();
        
        obtenerDireccion(place.address, place.Point.coordinates[0], place.Point.coordinates[1]);
          
          var coor = document.getElementById("coordenadas").value = "";

      }
    }

    function showLocation() {
      lista = document.tipoTexto.fuente
         elegido = lista.selectedIndex
         opcion = lista.options[elegido]
         fuente = opcion.value
         address = opcion.text
      geocoder.getLocations(address, addAddressToMap);
    }
    
    function obtenerDireccion(description, lng, lat){
      //prueba = description;
      document.getElementById("direccion").value = description;
      //alert(prueba);
    }
    
