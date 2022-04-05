import * as React from 'react';
import { styled } from '../../Utilities';
import { FabricBase } from './Fabric.base';
import { getStyles } from './Fabric.styles';
import type { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';

/**
 * @deprecated This component is deprecated as of `@fluentui/react` version 8. Use `ThemeProvider` instead.
 */
export const Fabric: React.FunctionComponent<IFabricProps> = styled<IFabricProps, IFabricStyleProps, IFabricStyles>(
  FabricBase,
  getStyles,
  undefined,
  {
    scope: 'Fabric',
  },
);
