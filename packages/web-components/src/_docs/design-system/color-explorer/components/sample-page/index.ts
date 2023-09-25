import { customElement } from '@microsoft/fast-element';
import { SamplePage } from './sample-page';
import { samplePageStyles as styles } from './sample-page.styles';
import { samplePageTemplate as template } from './sample-page.template';

@customElement({
  name: 'app-sample-page',
  template,
  styles,
})
export class AppSamplePage extends SamplePage {}
export * from './sample-page.template';
export * from './sample-page.styles';
export * from './sample-page';
