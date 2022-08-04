import * as React from 'react';
import { makeStyles, mergeClasses, shorthands, tokens, Divider } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-alert';
import { Demo } from '../Demo/Demo';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    minWidth: '750px',
    ...shorthands.padding('40px', '10%'),
    ...shorthands.margin('0', 'auto'),
    gridRowGap: tokens.spacingVerticalXXXL,
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();

  return (
    <>
      <Alert intent="warning" action={{ appearance: 'transparent' }}>
        This tool is still a work in progress - colors are still subject to adjustment.
      </Alert>
      <div className={mergeClasses(styles.root, props.className)}>
        <Palette />
        <Demo />
        <Divider />
        <ColorTokens />
      </div>
    </>
  );
};
