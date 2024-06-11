import type { StaticallyComposableHTML } from '../utils/index.js';
import { BaseCheckbox } from '../checkbox/checkbox.js';

export type SwitchOptions = {
  switch?: StaticallyComposableHTML<Switch>;
};

export class Switch extends BaseCheckbox {}
