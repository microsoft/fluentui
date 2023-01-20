import * as React from 'react';
import { teamsLightTheme, typographyStyles } from '@fluentui/react-components';
import type { TypographyStyle } from '@fluentui/react-components';

const theme = teamsLightTheme;

export const TypographyStyles = () => {
  // var(--tokenName) => tokenName
  function formatTypographyStyleValue(typographyStyleValue: TypographyStyle) {
    return (
      <div>
        {Object.values(typographyStyleValue).map(value => (
          <div key={value}>{value.replace(/var\(--(.+)\)/, '$1')}</div>
        ))}
      </div>
    );
  }

  // caption1Strong => Caption 1 Strong
  function formatTypographyStyleName(typographyStyleName: string) {
    return typographyStyleName.replace(/([A-Z\d])/g, ' $1').replace(/^(.)/, firstChar => firstChar.toUpperCase());
  }

  return (
    <div>
      <div>
        <em>Typography style is represented by a set of tokens instead of an individual token.</em>
      </div>
      <div
        style={{
          marginTop: '2em',
          fontFamily: theme.fontFamilyBase,
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {(Object.keys(typographyStyles) as (keyof typeof typographyStyles)[]).map(typographyStyleName => [
          <div key={typographyStyleName}>{typographyStyleName}</div>,
          <div key={`${typographyStyleName}-value`}>
            {formatTypographyStyleValue(typographyStyles[typographyStyleName])}
          </div>,
          <div key={`${typographyStyleName}-demo`} style={typographyStyles[typographyStyleName]}>
            Hello, I am {formatTypographyStyleName(typographyStyleName)}
          </div>,
        ])}
      </div>
    </div>
  );
};
