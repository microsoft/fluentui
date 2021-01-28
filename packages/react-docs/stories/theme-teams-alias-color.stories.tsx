import * as React from 'react';
import { AliasColorTokens, webLight, webHighContrast } from '../src/themes/theme-base';
import { webDark } from '../src/themes/theme-teams';
import { ColorRampItem } from '../src/components/ColorRamp';

export default {
  title: 'Fluent UI Theme/Colors/Teams Alias',
};

const asliasNames: Array<keyof AliasColorTokens> = [
  'neutralForeground1',
  'neutralForeground2',
  'neutralForeground2Hover',
  'neutralForeground2Pressed',
  'neutralForeground2Selected',
  'brandForeground2Hover',
  'brandForeground2Pressed',
  'brandForeground2Selected',
  'neutralForeground3',
  'neutralForeground3Hover',
  'neutralForeground3Pressed',
  'neutralForeground3Selected',
  'brandForeground3Hover',
  'brandForeground3Pressed',
  'brandForeground3Selected',
  'neutralForeground4',
  'neutralForegroundDisabled',
  'brandForeground',
  'brandForegroundHover',
  'brandForegroundPressed',
  'brandForegroundSelected',
  'neutralForegroundInverted',
  'neutralForegroundInvertedAccessible',
  'neutralBackground1',
  'neutralBackground1Hover',
  'neutralBackground1Pressed',
  'neutralBackground1Selected',
  'neutralBackground2',
  'neutralBackground2Hover',
  'neutralBackground2Pressed',
  'neutralBackground2Selected',
  'neutralBackground3',
  'neutralBackground3Hover',
  'neutralBackground3Pressed',
  'neutralBackground3Selected',
  'neutralBackground4',
  'neutralBackground4Hover',
  'neutralBackground4Pressed',
  'neutralBackground4Selected',
  'neutralBackground5',
  'neutralBackground5Hover',
  'neutralBackground5Pressed',
  'neutralBackground5Selected',
  'neutralBackground6',
  'neutralBackgroundDisabled',
  'neutralStrokeAccessible',
  'neutralStrokeAccessibleHover',
  'neutralStrokeAccessiblePressed',
  'neutralStrokeAccessibleSelected',
  'neutralStroke1',
  'neutralStroke1Hover',
  'neutralStroke1Pressed',
  'neutralStroke1Selected',
  'neutralStroke2',
  'neutralStroke3',
  'neutralStrokeDisabled',
  'strokeAccessible',
  'strokeAccessibleInteractive',
  'strokeAccessibleDisabled',
  'neutralShadowAmbient',
  'neutralShadowKey',
  'neutralShadowAmbientLighter',
  'neutralShadowKeyLighter',
  'neutralShadowAmbientDarker',
  'neutralShadowKeyDarker',
];

export const TeamsAlias = (props) => (
  <div>
    <div style={{ display: 'flex' }}>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Design Token</h3>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Light</h3>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Dark</h3>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web High Contrast</h3>
    </div>
    {asliasNames.map((name) => (
      <div key={name} style={{ display: 'flex' }}>
        <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
        <ColorRampItem value={webLight[name]} />
        <ColorRampItem value={webDark[name]} />
        <ColorRampItem value={webHighContrast[name]} />
      </div>
    ))}
  </div>
);

TeamsAlias.args = {};
