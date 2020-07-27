'use strict';

const Monitor = require('./monitor');

const KB = 1024;
const MB = KB * KB;

const { Timer, FPSBoard, MemoryStats } = Monitor;

const fpsBoard_1 = new FPSBoard({
  containerStyles: {
    left: 0
  }
});

const fpsBoard_2 = new FPSBoard({
  container: '#test_container',
  width: 100,
  height: 60,
  boardColor: '#222',
  textColor: '#d2ff1d',
  containerStyles: {
    position: 'absolute'
  }
});

const timer_1 = new Timer();
timer_1.update(function() {
  fpsBoard_1.tick();
});

timer_1.start();

const timer_2 = new Timer({
  fps: 10
});
timer_2.update(function() {
  fpsBoard_2.tick();
});

timer_2.start();

const stats = new MemoryStats({
  containerWidth: 120
});

stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.querySelector('#test_memory').appendChild(stats.domElement);

requestAnimationFrame(function rAFloop() {
  stats.update();
  requestAnimationFrame(rAFloop);
});
