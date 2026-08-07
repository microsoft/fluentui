import * as React from 'react';
import { clsx } from 'clsx';
import { Divider, FluentProvider, Text, Caption1 } from '@fluentui/react-components';
import styles from './Content.module.css';
import { Demo } from '../Demo/Demo';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import { ExportPanel } from '../Export/ExportPanel';
import { useThemeAsClass } from '../../utils/applyThemeAsClass';

export interface ContentProps {
  className?: string;
}

export const Content: React.FC<ContentProps> = props => {
  const {
    state: { themeWithOverrides },
  } = useThemeDesigner();
  const themeWithOverridesClassName = useThemeAsClass(themeWithOverrides);
  return (
    <FluentProvider themeClassName={themeWithOverridesClassName}>
      <ExportPanel />
      <div className={clsx(styles.root, props.className)}>
        <h1 style={{ marginBottom: 0 }}>Fluent Theme Designer</h1>
        <Text>
          Welcome to the Fluent Theme Designer tool. This tool offers a step-by-step process to help you implement your
          organization’s brand colors within Microsoft products using Fluent 2. Inputting your organization’s key color
          value will output a 16-color ramp that passes contrast checks when used in tokens and implemented with Fluent
          2 components.
        </Text>
        <Palette />
        <div className={styles['sicker-sheet']}>
          <Divider />
          <Caption1>Sticker sheet</Caption1>
        </div>
        <Demo />
        <Divider />
        <ColorTokens />
      </div>
    </FluentProvider>
  );
};
