import { Behavior, CSSDirective, FASTElement } from '@microsoft/fast-element';
import { baseHeightMultiplier, density, designUnit } from '../design-tokens';

/**
 * A formula to retrieve the control height.
 * Use this as the value of any CSS property that
 * accepts a pixel size.
 */
class HeightNumber extends CSSDirective implements Behavior {
  private behaviors: Behavior[] = [
    baseHeightMultiplier.createBehavior(),
    density.createBehavior(),
    designUnit.createBehavior(),
  ].filter(x => x !== void 0) as Behavior[];
  createCSS() {
    return `(${baseHeightMultiplier.createCSS()} + ${density.createCSS()}) * ${designUnit.createCSS()}`;
  }
  createBehavior() {
    return this;
  }

  bind(element: FASTElement) {
    element.$fastController.addBehaviors(this.behaviors);
  }

  unbind(element: FASTElement) {
    element.$fastController.removeBehaviors(this.behaviors);
  }
}

export const heightNumber = new HeightNumber();
