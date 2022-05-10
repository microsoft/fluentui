import { allComponents as fluentComponents, provideFluentDesignSystem } from '@fluentui/web-components';
import { fastToolingColorPicker } from './components/color-picker';
import { App } from './app';
import { appComponents } from './custom-elements';

export function init() {
  provideFluentDesignSystem()
    .register(fluentComponents)
    .withPrefix('fast-tooling')
    .register(fastToolingColorPicker())
    .withPrefix('app')
    .register(appComponents);
}

App;

export { App } from './app';
