(function(w) {
  w.scriptLoader = {
    load(scripts) {
      this.scripts = scripts;
      this.loader = [];
      this.scripts.forEach(script => {
        this.loader.push(this.dropScript(script));
      });
      return Promise.all(this.loader);
    },

    dropScript(url) {
      return new Promise((resolve, reject) => {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        var loader = this;
        script.onload = () => resolve();
        script.src = url;
        head.appendChild(script);
      })
    }
  }
})(window);
