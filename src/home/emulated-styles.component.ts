import { Component, html } from "@plumejs/core";

@Component({
  selector: 'emulated-styles',
  styles: `
    :host(.color-1) { color: green; }
    :host(.color-2) { color: blue; }
    :host(.color-3) { color: red; }
  `
})
class EmulatedStylesComp {
  constructor() { }
  render() {
    return html`<p>my styles are emulated</p>`;
  }
}