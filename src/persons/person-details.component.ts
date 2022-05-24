import { Component, html, IHooks } from '@plumejs/core';

@Component({
    selector: "person-details"
})
export class PersonDetails implements IHooks {
    readonly ObservedProperties = <const>['userDetails'];
    userDetails: { name: string; company: { name: string } };

    render() {
        if (this.userDetails && this.userDetails.name) {
            return html`
				<strong>Person Details</strong>
				<div>Name: ${this.userDetails.name}</div>
				<div>Company: ${this.userDetails.company.name}</div>
			`;
        } else {
            return html`<div></div>`;
        }
    }
}