import { Component, html, IHooks } from "@plumejs/core";
import { ModalService } from '@plumejs/ui';

@Component({
	selector: "nested-modal"
})
export class NestedModal implements IHooks {
	readonly ObservedProperties = <const>['nestedModalData'];
	nestedModalData: { message: string };

	constructor(private modalsrvc: ModalService) { }

	openAnotherModal() {
		const modal = this.modalsrvc.show({
			renderTemplate: () => html`<div>i'm nested modal</div>`,
			modalTitle: "nested modal",
			modalClass: "nested-class"
		});

		modal.onOpen.subscribe(() => {
			console.log("nested modal open");
		});

		modal.onClose.subscribe(() => {
			console.log("nested modal closed");
		});
	}

	render() {
		if (this.nestedModalData) {
			return html`
				<div>sample modal</div>
				<div>${this.nestedModalData.message}</div>
				<button
					class="button is-small is-info"
					onclick=${() => {
					this.openAnotherModal();
				}}
				>
					open another modal
				</button>
			`;
		} else {
			return html``;
		}
	}
}