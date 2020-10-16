import { isIE11 } from '@uifabric/utilities';
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles';

if (isIE11()) {
  require('ie11-custom-properties');

  Stylesheet.getInstance().setConfig({
    injectionMode: InjectionMode.appendChild,
  });
}
