import { tagName } from './tab.options.js';
import { Tab } from './tab.js';
import { template } from './tab.template.js';
import { styles } from './tab.styles.js';

export const definition = Tab.compose({
  name: tagName,
  template,
  styles,
});
