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
  --neutral-foreground2-interactive-brand: ${teamsLightTheme.alias.color.neutral.neutralForeground2};
  --button-background: ${teamsLightTheme};
  --button-background: ${teamsLightTheme};
  --button-background: ${teamsLightTheme};
}

.root {
  background: ${teamsLightTheme.alias.color.ghost.background};
  border: none;
}
.root:hover {
  background: ${teamsLightTheme.alias.color.ghost.backgroundHover};
}
.root:active {
  background: ${teamsLightTheme.alias.color.ghost.backgroundPressed};
}
.root.active {
  background: ${teamsLightTheme.alias.color.ghost.backgroundSelected};
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
