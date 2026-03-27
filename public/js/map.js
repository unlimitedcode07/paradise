document.addEventListener("DOMContentLoaded", () => {
    console.log("hi there");

    mapboxgl.accessToken = mapt;

    const map = new mapboxgl.Map({
        container: 'map',
        center: coordinates,
        zoom: 10
    });

    new mapboxgl.Marker({
        color: '#FF0000',
        scale: 1.5
    })
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML("<p>Exact Location provided after booking</p>"))
    .setLngLat(coordinates)
    .addTo(map);
});


