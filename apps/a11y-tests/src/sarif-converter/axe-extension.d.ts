import * as axe from 'axe-core';
import { IRuleConfiguration, ICheckConfiguration } from './iruleresults';

declare module 'axe-core/axe' {
  const commons: {
    aria: {
      label: Function,
      implicitRole: Function,
      getRolesByType: Function,
      lookupTable: any,
    },
    dom: {
      isVisible: Function,
      idrefs: (node: HTMLElement, attr: string) => HTMLElement[],
    },
    text: {
      accessibleText: Function,
    },
  };

  const utils: {
    toArray: Function,
    matchesSelector: Function,
  };

  const _audit: {
    defaultConfig: {
      rules: IRuleConfiguration[],
      checks: ICheckConfiguration[];
    }
  };
}