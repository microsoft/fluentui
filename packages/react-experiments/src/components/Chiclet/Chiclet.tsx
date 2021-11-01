import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './Chiclet.styles';
import { ChicletBase } from './Chiclet.base';
import type { IChicletProps, IChicletStyleProps, IChicletStyles } from './Chiclet.types';

export const Chiclet: React.FunctionComponent<IChicletProps> = styled<
  IChicletProps,
  IChicletStyleProps,
  IChicletStyles
>(ChicletBase, getStyles, undefined, {
  scope: 'Chiclet',
});
