import * as React from 'react';
import { ColorRampItem } from '../src/components/ColorRamp';
import {
  webLightTheme,
  webDarkTheme,
  webHighContrastTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Alias Shared',
};

const AliasSharedItem = (props) => (
  <div>
    {Object.keys(props.theme.sharedColorTokens.red).map((name) => (
      <div key={name} style={{ display: 'flex' }}>
        <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
        {Object.keys(props.theme.sharedColorTokens).map((sharedColor) => {
          return <ColorRampItem value={props.theme.sharedColorTokens[sharedColor][name]} />;
        })}
      </div>
    ))}
  </div>
);

export const AliasShared = (props) => {
  const [color, setColor] = React.useState<string>('darkRed');

  return (
    <div {...props}>
      <div style={{ maxWidth: '300px' }}>
        {Object.keys(webLightTheme.sharedColorTokens).map((colorName) => (
          <button
            key={colorName}
            style={{
              background: webDarkTheme.sharedColorTokens[colorName].background3,
              color: webDarkTheme.sharedColorTokens[colorName].foreground1,
            }}
            onClick={() => setColor(colorName)}
          >
            {colorName}
          </button>
        ))}
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Design Token</h3>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Light</h3>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web Dark</h3>
          <h3 style={{ flex: 1, padding: '1em', margin: 0 }}>Web High Contrast</h3>
        </div>
        {Object.keys(webLightTheme.sharedColorTokens[color]).map((name) => (
          <div key={name} style={{ display: 'flex' }}>
            <div style={{ padding: '1em', width: 250, fontWeight: 'bold' }}>{name}</div>
            <ColorRampItem value={webLightTheme.sharedColorTokens[color][name]} />
            <ColorRampItem value={webDarkTheme.sharedColorTokens[color][name]} />
            <ColorRampItem value={webHighContrastTheme.sharedColorTokens[color][name]} />
          </div>
        ))}
      </div>
    </div>
  );
};
AliasShared.args = {};
