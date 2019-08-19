import * as React from 'react';
import { styled } from 'office-ui-fabric-react';
import { PlatformBarBase } from './PlatformBar.base';
import { IPlatformBarProps, IPlatformBarStyleProps, IPlatformBarStyles } from './PlatformBar.types';
import { getStyles } from './PlatformBar.styles';

export const PlatformBar: React.StatelessComponent<IPlatformBarProps> = styled<
  IPlatformBarProps,
  IPlatformBarStyleProps,
  IPlatformBarStyles
>(PlatformBarBase, getStyles, undefined, {
  scope: 'PlatformBar'
});
