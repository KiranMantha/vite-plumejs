import { Component, ComponentRef, html, IHooks, Renderer } from '@plumejs/core';
import { Router } from '@plumejs/router';
import {
  IModal,
  IToggleInput,
  ModalService,
  NotificationService,
  NotificationType,
  ToggleComponent,
  IDropdownOptions,
  IOption,
  DropdownComponent,
  registerUIDropdown,
} from '@plumejs/ui';
import { NestedModal } from './nested-modal.component';

registerUIDropdown();

@Component({
  selector: 'plume-comp',
})
class PlumeComponents implements IHooks {
  constructor(
    private router: Router,
    private modalsrvc: ModalService,
    private notifySrvc: NotificationService
  ) {}

  toggleInput: IToggleInput = {
    onText: 'ON',
    offText: 'OFF',
  };

  toggleProps: IToggleInput = {
    onText: '',
    offText: '',
  };

  enableMultiselect(_checked: boolean) {
    this.dropdownOptions.multiple = _checked;
    this.dropdownOptions.resetDropdown = true;
    this.dropdownRef.setProps({
      dropdownOptions: this.dropdownOptions,
    });
  }

  disableDropdown(checked: boolean) {
    this.dropdownOptions.disable = checked;
    this.dropdownOptions.resetDropdown = true;
    this.dropdownRef.setProps({
      dropdownOptions: this.dropdownOptions,
    });
  }

  enableFilter(checked: boolean) {
    this.dropdownOptions.enableFilter = checked;
    this.dropdownOptions.resetDropdown = true;
    this.dropdownRef.setProps({
      dropdownOptions: this.dropdownOptions,
    });
  }

  dropdownOptions: IDropdownOptions<string> = {
    options: [
      {
        label: 'Option 1',
        value: 'o1',
      },
      {
        label: 'Option 2',
        value: 'o2',
      },
      {
        label: 'Option 3',
        value: 'o3',
      },
      {
        label: 'Option 4',
        value: 'o4',
      },
    ],
    multiple: false,
    buttonText: (options: IOption<string>[]) => {
      if (options.length === 0) {
        return 'None selected';
      } else if (options.length > 3) {
        return options.length + ' selected';
      } else {
        return options.map((i) => i.label).join(', ');
      }
    },
  };

  nestedModalRef: ComponentRef<NestedModal>;
  sampleToggleRef: ComponentRef<ToggleComponent>;
  enableDropdownRef: ComponentRef<ToggleComponent>;
  disableDropdownRef: ComponentRef<ToggleComponent>;
  enableFilterRef: ComponentRef<ToggleComponent>;
  dropdownRef: ComponentRef<DropdownComponent<string>>;

  mount() {
    console.log(this.router.getCurrentRoute());
    this.sampleToggleRef.setProps({
      toggleOptions: this.toggleInput,
    });

    this.enableDropdownRef.setProps({
      toggleOptions: { ...this.toggleProps },
    });

    this.disableDropdownRef.setProps({
      toggleOptions: { ...this.toggleProps },
    });

    this.enableFilterRef.setProps({
      toggleOptions: { ...this.toggleProps },
    });

    this.dropdownRef.setProps({
      dropdownOptions: this.dropdownOptions,
    });
  }

  openModal() {
    const modal: IModal = this.modalsrvc.show({
      renderTemplate: () =>
        html`<nested-modal
          ref=${(node) => {
            this.nestedModalRef = node;
          }}
        ></nested-modal>`,
      modalTitle: 'testing modal',
      modalClass: 'sample-class',
    });

    modal.onOpen.subscribe(() => {
      console.log('main modal open', modal.Id);
      this.nestedModalRef.setProps({
        nestedModalData: { message: 'Hello World' },
      });
    });

    modal.onClose.subscribe(() => {
      console.log('main modal closed');
    });
  }

  notify() {
    this.notifySrvc.sendMessage('hello world', NotificationType.Info);
  }

  notifyWithAutoHide() {
    this.notifySrvc.sendMessage('hello world', NotificationType.Info, true);
  }

  onToggleChange(_checked: boolean) {
    console.log(_checked);
  }

  render() {
    return html`
      <div>
        <h2 class="title is-3 mb-20">Plumejs UI Control Collection</h2>
        <div class="mb-20">
          <h5 class="title is-5">Modal</h5>
          <button
            class="button is-small is-info"
            onclick=${() => {
              this.openModal();
            }}
          >
            Open Modal
          </button>
        </div>
        <div class="mb-20">
          <h5 class="title is-5">Notification</h5>
          <button
            class="button is-small is-info mr-10"
            onclick=${() => {
              this.notify();
            }}
          >
            Notify with action
          </button>
          <button
            class="button is-small is-info"
            onclick=${() => {
              this.notifyWithAutoHide();
            }}
          >
            Notify with auto hide
          </button>
        </div>
        <div class="mb-20">
          <h5 class="title is-5">Toggle Button</h5>
          <ui-toggle-button
            ref=${(node) => {
              this.sampleToggleRef = node;
            }}
            ontogglechange=${(event) => {
              this.onToggleChange(event.detail);
            }}
          ></ui-toggle-button>
        </div>
        <div class="mb-20">
          <h5 class="title is-5">Multi select</h5>
          <div>
            <div class="is-flex mb-20">
              <span>enable multi select</span>
              <ui-toggle-button
                ref=${(node) => {
                  this.enableDropdownRef = node;
                }}
                ontogglechange=${(event) => {
                  this.enableMultiselect(event.detail);
                }}
              ></ui-toggle-button>
            </div>
            <div class="is-flex mb-20">
              <span>disable dropdown</span>
              <ui-toggle-button
                ref=${(node) => {
                  this.disableDropdownRef = node;
                }}
                ontogglechange=${(event) => {
                  this.disableDropdown(event.detail);
                }}
              ></ui-toggle-button>
            </div>
            <div class="is-flex mb-20">
              <span>enable filtering</span>
              <ui-toggle-button
                ref=${(node) => {
                  this.enableFilterRef = node;
                }}
                ontogglechange=${(event) => {
                  this.enableFilter(event.detail);
                }}
              ></ui-toggle-button>
            </div>
          </div>
          <div class="is-flex">
            <ui-dropdown
              ref=${(node) => {
                this.dropdownRef = node;
              }}
              onoptionselected=${(event) => {
                console.log(event.detail);
              }}
            ></ui-dropdown>
          </div>
        </div>
      </div>
    `;
  }
}
