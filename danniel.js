class DannielReactive {
  constructor(options) {
    this.origin = options.data();
  }

  mount() {
    document.querySelectorAll("*[dn-text]").forEach((element) => {
      this.dnText(element, this.origin, element.getAttribute("dn-text"));
    });
  }

  dnText(el, target, name) {
    el.innerText = target[name];
  }

  dnModel() {}
}

var Danniel = {
  createApp(options) {
    return new DannielReactive(options);
  },
};
