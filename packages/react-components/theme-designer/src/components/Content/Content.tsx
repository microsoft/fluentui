import * as React from 'react';
import {
  Divider,
  FluentProvider,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  Text,
} from '@fluentui/react-components';
import { Demo } from '../Demo/Demo';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import { ExportPanel } from '../Export/ExportPanel';
import { KeyColorBanner } from '../ColorTokens/KeyColorBanner';

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
  const {
    state: { themeWithOverrides, brand },
  } = useThemeDesigner();
  return (
    <FluentProvider theme={themeWithOverrides}>
      <ExportPanel />
      <div className={mergeClasses(styles.root, props.className)}>
        <h1 style={{ marginBottom: 0 }}>Fluent Theme Designer</h1>
        <Text>
          Welcome to the Fluent Theme Designer tool. This tool offers a step-by-step process to help you implement your
          organization’s brand colors within Microsoft products using Fluent 2. Inputting your organization’s key color
          value will output a 16-color ramp that passes contrast checks when used in tokens and implemented with Fluent
          2 components.
        </Text>
        <Palette />
        <KeyColorBanner keyColor={brand[80]} />
        <Demo />
        <Divider />
        <ColorTokens />
      </div>
    </FluentProvider>
  );
};
