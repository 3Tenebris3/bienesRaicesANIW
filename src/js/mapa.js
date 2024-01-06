(function() {
    const lat = -0.16081928171631746;
    const lng = -78.46063417116348;
    const mapa = L.map('mapa').setView([lat, lng ], 20);
    let marker;

    //Utilizar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Selector Pin
    marker = new L.marker([lat,lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    //Detectar la posicion del pin
    marker.on('moveend', function(e){
        marker = e.target

        const posicion = marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        // Obtener la información de las calles al soltar el ping
        geocodeService.reverse().latlng(posicion, 20).run(function(error, resultado) {
            marker.bindPopup(resultado.address.LongLabel)

            //Lennar los campos
            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
            document.querySelector('#calle').value = resultado?.address?.Address ?? '';
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        })
    })

})()