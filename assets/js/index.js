import SwipeCarousel from './carousel-swipe.js'

const slider = new SwipeCarousel({
  containerID: '#carousel',
  slideID: '.item',
  interval: 2000,
  isPlaying: true
});

slider.init();
