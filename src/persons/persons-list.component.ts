import {
  Component,
  ComponentRef,
  html,
  Injectable,
  render,
} from "@plumejs/core";
import { Router } from "@plumejs/router";
import { PersonDetails } from "./person-details.component";
import personListStyles from "./persons-list.scss";

@Injectable()
class PersonService {
  getPersons() {
    return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res.json()
    );
  }
}

@Component({
  selector: "persons-list",
  styles: personListStyles,
})
class PersonsList {
  persondetails: any = {};
  update: any;
  usersListRef: HTMLElement;
  personDetailsRef: ComponentRef<PersonDetails>;

  constructor(private personSrvc: PersonService, private router: Router) {
    console.log("current route ", this.router.getCurrentRoute());
  }

  mount() {
    this.personSrvc.getPersons().then((data) => {
      this.renderUsers(data);
    });
  }

  alertName(user: any) {
    this.persondetails = user;
    this.personDetailsRef.setProps({ userDetails: user });
  }

  private renderUsers(data: Array<any>) {
    const nodes = data.map((user: any) => {
      return html`
        <li
          class="pointer"
          onclick=${() => {
            this.alertName(user);
          }}
        >
          ${user.name}
        </li>
      `;
    });
    render(this.usersListRef, html`${nodes}`);
  }

  render() {
    return html`
      <h4>
        Sample service injection with http call and passing data to other
        component
      </h4>
      Current route data:
      <code>${JSON.stringify(this.router.getCurrentRoute(), null, 2)}</code>
      <div class="mt-20 mb-20 content">
        <ul
          ref="${(node) => {
            this.usersListRef = node;
          }}"
          class="block-list is-small"
        ></ul>
        <person-details
          id="person-details"
          ref="${(node) => {
            this.personDetailsRef = node;
          }}"
        ></person-details>
      </div>
    `;
  }
}
