type Music = {
  musicTitle: string;
  musicAuthor: string;
  pathAudio: string;
  pathCover: string;
};

type ArrayOfMusic = Music[];

const music: ArrayOfMusic = [
  {
    musicTitle: 'Aurora',
    musicAuthor: 'SLUMB',
    pathAudio: '/data/music/Aurora.mp3',
    pathCover: '/data/cover/Aurora.png',
  },
  {
    musicTitle: 'Electric',
    musicAuthor: 'TEEMID',
    pathAudio: '/data/music/Electric-Feel.mp3',
    pathCover: '/data/cover/Electric-Feel.png',
  },
  {
    musicTitle: 'Lost Colours',
    musicAuthor: 'Fakear',
    pathAudio: '/data/music/Lost-Colours.mp3',
    pathCover: '/data/cover/Lost-Colours.png',
  },
  {
    musicTitle: 'Solar',
    musicAuthor: 'Betical',
    pathAudio: '/data/music/Solar.mp3',
    pathCover: '/data/cover/Solar.png',
  },
];

let index = 0;
let pause = true;
let shuffle = false;

const duration = document.querySelector('.duration') as HTMLSpanElement;
const audio = document.querySelector('audio') as HTMLAudioElement;
audio.addEventListener(
  'loadedmetadata',
  () => (duration.textContent = secondsToMinutes(audio.duration))
);
audio.addEventListener('ended', handleNext);

const currentTime = document.querySelector('.current-time') as HTMLSpanElement;
const juice = document.querySelector('.juice') as HTMLDivElement;
audio.addEventListener('timeupdate', handleUpdateJuiceBar);
function handleUpdateJuiceBar() {
  currentTime.textContent = secondsToMinutes(audio.currentTime);
  juice.style.transform = `scaleX(${audio.currentTime / audio.duration})`;
}
function secondsToMinutes(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60 < 10 ? `0${Math.floor(value % 60)}` : Math.floor(value % 60);
  return `${minutes}:${seconds}`;
}

const juiceBar = document.querySelector('.juice-bar') as HTMLDivElement;
juiceBar.addEventListener('click', handleOnClickJuiceBar);
function handleOnClickJuiceBar(e: MouseEvent) {
  const offsetX = e.offsetX;
  const innerWidth = juiceBar.offsetWidth;
  const ratio = offsetX / innerWidth;
  juice.style.transform = `scaleX(${ratio})`;
  audio.currentTime = audio.duration * ratio;
  currentTime.textContent = secondsToMinutes(audio.currentTime);
}

const playPauseBtn = document.querySelector('.play-pause-btn') as HTMLButtonElement;
playPauseBtn.addEventListener('click', handlePlayPause);

function handlePlayPause() {
  if (pause) {
    handlePlay();
    audio.play();
  } else {
    handlePause();
    audio.pause();
  }
}

function handlePlay() {
  const icon = playPauseBtn.firstElementChild as Element;
  icon.setAttribute('name', 'pause');
  audio.play();
  pause = false;
}

function handlePause() {
  const icon = playPauseBtn.firstElementChild as Element;
  icon.setAttribute('name', 'play');
  audio.pause();
  pause = true;
}

const cover = document.querySelector('.cover img') as HTMLImageElement;
const title = document.querySelector('.title') as HTMLHeadingElement;
const author = document.querySelector('.author') as HTMLHeadingElement;
const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

function handleNext() {
  if (shuffle) {
    index = generateRandomIndex();
  } else {
    if (index === music.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  }
  displayData(index);
  resetAudio();
}

function generateRandomIndex() {
  const min = Math.ceil(0);
  const max = Math.floor(music.length - 1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handlePrev() {
  if (shuffle) {
    index = generateRandomIndex();
  } else {
    if (index === 0) {
      index = music.length - 1;
    } else {
      index -= 1;
    }
  }
  displayData(index);
  resetAudio();
}

function displayData(index: number) {
  const { musicTitle, musicAuthor, pathAudio, pathCover }: Music = music[index];
  cover.src = pathCover;
  audio.src = pathAudio;
  title.textContent = musicTitle;
  author.textContent = musicAuthor;
}

function resetAudio() {
  currentTime.textContent = '0:00';
  juice.style.transform = 'scaleX(0)';
  if (pause) {
    handlePlay();
  }
  audio.play();
}

const shuffleBtn = document.querySelector('.shuffle-btn') as HTMLButtonElement;

shuffleBtn.addEventListener('click', handleShuffle);

function handleShuffle() {
  if (shuffle) {
    shuffleBtn.classList.remove('active');
    shuffle = false;
  } else {
    shuffleBtn.classList.add('active');
    shuffle = true;
  }
}
