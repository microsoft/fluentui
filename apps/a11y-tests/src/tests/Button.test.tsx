import * as React from 'react';
import { testComponent } from './testComponent';

import { ButtonActionExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Action.Example';
import { ButtonAnchorExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Anchor.Example';
import { ButtonCommandExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Command.Example';
import { ButtonCommandBarExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.CommandBar.Example';
import { ButtonCompoundExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Compound.Example';
import { ButtonContextualMenuExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.ContextualMenu.Example';
import { ButtonDefaultExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Default.Example';
import { ButtonIconExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Icon.Example';
import { ButtonPrimaryExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Primary.Example';
import { ButtonScreenReaderExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.ScreenReader.Example';
import { ButtonSplitCustomExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Split.Example';
import { ButtonToggleExample } from 'office-ui-fabric-react/lib/components/Button/examples/Button.Toggle.Example';

export const buttonTestComponents = [
  { name: 'Button', pageName: 'ButtonActionExample', elem: <ButtonActionExample /> },
  { name: 'Button', pageName: 'ButtonAnchorExample', elem: <ButtonAnchorExample /> },
  { name: 'Button', pageName: 'ButtonCommandExample', elem: <ButtonCommandExample /> },
  { name: 'Button', pageName: 'ButtonCommandBarExample', elem: <ButtonCommandBarExample /> },
  { name: 'Button', pageName: 'ButtonCompoundExample', elem: <ButtonCompoundExample /> },
  { name: 'Button', pageName: 'ButtonContextualMenuExample', elem: <ButtonContextualMenuExample /> },
  { name: 'Button', pageName: 'ButtonDefaultExample', elem: <ButtonDefaultExample /> },
  { name: 'Button', pageName: 'ButtonIconExample', elem: <ButtonIconExample /> },
  { name: 'Button', pageName: 'ButtonPrimaryExample', elem: <ButtonPrimaryExample /> },
  { name: 'Button', pageName: 'ButtonScreenReaderExample', elem: <ButtonScreenReaderExample /> },
  { name: 'Button', pageName: 'ButtonSplitCustomExample', elem: <ButtonSplitCustomExample /> },
  { name: 'Button', pageName: 'ButtonToggleExample', elem: <ButtonToggleExample /> }
];

buttonTestComponents.forEach(component => testComponent(component));
