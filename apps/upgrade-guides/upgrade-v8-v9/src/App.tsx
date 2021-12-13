import React from 'react';
import { ActionButtonExample } from './v8/Buttons/ActionButtonExample';
import './App.css';

import { ButtonExample } from './v8/Buttons/ButtonExample';
import { ButtonAnchorExample } from './v8/Buttons/ButtonAnchorExample';
import { CommandBarButtonExample } from './v8/Buttons/CommandBarButton';
import { CommandButtonExample } from './v8/Buttons/CommandButton';
import { CompoundButtonExample } from './v8/Buttons/CompoundButtonExample';
import { IconButtonExample } from './v8/Buttons/IconButtonExample';
import { MenuButtonExample } from './v8/Buttons/MenuButtonExample';
import { PrimaryButtonExample } from './v8/Buttons/PrimaryButtonExample';
import { SplitButtonExample } from './v8/Buttons/SplitButtonExample';
import { ToggleButtonExample } from './v8/Buttons/ToggleButtonExample';
import { LinkExample } from './v8/Buttons/LinkExample';
import { PersonaExample } from './v8/PersonaExample';

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
