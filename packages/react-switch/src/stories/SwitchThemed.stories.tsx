import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { webDarkTheme, webHighContrastTheme, webLightTheme } from '@fluentui/react-theme';
import { Switch } from '../index';

const outerWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};
const innerWrapperStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
};
const leftSectionStyle: React.CSSProperties = {
  borderBottomLeftRadius: '15px',
  borderTopLeftRadius: '15px',
};
const rightSectionStyle: React.CSSProperties = {
  borderBottomRightRadius: '15px',
  borderTopRightRadius: '15px',
};

export const Themed = () => (
  <div style={outerWrapperStyle}>
    <div style={innerWrapperStyle}>
      <FluentProvider style={leftSectionStyle} theme={webLightTheme}>
        <Switch checked={false} label="Unchecked and enabled" />
        <Switch checked={false} disabled label="Unchecked and disabled" />
      </FluentProvider>
      <FluentProvider theme={webDarkTheme}>
        <Switch checked={false} label="Unchecked and enabled" />
        <Switch checked={false} disabled label="Unchecked and disabled" />
      </FluentProvider>
      <FluentProvider style={rightSectionStyle} theme={webHighContrastTheme}>
        <Switch checked={false} label="Unchecked and enabled" />
        <Switch checked={false} disabled label="Unchecked and disabled" />
      </FluentProvider>
    </div>
    <div style={innerWrapperStyle}>
      <FluentProvider style={leftSectionStyle} theme={webLightTheme}>
        <Switch checked label="Checked and enabled" />
        <Switch checked disabled label="Checked and disabled" />
      </FluentProvider>
      <FluentProvider theme={webDarkTheme}>
        <Switch checked label="Checked and enabled" />
        <Switch checked disabled label="Checked and disabled" />
      </FluentProvider>
      <FluentProvider style={rightSectionStyle} theme={webHighContrastTheme}>
        <Switch checked label="Checked and enabled" />
        <Switch checked disabled label="Checked and disabled" />
      </FluentProvider>
    </div>
  </div>
);

Themed.parameters = {
  docs: {
    description: {
      story:
        'The Switch presents itself correctly in different themes (web light, dark and high contrast shown in this ' +
        'example).',
    },
  },
};
