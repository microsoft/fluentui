import * as React from 'react';
import { IconButton } from '@storybook/components';
import { EyeIcon } from '@storybook/icons';

import type { JSXElement } from '@fluentui/react-utilities';
import { VISUAL_UPDATE_ID } from '../constants';
import { useGlobals } from '../hooks';

export const VisualUpdateToggle = (): JSXElement => {
  const [globals, updateGlobals] = useGlobals();

  const isActive = globals[VISUAL_UPDATE_ID] ?? false;

  const toggleVisualUpdate = React.useCallback(
    () =>
      updateGlobals({
        [VISUAL_UPDATE_ID]: !isActive,
      }),
    [isActive, updateGlobals],
  );

  return (
    <IconButton key={VISUAL_UPDATE_ID} active={isActive} title="Toggle Visual Update" onClick={toggleVisualUpdate}>
      <EyeIcon />
      <span style={{ marginLeft: 5 }}>Visual update</span>
    </IconButton>
  );
};