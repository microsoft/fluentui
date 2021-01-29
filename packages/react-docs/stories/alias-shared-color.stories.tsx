import * as React from 'react';
import { ColorRampItem } from '../src/components/ColorRamp';
import { webLightTheme, webDarkTheme, webHighContrastTheme } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Alias Shared',
};

const AliasSharedItem = props => (
  <div>
    {Object.keys(props.theme.sharedColorTokens.red).map(name => (
      <div key={name} style={{ display: 'flex' }}>
        <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
        {Object.keys(props.theme.sharedColorTokens).map(sharedColor => {
          return <ColorRampItem value={props.theme.sharedColorTokens[sharedColor][name]} />;
        })}
      </div>
    ))}
  </div>
);

export const AliasShared = props => (
  <div {...props}>
    <div style={{ display: 'flex' }}>
      <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Design Token</h3>
      {/* TODO: get shared color names from a list rather than by happen-chance of light theme keys */}
      {Object.keys(webLightTheme.sharedColorTokens).map(colorName => (
        <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>{colorName}</h3>
      ))}
    </div>
    <AliasSharedItem name="Light" theme={webLightTheme} />
    <AliasSharedItem name="Dark" theme={webDarkTheme} />
    <AliasSharedItem name="High Contrast" theme={webHighContrastTheme} />
  </div>
);

AliasShared.args = {};
