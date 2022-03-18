class sharingButton extends HTMLElement {
  constructor() {
    super();

    if (!navigator.share) {
      console.warn("msme-sharing-button: native sharing not supported.");
      return;
    }

    if (!this.getAttribute("data-sharing-url")) {
      console.error("msme-sharing-button: no url provided.");
      return;
    }

    // Android uses a different icon for sharing buttons
    // from devices in Apples ecosystem
    // Thanks to: https://davidwalsh.name/detect-android
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf("android") > -1;
    let icon = null;
    if (isAndroid) {
      icon = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
    } else {
      icon = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`;
    }

    let text = this.getAttribute("data-buttontext") ?? "share";
    let cssClass = this.getAttribute("data-buttonclass")
      ? `class="${this.getAttribute("data-buttonclass")}"`
      : "";

    let template = document.createElement("template");
    template.innerHTML = `<button type="button" ${cssClass}>${icon} ${text}</button>`;

    this._contents = new DocumentFragment();
    this._contents.appendChild(template.content.cloneNode(true));
    this.appendChild(this._contents);

    // and here's the sharing-action
    let button = this._contents.querySelector("button");
    button.addEventListener("click", () => {
      const shareData = {
        title: this.getAttribute("data-sharing-title"),
        text: this.getAttribute("data-sharing-text"),
        url: this.getAttribute("data-sharing-url")
      };

      navigator
        .share(shareData)
        .then(() => console.log("msme-sharing-button: sharing successful"))
        .catch((error) =>
          console.log("msme-sharing-button: error while sharing", error)
        );
    });
  }
}

customElements.define("msme-sharing-button", sharingButton);
