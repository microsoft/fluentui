import {
  FASTElement,
  customElement,
  attr,
  html,
  css,
  repeat,
  ValueConverter,
  // observable,
} from '@microsoft/fast-element';
import { getTestOptions } from '../../shared/utils/testOptions';
import { performanceMeasure } from '../../shared/utils/performanceMeasure';
import { StressComponent } from './stressComponent.wc';

const styles = css`
  :host {
    width: 100%;
    height: 100%;
  }
`;

const template = html<StressApp>`
  <stress-container>
    ${repeat(
      el => new Array(el.numchildren), // TODO: don't recreate the array
      html<StressComponent, StressApp>`<stress-component
        checked=${(el, ctx) => ctx.parent.checked}
      ></stress-component>`,
      // use a property bind 👆 (:checked=${(el, ctx) => ctx.parent.checked}) leave this one probably
    )}
  </stress-container>
`;

const numberConverter: ValueConverter = {
  toView(value: any): string {
    return String(value);
  },

  fromView(value: string): number {
    return Number(value);
  },
};

@customElement({
  name: 'stress-app',
  template,
  styles,
})
export class StressApp extends FASTElement {
  @attr({ converter: numberConverter }) public numchildren: number = 10;
  @attr({ mode: 'boolean' }) public checked: boolean = false; // change to observable property

  // @observable - primary mechanism for state management
  // just creates a property

  private _hasMountedOnce: boolean;
  constructor() {
    super();
    this._hasMountedOnce = false;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    // Don't assume this only runs once
    // Consider if you need a disconnect

    if (!this._hasMountedOnce) {
      this._hasMountedOnce = true;
      const { test, numStartNodes, numAddNodes, numRemoveNodes } = getTestOptions();

      if (test === 'prop-update') {
        setTimeout(() => {
          performanceMeasure('stress', 'start');
          this.checked = true;
        }, 2000);
      } else if (test === 'add-node') {
        setTimeout(() => {
          performanceMeasure('stress', 'start');
          this.numchildren = Number(numStartNodes) + Number(numAddNodes);
        }, 2000);
      } else if (test === 'remove-node') {
        setTimeout(() => {
          performanceMeasure('stress', 'start');
          this.numchildren = Number(numStartNodes) - Number(numRemoveNodes);
        }, 2000);
      }
    }
  }
}
