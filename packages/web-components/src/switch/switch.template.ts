import { ElementViewTemplate } from '@microsoft/fast-element';
import { switchTemplate } from '@microsoft/fast-foundation';
import { Switch } from './switch.js';

export const template: ElementViewTemplate<Switch> = switchTemplate({
  switch: `<span class="checked-indicator" part="checked-indicator"></span>`,
});
