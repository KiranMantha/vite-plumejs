import { TestBed, Fixture } from '@plumejs/core';
import { AppComponent } from './index';

describe('@plumejs/core Component', () => {
  let appRoot: Fixture<AppComponent>;

  beforeAll(async () => {
    appRoot = await TestBed.MockComponent(AppComponent);
  });

  it('translation should return "Hello World"', () => {
    const h1 = appRoot.element.querySelector('h1');
    expect(h1.innerHTML).toBe('Hello world');
  });

  afterAll(() => {
    TestBed.RemoveComponent(appRoot);
  });
});
