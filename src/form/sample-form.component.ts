import {
  Component,
  ComponentRef,
  html,
  IHooks,
  Renderer,
  useFormFields,
} from '@plumejs/core';

import {
  IDropdownOptions,
  IOption,
  DropdownComponent,
  registerUIDropdown,
} from '@plumejs/ui';

registerUIDropdown();

@Component({
  selector: 'sample-form',
})
class SampleForm implements IHooks {
  sampleformFields: any;
  createChangeHandler: (key: string) => (e: Event) => void;
  multiSelectChangehandler: (e: any) => void;
  resetFormFields: () => void;
  jsonRef: HTMLElement;

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
    multiple: true,
    buttonText: (options: IOption<string>[]): string => {
      if (options.length === 0) {
        return 'None selected';
      } else if (options.length > 3) {
        return options.length + ' selected';
      } else {
        return options.map((item) => item.label).join(', ');
      }
    },
  };

  dropdownRef: ComponentRef<DropdownComponent<string>>;

  constructor(private renderer: Renderer) {}

  beforeMount() {
    [this.sampleformFields, this.createChangeHandler, this.resetFormFields] =
      useFormFields({
        email: '',
        password: '',
        checkme: false,
        option: '',
        options: [],
        gender: '',
      });
    this.multiSelectChangehandler = this.createChangeHandler('options');
  }

  mount() {
    this.dropdownRef.setProps({
      dropdownOptions: this.dropdownOptions,
    });
  }

  submitForm(e: Event) {
    e.preventDefault();
    console.log(this.sampleformFields);
    this.jsonRef.innerHTML = JSON.stringify(this.sampleformFields, null, 4);
  }

  resetForm() {
    this.resetFormFields();
    this.renderer.update();
  }

  render() {
    return html`
      <div>
        <form
          onsubmit=${(e: Event) => {
            this.submitForm(e);
          }}
        >
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value=${this.sampleformFields.email}
              onchange=${this.createChangeHandler('email')}
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value=${this.sampleformFields.password}
              onchange=${this.createChangeHandler('password')}
            />
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              checked=${this.sampleformFields.checkme}
              onchange=${this.createChangeHandler('checkme')}
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <div class="form-group form-check">
            <label>single select</label>
            <select
              value=${this.sampleformFields.option}
              onchange=${this.createChangeHandler('option')}
            >
              <option>select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div>
            <label>plumejs multi select</label>
            <ui-dropdown
              class="d-inline-block"
              ref=${(node) => {
                this.dropdownRef = node;
              }}
              onoptionselected=${(event) => {
                this.multiSelectChangehandler({
                  target: {
                    value: event.detail,
                  },
                });
              }}
            ></ui-dropdown>
          </div>
          <div class="form-group form-check">
            <input
              type="radio"
              id="gender_male"
              name="gender"
              value="male"
              onchange=${this.createChangeHandler('gender')}
            />
            <label for="gender_male">Male</label>
            <input
              type="radio"
              id="gender_female"
              name="gender"
              value="female"
              onchange=${this.createChangeHandler('gender')}
            />
            <label for="gender_female">Female</label>
          </div>
          <button type="submit" class="button is-info">Submit</button>
          <button
            onclick=${() => {
              this.resetForm();
            }}
            class="button"
          >
            Reset
          </button>
        </form>
      </div>
      <pre>
				<code ref=${(node) => {
        this.jsonRef = node;
      }}>
        ${JSON.stringify(this.sampleformFields, null, 4)}
				</code>
			</pre>
    `;
  }
}
