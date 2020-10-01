import * as React from 'react';
import { ButtonDefaultExample } from './Button.Default.Example';
import { ButtonContextualMenuExample } from './Button.ContextualMenu.Example';
import { ButtonCompoundExample } from './Button.Compound.Example';
import { ButtonActionExample } from './Button.Action.Example';
import { ButtonCommandBarExample } from './Button.CommandBar.Example';
import { ButtonCommandExample } from './Button.Command.Example';
import { ButtonIconExample } from './Button.Icon.Example';
import { ButtonIconWithTooltipExample } from './Button.IconWithTooltip.Example';
import { ButtonAnchorExample } from './Button.Anchor.Example';
import { ButtonScreenReaderExample } from './Button.ScreenReader.Example';
import { ButtonSplitExample } from './Button.Split.Example';
import { ButtonSplitCustomExample } from './Button.CustomSplit.Example';
import { ButtonToggleExample } from './Button.Toggle.Example';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const ButtonActionExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Action.Example.tsx') as string;
const ButtonAnchorExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Anchor.Example.tsx') as string;
const ButtonCommandBarExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.CommandBar.Example.tsx') as string;
const ButtonCompoundExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Compound.Example.tsx') as string;
const ButtonContextualMenuExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.ContextualMenu.Example.tsx') as string;
const ButtonCustomSplitExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.CustomSplit.Example.tsx') as string;
const ButtonDefaultExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Default.Example.tsx') as string;
const ButtonIconExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Icon.Example.tsx') as string;
const ButtonIconWithTooltipExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.IconWithTooltip.Example.tsx') as string;
const ButtonScreenReaderExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.ScreenReader.Example.tsx') as string;
const ButtonSplitExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Split.Example.tsx') as string;
const ButtonToggleExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Toggle.Example.tsx') as string;
const ButtonCommandExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/Button.Command.Example.tsx') as string;

export interface IButtonDocPageProps {
  areButtonsDisabled: boolean;
  areButtonsChecked: boolean;
}

/**
 * Exports a function because the documentation of this page requires some interactivity that is passed in here
 * as a prop.
 * @param props Props that are specific to generating page props for ButtonPage
 */
export const ButtonPageProps = (props: IButtonDocPageProps): IDocPageProps => ({
  title: 'Button',
  componentName: 'ButtonExample',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Button',
  examples: [
    {
      title: 'Default Button',
      code: ButtonDefaultExampleCode,
      view: <ButtonDefaultExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Compound Button',
      code: ButtonCompoundExampleCode,
      view: <ButtonCompoundExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Command Bar Button',
      code: ButtonCommandBarExampleCode,
      view: <ButtonCommandBarExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Split Button',
      code: ButtonSplitExampleCode,
      view: <ButtonSplitExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Icon Button',
      code: ButtonIconExampleCode,
      view: <ButtonIconExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Icon Button with Tooltip',
      code: ButtonIconWithTooltipExampleCode,
      view: <ButtonIconWithTooltipExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Contextual Menu Button',
      code: ButtonContextualMenuExampleCode,
      view: <ButtonContextualMenuExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Action Button',
      code: ButtonActionExampleCode,
      view: <ButtonActionExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Command Button',
      code: ButtonCommandExampleCode,
      view: <ButtonCommandExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Button-like Anchor',
      code: ButtonAnchorExampleCode,
      view: <ButtonAnchorExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Button with Aria Description for Screen Reader',
      code: ButtonScreenReaderExampleCode,
      view: <ButtonScreenReaderExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Custom Split Button',
      code: ButtonCustomSplitExampleCode,
      view: <ButtonSplitCustomExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
    {
      title: 'Toggle Button',
      code: ButtonToggleExampleCode,
      view: <ButtonToggleExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />,
    },
  ],

  allowNativeProps: true,
  nativePropsElement: ['a', 'button'],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/docs/ButtonOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Button/docs/ButtonBestPractices.md'),

  isHeaderVisible: true,
  isFeedbackVisible: true,
});
