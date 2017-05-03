const defaultOptions = {
  sequential: true
}

export default {
  load(sources, options = defaultOptions) {
    this.sources = sources;
    this.hopper = [];
    if (!sources) return false;
    if (typeof sources === 'string') {
      this.hopper.push(loadString(sources));
    } else if (sources instanceof Array) {
      this.hopper.push(...loadArray(sources))
    } else if (sources instanceof Object) {
      this.hopper.push(...loadObject(sources))
    }
    return Promise.all(this.hopper);
  },
};


function dropScript(url, id) {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.onload = () => resolve();
    script.src = url;
    if (id) script.id = id;
    head.appendChild(script);
  });
}

function loadString(source) {
  return dropScript(source);
}

function loadArray(sources) {
  const promiseArray = [];
  sources.forEach(script => {
    promiseArray.push(dropScript(script));
  });
  return promiseArray;
}

function loadObject(sources) {
  const promiseArray = [];
  for (let key in sources) {
    let script = sources[key];
    promiseArray.push(dropScript(script, key));
  }
  return promiseArray;
}
