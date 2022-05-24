import { Component, html, Renderer, TranslationService } from '@plumejs/core';
import { Route, Router } from '@plumejs/router';
import locale_en from './i18n/en';
import locale_fr from './i18n/fr';
import globalstyles from './styles.scss';

//console.log('globalstyles', globalstyles);

@Component({
  selector: 'app-root',
  styles: globalstyles,
  root: true,
})
export class AppComponent {
  constructor(
    private router: Router,
    private renderer: Renderer,
    private translations: TranslationService
  ) {
    Router.registerRoutes(this.routes, false);
    // translations.setTranslate(locale_en, 'en');
    // translations.setTranslate(locale_fr, 'fr');
    // translations.setDefaultLanguage('en');
  }

  showNav = false;

  routes: Array<Route> = [
    {
      path: '',
      redirectTo: '/home',
    },
    {
      path: '/home',
      template: `<sample-ele></sample-ele>`,
      templatePath: () => import('./home'),
    },
    {
      path: '/controls',
      template: `<plume-comp></plume-comp>`,
      templatePath: () => import('./ui-controls'),
    },
    {
      path: '/persons/:id',
      template: `<persons-list></persons-list>`,
      templatePath: () => import('./persons'),
      canActivate: () => {
        let key = localStorage.getItem('@plumejs/core');
        if (!key) {
          this.router.navigateTo('/home');
          return false;
        }
        return true;
      },
    },
    {
      path: '/form',
      template: `<sample-form></sample-form>`,
      templatePath: () => import('./form'),
    },
  ];

  navigate = (e: Event, path: string, state?: Record<string, any>) => {
    e.preventDefault();
    this.router.navigateTo(path, state);
  };

  private _displayNav() {
    this.showNav = !this.showNav;
    this.renderer.update();
  }

  render() {
    return html`
      <nav
        class="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a
            class="navbar-item"
            href="#"
            onclick=${(e: Event) => {
              this.navigate(e, '/home');
            }}
          >
            <img src="./images/plume-logo.jpg" />
          </a>

          <span
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            onclick=${(e: Event) => {
              e.preventDefault();
              this._displayNav();
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div
          id="navbarBasicExample"
          class="navbar-menu ${this.showNav ? 'is-active' : ''}"
        >
          <div class="navbar-start">
            <a
              class="navbar-item"
              href="#"
              onclick=${(e: Event) => {
                this.navigate(e, '/home');
              }}
            >
              Home
            </a>

            <a
              class="navbar-item"
              href="#"
              onclick=${(e: Event) => {
                this.navigate(e, '/controls', { name: 'hello world' });
              }}
            >
              UI Controls
            </a>

            <a
              class="navbar-item"
              href="#"
              onclick=${(e: Event) => {
                this.navigate(e, '/persons/123');
              }}
            >
              Persons
            </a>

            <a
              class="navbar-item"
              href="#"
              onclick=${(e: Event) => {
                this.navigate(e, '/form');
              }}
            >
              Sample Form
            </a>

            <div class="navbar-item">
              <div class="select">
                <select
                  class="form-control"
                  onchange=${(e: any) => {
                    //this.translations.setDefaultLanguage(e.target.value);
                  }}
                >
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="container">
        <h1 class="title is-size-1-touch">Hello world</h1>
        <router-outlet></router-outlet>
      </div>
    `;
  }
}
