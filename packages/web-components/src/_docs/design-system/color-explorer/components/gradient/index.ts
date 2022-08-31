import { customElement } from '@microsoft/fast-element';
import { Gradient } from './gradient';
import { gradientTemplate as template } from './gradient.template';
import { gradientStyles as styles } from './gradient.styles';

@customElement({
  name: 'app-gradient',
  template,
  styles,
})
export class AppGradient extends Gradient {}
export * from './gradient.template';
export * from './gradient.styles';
export * from './gradient';
