class DannielReactive {
  constructor(options) {
    this.origin = options.data();

    // destination

    this.$data = new Proxy(this.origin, {
      // TODO: modifica los datos dentro de js
      get(target, name) {
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name);
        }
        console.warn(`Propiedad ${name} no existe`);
        return "";
      },
      set(target, name, value) {
        console.log("set", target, name, value);
        Reflect.set(target, name, value);
      },
    });
  }

  mount() {
    document.querySelectorAll("*[dn-text]").forEach((element) => {
      this.dnText(element, this.$data, element.getAttribute("dn-text"));
    });

    document.querySelectorAll("*[dn-model]").forEach((element) => {
      const name = element.getAttribute("dn-model");
      this.dnModel(element, this.$data, name);
      element.addEventListener("input", () => {
        Reflect.set(this.$data, name, element.value);
      });
    });
  }

  dnText(el, target, name) {
    el.innerText = Reflect.get(target, name);
  }

  dnModel(el, target, name) {
    el.value = target[name];
  }
}

var Danniel = {
  createApp(options) {
    return new DannielReactive(options);
  },
};
