class Carousel {
  constructor(p) {

    const settings = { ...{ containerID: '#carousel', slideID: '.slide', interval: 4000, isPlaying: true }, ...p };

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  _initProps() {
    this.SLIDES_COUNT = this.slideItems.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fa-solid fa-circle-pause"></i>';
    this.FA_PLAY = '<i class="fa-solid fa-circle-play"></i>';
    this.FA_PREV = '<i class="fa-solid fa-angle-left"></i>'
    this.FA_NEXT = '<i class="fa-solid fa-angle-right"></i>'

    this.currentSlide = 0;
    this.timerID = null;
    this.startPosX = null;
    this.endPosX = null;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<div class="control control-pause" id="btn-pause">
                    ${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}
                    </div>`;
    const PREV = `<div class="control control-prev" id="btn-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div class="control control-next" id="btn-next">${this.FA_NEXT}</div>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#btn-pause');
    this.prevBtn = this.container.querySelector('#btn-prev');
    this.nextBtn = this.container.querySelector('#btn-next');
  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      let indicator = document.createElement('div');

      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }
    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.container.addEventListener('mouseenter', this.pause.bind(this));
    this.container.addEventListener('mouseleave', this.play.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _goToNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.indicators[this.currentSlide].classList.toggle('active');
    this.slideItems[this.currentSlide].classList.toggle('active');
  }

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this.pause();
      this._goToNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  }

  pause() {
    if (this.isPlaying) {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  }

  play() {
    if (!this.isPlaying) {
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this.isPlaying = true;
      this._tick();
    }
  }

  next() {
    this._goToNext();
    this.pause();
  }

  prev() {
    this._goToPrev();
    this.pause();
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}

export default Carousel;