import * as React from 'react';
import { webDark } from '../src/themes/theme-teams';
import { ColorRampItem } from '../src/components/ColorRamp';
import { teamsDefaultTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Teams Alias',
};

export const TeamsAlias = (props) => (
  <div>
    <div style={{ display: 'flex' }}>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Design Token</h3>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Light</h3>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Dark</h3>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web High Contrast</h3>
    </div>
    {Object.keys(teamsDefaultTheme.neutralColorTokens).map((name) => (
      <div key={name} style={{ display: 'flex' }}>
        <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
        <ColorRampItem value={teamsDefaultTheme.neutralColorTokens[name]} />
        <ColorRampItem value={teamsDarkTheme.neutralColorTokens[name]} />
        <ColorRampItem value={teamsHighContrastTheme.neutralColorTokens[name]} />
      </div>
    ))}
  </div>
);

TeamsAlias.args = {};
