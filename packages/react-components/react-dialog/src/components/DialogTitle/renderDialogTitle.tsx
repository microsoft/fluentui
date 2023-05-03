/** @jsxRuntime classic */
/** @jsx createElementNext */
/** @jsxFrag React.Fragment */

import * as React from 'react';
import { createElementNext } from '@fluentui/react-jsx-runtime';

import type { DialogTitleState } from './DialogTitle.types';

/**
 * Render the final JSX of DialogTitle
 */
export const renderDialogTitle_unstable = (state: DialogTitleState) => (
  <>
    <state.root />
    {state.action && <state.action />}
  </>
);
