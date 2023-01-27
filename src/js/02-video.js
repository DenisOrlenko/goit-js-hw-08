import throttle from 'lodash.throttle';
const STORAGE_KEY = "videoplayer-current-time"
// docs
// import Player from '@vimeo/player';
// const player = new Player(iframe);

// или

// docs
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// docs
player.on('timeupdate', throttle(onPlay, 1000));

function onPlay (data) {
	// создаю свойство seconds для обьекта data
  const dataCurrentTime = data.seconds;
	// помещаю в хранилище
  localStorage.setItem(STORAGE_KEY, dataCurrentTime);
};

// docs
player.getVideoTitle().then(function (title) {
	console.log('title:', title);
});

// docs
player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

