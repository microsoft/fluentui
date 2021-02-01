import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';
import { CalendarIcon } from '@fluentui/react-icons-mdl2';
import { teamsLightTheme } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Core/Button',
  component: Button,
};

const style = `
:root {
  --alias-ghost-background: ${teamsLightTheme};
  --alias-ghost-background-hover: ${teamsLightTheme};
  --alias-ghost-background-pressed: ${teamsLightTheme};
  --alias-ghost-background-selected: ${teamsLightTheme};
  --neutral-foreground2-interactive-brand: ${teamsLightTheme.neutralColorTokens.neutralForeground2};
  --button-background: ${teamsLightTheme};
  --button-background: ${teamsLightTheme};
  --button-background: ${teamsLightTheme};
}

.root {
  background: var(--alias-ghost-background);
  border: none;
}
.root:hover {
  background: var(--alias-ghost-background-hover);
}
.root:active {
  background: var(--alias-ghost-background-pressed);
}
.root.active {
  background: var(--alias-ghost-background-selected);
}

.content {
  background: var(--neutral-foreground2-interactive-brand);
}
.icon {
  background: var(--button-background);
}
.secondaryContent {
  background: var(--button-background);
}
.icon {
  background: var(--button-background);
}
`;

export const Subtle = (props: ButtonProps) => {
  return (
    <div>
      <style>{style}</style>
      <button className="root">
        <CalendarIcon />
        <span>Text</span>
      </button>
    </div>
  );
};
Subtle.args = {};
