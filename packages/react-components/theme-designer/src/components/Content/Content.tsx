import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Divider, FluentProvider, tokens } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-alert';

import type { ReducerState } from '../../useThemeDesignerReducer';
import type { DispatchOverride } from '../../useOverrideReducer';

import { Demo } from '../Demo/Demo';
import { AccessibilityChecker } from '../AccessibilityChecker/AccessibilityChecker';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';

export interface ContentProps {
  className?: string;
  state: ReducerState;
  dispatchOverrideState: React.Dispatch<DispatchOverride>;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.padding('40px', '5%', '0px', '5%'),
    gridRowGap: tokens.spacingVerticalXXXL,
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();
  const { className, state, dispatchOverrideState } = props;
  const theme = { ...state.theme, ...state.overrides };

  return (
    <FluentProvider theme={theme}>
      <Alert intent="warning" action={{ appearance: 'transparent' }}>
        This tool is still a work in progress - colors are still subject to adjustment.
      </Alert>
      <div className={mergeClasses(styles.root, className)}>
        <Palette brandColors={state.brand} />
        <Demo theme={theme} />
        <Divider />
        <AccessibilityChecker theme={theme} />
        <Divider />
        <ColorTokens state={state} dispatchOverrideState={dispatchOverrideState} />
      </div>
    </FluentProvider>
  );
};
