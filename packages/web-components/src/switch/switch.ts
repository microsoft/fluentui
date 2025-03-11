import type { StaticallyComposableHTML } from '../utils/index.js';
import { BaseCheckbox } from '../checkbox/checkbox.base.js';

export type SwitchOptions = {
  switch?: StaticallyComposableHTML<Switch>;
};

export class Switch extends BaseCheckbox {
  constructor() {
    super();
    this.elementInternals.role = 'switch';
  }
}
