import * as React from 'react';
import { makeStyles, mergeClasses, shorthands, tokens, Divider, FluentProvider } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-alert';
import { Demo } from '../Demo/Demo';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';
import { AppStateContext } from '../../ThemeDesigner';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.padding('40px', '5%', '40px', '5%'),
    gridRowGap: tokens.spacingVerticalXXXL,
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();

  const { appState } = React.useContext(AppStateContext);
  const { className } = props;
  const theme = { ...appState.theme, ...appState.overrides };

  return (
    <FluentProvider theme={theme}>
      <Alert intent="warning" action={{ appearance: 'transparent' }}>
        This tool is still a work in progress - colors are still subject to adjustment.
      </Alert>
      <div className={mergeClasses(styles.root, className)}>
        <Palette brandColors={appState.brand} />
        <Demo theme={theme} />
        <Divider />
        <ColorTokens theme={theme} />
      </div>
    </FluentProvider>
  );
};
