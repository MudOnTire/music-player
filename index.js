const container = document.querySelector('.container');
const playBtn = document.querySelector('#play');
const playIcon = playBtn && playBtn.querySelector('i.fas');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progressBox = document.querySelector('.progress-box');
const progressBar = document.querySelector('.progress');
const title = document.querySelector('#title');
const thumbnail = document.querySelector('#thumbnail');

// song titles
const songs = ['hey', 'summer', 'ukulele'];

// keep track of songs
let songIndex = 2;

// initially load song info DOM
loadSong();

// update song details
function loadSong() {
  const song = songs[songIndex];
  title.innerText = song;
  audio.src = `./mp3/${song}.mp3`;
  thumbnail.src = `./img/${song}.jpg`;
}

function playSong() {
  container.classList.add('play');
  playIcon.classList.remove('fa-play');
  playIcon.classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  container.classList.remove('play');
  playIcon.classList.add('fa-play');
  playIcon.classList.remove('fa-pause');
  audio.pause();
}

function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong();
  playSong();
}

function nextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong();
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progress = Math.round(currentTime / duration * 100);
  progressBar.style.width = `${progress}%`;
}

function setProgress(e) {
  const { offsetX } = e;
  const { clientWidth } = e.target;
  const { duration } = audio;
  audio.currentTime = offsetX / clientWidth * duration;
}

// play
playBtn.addEventListener('click', () => {
  const isPlaying = container.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressBox.addEventListener('click', setProgress);