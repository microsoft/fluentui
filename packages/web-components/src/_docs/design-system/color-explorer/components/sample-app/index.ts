import { customElement } from '@microsoft/fast-element';
import { SampleApp } from './sample-app';
import { sampleAppTemplate as template } from './sample-app.template';
import { sampleAppStyles as styles } from './sample-app.styles';

@customElement({
  name: 'app-sample-app',
  template,
  styles,
})
export class AppSampleApp extends SampleApp {}
export * from './sample-app.template';
export * from './sample-app.styles';
export * from './sample-app';
