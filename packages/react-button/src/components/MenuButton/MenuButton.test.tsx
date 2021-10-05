import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { MenuButton } from './MenuButton';
import { MenuButtonProps } from './MenuButton.types';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton as React.FunctionComponent<MenuButtonProps>,
    displayName: 'MenuButton',
  });
});
