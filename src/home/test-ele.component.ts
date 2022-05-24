import { Component, html, IHooks, Renderer } from '@plumejs/core';

@Component({
    selector: "test-ele"
})
export class TestEle implements IHooks {
    readonly ObservedProperties = <const>['testprops'];
    testprops: { name: string };

    constructor(private renderer: Renderer) { }

    render() {
        if (this.testprops) {
            return html`
				<div>
					testing web component2 ${this.testprops.name}
					<button class='button is-small is-info' onclick=${(e: any) => this.counts(e)}>hi</button>
					<input
						value=${this.testprops.name}
						oninput=${(e: any) => this.change(e.target.value)}
					/>
					<slot>testing slots</slot>
				</div>
			`;
        } else {
            return html``;
        }
    }

    counts(e: any) {
        this.renderer.emitEvent('count', "testing from click")
    }

    change(val: string) {
        this.renderer.emitEvent('count', val);
    }

    mount() {
        console.log("component loaded");
        console.log("props: ", this.testprops);
    }

    unmount() {
        console.log("component unloaded");
    }
}