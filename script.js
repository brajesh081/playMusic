//Initialize the variables

let songId = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let musicGif = document.getElementById('playingGif');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const currentSong = document.getElementById('currentSong');
const songItemContainer = document.querySelector('.song-item-container');

let songs = [
    { name: 'Warriyo - Mortals (feat. Laura Brem) [NCS Release]', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
    { name: 'Cielo - Huma-Huma', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
    { name: 'DEAF KEV - Invicible', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
    { name: 'Diffrent Heaven - My Heart [NCS Release]', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
    { name: 'Janji Heroes', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
    { name: 'Let me care', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
];

songs.forEach((song, index) => {
    const songItem = `
        <div class="song-item">
          <img src="./covers/${index + 1}.jpg" alt="cover image ${index + 1}">
          <span class="song-name">${songs[index].name}</span>
          <span class="song-list-play">
            <span class="time-stamp">05: 34
              <i id=${index + 1} class="far fa-play-circle"></i>
            </span>
          </span>
        </div>
    `
    songItemContainer.insertAdjacentHTML('beforeend', songItem);
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playAudio(songId);
        startPlaying(masterPlay);
    } else {
        audioElement.pause();
        stopPlaying(masterPlay);
    }
});

//events
audioElement.addEventListener('timeupdate', () => {
    //update seek bar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;

    //stop playing if song is completed
    if(progress === 100) {
      stopPlaying(masterPlay);
      const currentSongButton = document.getElementById(songId);
      stopPlaying(currentSongButton);
    }
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = ((progressBar.value / 100) * audioElement.duration);
});

//event listener for handling click on next song play button
next.addEventListener('click', () => {
  if(songId >= 6) {
    songId = 1;
  } else {
    songId += 1;
  }
  playAudio(songId);
  startPlaying(masterPlay);
});

//event listener for handling click on previous song play button
previous.addEventListener('click', () => {
  if(songId <= 1) {
    songId = 6;
  } else {
    songId -= 1;
  }
  playAudio(songId);
  startPlaying(masterPlay);
});

songItemContainer.addEventListener('click', (event) => {
    const playButton = event.target.closest('.fa-play-circle');
    if (playButton) {
        songId = playButton.id;
        playAudio(songId);

        markAllSongsPause();

        startPlaying(playButton);
        startPlaying(masterPlay);
    }
});

function startPlaying(element) {
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    musicGif.style.opacity = 1;
}

function stopPlaying(element) {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
    musicGif.style.opacity = 0;
}

function markAllSongsPause() {
    [...songItemContainer.getElementsByClassName('fa-pause-circle')].forEach((item) => {
        item.classList.remove('fa-pause-circle');
        item.classList.add('fa-play-circle');
    });
}

function playAudio(songId) {
  currentSong.innerText = songs[songId - 1].name;
  audioElement.src = `songs/${songId}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  markAllSongsPause();

  const currentSongButton = document.getElementById(songId);
  startPlaying(currentSongButton);
}