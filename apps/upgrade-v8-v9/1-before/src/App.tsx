import React from 'react';
import { ActionButtonExample } from './examples/buttons/ActionButtonExample';
import './App.css';

import { ButtonExample } from './examples/buttons/ButtonExample';
import { ButtonAnchorExample } from './examples/buttons/ButtonAnchorExample';
import { CommandBarButtonExample } from './examples/buttons/CommandBarButton';
import { CommandButtonExample } from './examples/buttons/CommandButton';
import { CompoundButtonExample } from './examples/buttons/CompoundButtonExample';
import { IconButtonExample } from './examples/buttons/IconButtonExample';
import { MenuButtonExample } from './examples/buttons/MenuButtonExample';
import { PrimaryButtonExample } from './examples/buttons/PrimaryButtonExample';
import { SplitButtonExample } from './examples/buttons/SplitButtonExample';
import { ToggleButtonExample } from './examples/buttons/ToggleButtonExample';
import { LinkExample } from './examples/LinkExample';
import { PersonaExample } from './examples/PersonaExample';

export const App: React.FunctionComponent = () => {
  return (
    <div className="app">
      <ButtonExample />
      <div className="variants">
        <ActionButtonExample />
        <ButtonAnchorExample />
        <CommandButtonExample />
        <CommandBarButtonExample />
        <CompoundButtonExample />
        <IconButtonExample />
        <MenuButtonExample />
        <PrimaryButtonExample />
        <SplitButtonExample />
        <ToggleButtonExample />
      </div>
      <LinkExample />
      <PersonaExample />
    </div>
  );
};
