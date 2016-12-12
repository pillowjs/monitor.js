;(function() {

  function Timer(options) {
    var opts = options || {};
    opts.fps = opts.fps || 60;
    this.options = opts;
    this._queue = [];
    this._paused = false;
    this._now = null;
    this._fps = -1;
  }

  Timer.prototype.update = function(handle) {
    this._queue.push(handle.bind(this));
  };

  Timer.prototype.start = function() {
    var loop = function() {
      this._now = this._now || +new Date;
      var now = +new Date;

      if (now - this._now >= 1000) {
        this._now = now;
        this._fps = -1;
      }

      this._fps++;

      this._queue.forEach(function(handle) {
        handle();
      });

      requestAnimationFrame(loop.bind(this));
    };
    loop.call(this);
  };

  Timer.prototype.toggle = function() {
    this._paused = !this._paused;
  };

  var render = function() {
    var fps = this._fps;
    var context = this._context;
    var _imgData;
    setTimeout(function() {
      var textHeight = 8;
      var padding = 2;
      var paddingTop = textHeight + padding * 2;
      var height = (this.options.height - paddingTop) * fps / 60;
      context.globalAlpha = this.options.alpha;
      context.fillStyle = this.options.boardColor;
      context.clearRect(0, 0, this.options.width, this.options.height);
      context.fillRect(0, 0, this.options.width, this.options.height);
      context.font = padding + 'px';
      context.fillStyle = this.options.textColor;
      context.fillText('fps: ' + fps, padding, textHeight + padding);
      context.fillRect(this.options.width - 1, this.options.height - height, 1, height);
      this._imgData && context.putImageData(this._imgData, 0, paddingTop);
      this._imgData = context.getImageData(1, paddingTop, this.options.width - 1, this.options.height - paddingTop);
    }.bind(this), 16);
  };

  var create = function() {
    var pixelRatio = Math.floor(window.devicePixelRatio) || 1;
    var canvas = document.createElement('canvas');
    var width = this.options.width;
    var height = this.options.height;
    canvas.style.cssText = 'width:' + width + 'px;height:' + height + 'px;';
    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext('2d');

    var container = document.createElement('div');
    var styles = {
      position: 'fixed',
      top: 0,
      right: 0,
      cursor: 'pointer',
      'z-index': 999999
    };

    Object.assign(styles, this.options.containerStyles);

    Object.keys(styles).forEach(function(key) {
      container.style.cssText += key + ':' + styles[key];
    });

    container.addEventListener('click', function(e) {
      e.preventDefault();
    }, false);

    container.appendChild(canvas);
    this.options.container.appendChild(container);
    context.scale(2, 2);
    context.scale(0.5, 0.5);
    return context;
  };

  function FPSBoard(options) {
    var opts = options || {};
    opts.container = document.querySelector(opts.container) || document.body;
    opts.width = opts.width || 80;
    opts.height = opts.height || 48;
    opts.alpha = opts.alpha || 0.9;
    opts.boardColor = opts.boardColor || 'grey';
    opts.textColor = opts.textColor || 'red';
    opts.containerStyles = opts.containerStyles || {};
    this.options = opts;
    this._now = null;
    this._fps = 0;
    this._context = create.call(this);
    this._imgData = null;
  }

  FPSBoard.prototype.tick = function() {
    this._now = this._now || +new Date;
    var now = +new Date;

    if (now - this._now >= 1000) {
      render.call(this);
      this._now = now;
      this._fps = 0;
    }

    this._fps++;
  };

  function Monitor() {
  };

  Monitor.Timer = Timer;
  Monitor.FPSBoard = FPSBoard;
  window.Monitor = Monitor;
})();
