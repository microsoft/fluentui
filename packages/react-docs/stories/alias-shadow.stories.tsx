import * as React from 'react';
import { StorybookStoryContext } from '../src/types';

export default {
  title: 'Fluent UI Theme/Alias/Shadows',
};

export const Shadows = (props, { globals: { theme } }: StorybookStoryContext) => {
  console.log(theme.light.alias.shadow);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        marginBottom: '4em',
      }}
    >
      <h3 key="shadow-title">Shadow</h3>
      <h3 key="shadow-title-light">Light</h3>
      <h3 key="shadow-title-dark">Dark</h3>
      <h3 key="shadow-title-hc">High Contrast</h3>
      {Object.keys(theme.light.alias.shadow).map((shadow) => [
        <div key={shadow}>{shadow}</div>,
        <div key={`${shadow}-light`} style={{ boxShadow: theme.light.alias.shadow[shadow], height: '2em' }} />,
        <div key={`${shadow}-dark`} style={{ boxShadow: theme.dark.alias.shadow[shadow], height: '2em' }} />,
        <div key={`${shadow}-hc`} style={{ boxShadow: theme.highContrast.alias.shadow[shadow], height: '2em' }} />,
      ])}
    </div>
  );
};
