import { customElement } from '@microsoft/fast-element';
import { ControlPane } from './control-pane';
import { controlPaneTemplate as template } from './control-pane.template';
import { controlPaneStyles as styles } from './control-pane.styles';

@customElement({
  name: 'app-control-pane',
  template,
  styles,
})
export class AppControlPane extends ControlPane {}
export * from './control-pane.template';
export * from './control-pane.styles';
export * from './control-pane';
