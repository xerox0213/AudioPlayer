"use strict";
const music = [
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
const duration = document.querySelector('.duration');
const audio = document.querySelector('audio');
audio.addEventListener('loadedmetadata', () => (duration.textContent = secondsToMinutes(audio.duration)));
audio.addEventListener('ended', handleNext);
const currentTime = document.querySelector('.current-time');
const juice = document.querySelector('.juice');
audio.addEventListener('timeupdate', handleUpdateJuiceBar);
function handleUpdateJuiceBar() {
    currentTime.textContent = secondsToMinutes(audio.currentTime);
    juice.style.transform = `scaleX(${audio.currentTime / audio.duration})`;
}
function secondsToMinutes(value) {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60 < 10 ? `0${Math.floor(value % 60)}` : Math.floor(value % 60);
    return `${minutes}:${seconds}`;
}
const juiceBar = document.querySelector('.juice-bar');
juiceBar.addEventListener('click', handleOnClickJuiceBar);
function handleOnClickJuiceBar(e) {
    const offsetX = e.offsetX;
    const innerWidth = juiceBar.offsetWidth;
    const ratio = offsetX / innerWidth;
    juice.style.transform = `scaleX(${ratio})`;
    audio.currentTime = audio.duration * ratio;
    currentTime.textContent = secondsToMinutes(audio.currentTime);
}
const playPauseBtn = document.querySelector('.play-pause-btn');
playPauseBtn.addEventListener('click', handlePlayPause);
function handlePlayPause() {
    if (pause) {
        handlePlay();
        audio.play();
    }
    else {
        handlePause();
        audio.pause();
    }
}
function handlePlay() {
    const icon = playPauseBtn.firstElementChild;
    icon.setAttribute('name', 'pause');
    audio.play();
    pause = false;
}
function handlePause() {
    const icon = playPauseBtn.firstElementChild;
    icon.setAttribute('name', 'play');
    audio.pause();
    pause = true;
}
const cover = document.querySelector('.cover img');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);
function handleNext() {
    if (shuffle) {
        index = generateRandomIndex();
    }
    else {
        if (index === music.length - 1) {
            index = 0;
        }
        else {
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
    }
    else {
        if (index === 0) {
            index = music.length - 1;
        }
        else {
            index -= 1;
        }
    }
    displayData(index);
    resetAudio();
}
function displayData(index) {
    const { musicTitle, musicAuthor, pathAudio, pathCover } = music[index];
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
const shuffleBtn = document.querySelector('.shuffle-btn');
shuffleBtn.addEventListener('click', handleShuffle);
function handleShuffle() {
    if (shuffle) {
        shuffleBtn.classList.remove('active');
        shuffle = false;
    }
    else {
        shuffleBtn.classList.add('active');
        shuffle = true;
    }
}
