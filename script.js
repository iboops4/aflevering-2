// En funktion til at lave album-objekter
function Album(artist, album, totalTracks, trackList) {
    // Gemmer information om kunstner, albumnavn, antal sange og sangliste
    this.artist = artist;
    this.album = album;
    this.totalTracks = totalTracks;
    this.trackList = trackList;
}

// En funktion til at tilføje en div til siden der viser albummet
function addDivWithAlbum(album) {
    const parentElement = document.getElementById('albumContainer'); // Finder elementet hvor albummet skal placeres
    
    const albumDiv = document.createElement('div'); // Her opretter jeg en ny div for albummet
    albumDiv.classList.add('album'); // Her tilføjer en CSS-klasse til div'en

    const albumInfo = document.createElement('p'); // Laver et tekstafsnit med albuminfo
    albumInfo.textContent = `${album.artist}: ${album.album} | Album contains ${album.totalTracks} tracks`;

    const button = document.createElement('button'); // dette er knappen til at vise/skjule tracklisten
    button.textContent = 'Show Tracklist';
    
    // Når knappen trykkes, vises eller skjules sanglisten
    button.onclick = function () {
      toggleTracklist(album, albumDiv, button);
    };

    // Tilføjer info og knap til album-div'en
    albumDiv.appendChild(albumInfo);
    albumDiv.appendChild(button);

    albumDiv.setAttribute('data-album', album.album); // Gemmer albumnavnet som dataattribut

    parentElement.appendChild(albumDiv); // Tilføjer album-div'en til siden
}

// Funktion til at vise/skjule tracklisten for albummet
function toggleTracklist(album, albumDiv, button) {
    const existingList = albumDiv.querySelector('ul'); // Tjekker om tracklisten allerede er vist
    if (existingList) {
        albumDiv.removeChild(existingList); // Fjerner tracklisten hvis den allerede er der
        button.textContent = 'Show Tracklist'; // Opdaterer knapteksten
    } else {
        const trackListContainer = document.createElement('ul'); // Laver en liste til tracklisten
        
        // Tilføjer hver sang til listen
        album.trackList.forEach(track => {
            const listItem = document.createElement('li');
            listItem.textContent = `Track ${track.trackNumber}: ${track.trackTitle} (${formatTime(track.trackTimeInSeconds)})`;
            trackListContainer.appendChild(listItem);
        });

        albumDiv.appendChild(trackListContainer); // Tilføjer tracklisten til album-div'en
        button.textContent = 'Hide Tracklist'; // Opdaterer knapteksten
    }
}

// Her har jeg lavet en funktion til at formatere tid fra sekunder til minutter og sekunder
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Denne kode henter data fra JSON-filen og skaber album-objekter
fetchContent("albums.json").then((albums) => {
    const albumObjects = albums.map(album => new Album(
      album.artistName,
      album.albumName,
      album.trackList.length,
      album.trackList
    ));

    albumObjects.forEach(album => addDivWithAlbum(album)); // Tilføjer hvert album til siden
});

// Funktion til at hente JSON-data fra en fil
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json; // Returnerer JSON-data som et objekt
}
