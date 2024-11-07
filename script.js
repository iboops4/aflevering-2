function Album(artist, album, totalTracks, trackList) {
    this.artist = artist;
    this.album = album;
    this.totalTracks = totalTracks;
    this.trackList = trackList;
}

function addDivWithAlbum(album) {
    const parentElement = document.getElementById('albumContainer');
    
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('album');
//hej
    const albumInfo = document.createElement('p');
    albumInfo.textContent = `${album.artist}: ${album.album} | Album contains ${album.totalTracks} tracks`;

    const button = document.createElement('button');
    button.textContent = 'Show Tracklist';
    
    button.onclick = function () {
      toggleTracklist(album, albumDiv, button);
    };

    albumDiv.appendChild(albumInfo);
    albumDiv.appendChild(button);

    albumDiv.setAttribute('data-album', album.album);

    parentElement.appendChild(albumDiv);
}

function toggleTracklist(album, albumDiv, button) {
    const existingList = albumDiv.querySelector('ul');
    if (existingList) {
        albumDiv.removeChild(existingList);
        button.textContent = 'Show Tracklist';
    } else {
        const trackListContainer = document.createElement('ul');
        
        album.trackList.forEach(track => {
            const listItem = document.createElement('li');
            listItem.textContent = `Track ${track.trackNumber}: ${track.trackTitle} (${formatTime(track.trackTimeInSeconds)})`;
            trackListContainer.appendChild(listItem);
        });

        albumDiv.appendChild(trackListContainer);
        button.textContent = 'Hide Tracklist';
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

fetchContent("albums.json").then((albums) => {
    const albumObjects = albums.map(album => new Album(
      album.artistName,
      album.albumName,
      album.trackList.length,
      album.trackList
    ));

    albumObjects.forEach(album => addDivWithAlbum(album));
});

async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}
