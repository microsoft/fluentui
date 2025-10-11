import * as React from 'react';
import type { IRenderFunction } from '../../Utilities';
import type { IPersonaProps, IPersonaSharedProps } from './index';

import type { JSXElement } from '@fluentui/utilities';

/**
 * function to override the default onRender callbacks
 */
export const wrapPersona = (
  example: IPersonaSharedProps,
  shouldWrapPersonaCoin: boolean = false,
): ((coinProps: IPersonaProps, defaultRenderer: IRenderFunction<IPersonaProps>) => JSXElement | null) => {
  return (coinProps, defaultCoinRenderer): JSXElement | null => {
    return shouldWrapPersonaCoin ? (
      <span id="persona-coin-container">{defaultCoinRenderer(coinProps)}</span>
    ) : (
      defaultCoinRenderer(coinProps)
    );
  };
};
