class DannielReactive {
  constructor(options) {
    this.origin = options.data();

    // destination

    this.$data = new Proxy(this.origin, {
      // TODO: modifica los datos dentro de js
      get(target, name) {
        console.log("get", target, name);
        if (name in target) {
          return target[name];
        }
        console.warn(`Propiedad ${name} no existe`);
        return "";
      },
    });
  }

  mount() {
    document.querySelectorAll("*[dn-text]").forEach((element) => {
      this.dnText(element, this.$data, element.getAttribute("dn-text"));
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
