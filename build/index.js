'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultOptions = {
  sequential: true
};

exports.default = {
  load: function load(sources) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

    this.sources = sources;
    this.hopper = [];
    if (!sources) return false;
    if (typeof sources === 'string') {
      this.hopper.push(loadString(sources));
    } else if (sources instanceof Array) {
      var _hopper;

      (_hopper = this.hopper).push.apply(_hopper, _toConsumableArray(loadArray(sources)));
    } else if (sources instanceof Object) {
      var _hopper2;

      (_hopper2 = this.hopper).push.apply(_hopper2, _toConsumableArray(loadObject(sources)));
    }
    return Promise.all(this.hopper);
  }
};


function dropScript(url, id) {
  return new Promise(function (resolve, reject) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.onload = function () {
      return resolve();
    };
    script.src = url;
    if (id) script.id = id;
    head.appendChild(script);
  });
}

function loadString(source) {
  return dropScript(source);
}

function loadArray(sources) {
  var promiseArray = [];
  sources.forEach(function (script) {
    promiseArray.push(dropScript(script));
  });
  return promiseArray;
}

function loadObject(sources) {
  var promiseArray = [];
  for (var key in sources) {
    var script = sources[key];
    promiseArray.push(dropScript(script, key));
  }
  return promiseArray;
}