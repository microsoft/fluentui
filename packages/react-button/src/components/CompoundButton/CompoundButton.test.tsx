import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { CompoundButton } from './CompoundButton';
import { CompoundButtonProps } from './CompoundButton.types';

describe('CompoundButton', () => {
  isConformant({
    Component: CompoundButton as React.FunctionComponent<CompoundButtonProps>,
    displayName: 'CompoundButton',
  });
});
