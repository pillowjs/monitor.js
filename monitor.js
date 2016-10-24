;(function() {

  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;right:0;cursor:pointer;z-index:9999;opacity:0.9;';

  container.addEventListener('click', function(e) {
    e.preventDefault();
  }, false);

  function Board() {
    this.element = null;
    this.context = null;
    this.create();
  }

  Board.prototype.create = function() {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:80px;height:48px';
    canvas.width = 80;
    canvas.height = 48;
    var context = canvas.getContext('2d');
    context.globalAlpha = 0.9;
    context.fillRect(0, 0, 80, 48);
    context.fillStyle = 'rgba(128, 0, 255, 1)';
    this.element = canvas;
    this.context = context;
  };

  Board.prototype.update = function() {
    this.context.fillStyle = 'rgba(255, 0, 255, 1)';
    this.context.fillRect(0, 0, 30, 48);
  };

  var fpsBoard = new Board();

  container.appendChild(fpsBoard.element);

  function loop() {
    fpsBoard.update();
    requestAnimationFrame(loop);
  }

  function Monitor() {
  }

  Monitor.init = function(options) {
    this.options = options || {};
    loop();
    var _container = this.options.container || document.body;
    _container.appendChild(container);
  };

  window.Monitor = Monitor;
})();
