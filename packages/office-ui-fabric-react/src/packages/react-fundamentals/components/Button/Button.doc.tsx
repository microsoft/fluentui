import * as React from 'react';
import { ButtonDefaultExample } from './examples/Button.Default.Example';
import { ButtonContextualMenuExample } from './examples/Button.ContextualMenu.Example';
import { ButtonCompoundExample } from './examples/Button.Compound.Example';
import { ButtonActionExample } from './examples/Button.Action.Example';
import { ButtonCommandBarExample } from './examples/Button.CommandBar.Example';
import { ButtonCommandExample } from './examples/Button.Command.Example';
import { ButtonIconExample } from './examples/Button.Icon.Example';
import { ButtonAnchorExample } from './examples/Button.Anchor.Example';
import { ButtonScreenReaderExample } from './examples/Button.ScreenReader.Example';
import { ButtonSplitExample } from './examples/Button.Split.Example';
import { ButtonSplitCustomExample } from './examples/Button.CustomSplit.Example';
import { ButtonToggleExample } from './examples/Button.Toggle.Example';
import { IDocPageProps } from '../../common/DocPage.types';

const ButtonActionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Action.Example.tsx') as string;
const ButtonAnchorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Anchor.Example.tsx') as string;
const ButtonCommandBarExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.CommandBar.Example.tsx') as string;
const ButtonCompoundExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Compound.Example.tsx') as string;
const ButtonContextualMenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.ContextualMenu.Example.tsx') as string;
const ButtonCustomSplitExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.CustomSplit.Example.tsx') as string;
const ButtonDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Default.Example.tsx') as string;
const ButtonIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Icon.Example.tsx') as string;
const ButtonScreenReaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.ScreenReader.Example.tsx') as string;
const ButtonSplitExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Split.Example.tsx') as string;
const ButtonToggleExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Toggle.Example.tsx') as string;
const ButtonCommandExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Command.Example.tsx') as string;

export interface IButtonDocPageProps {
  areButtonsDisabled: boolean;
  areButtonsChecked: boolean;
}

/**
 * Exports a function because the documentation of this page requires some interactivity that is passed in here as a prop
 * @param props Props that are specific to generating page props for ButtonPage
 */
export const ButtonPageProps = (props: IButtonDocPageProps): IDocPageProps => ({
  title: 'Button',
  componentName: 'ButtonExample',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Button',
  examples: [
    {
      title: 'Default Button',
      code: ButtonDefaultExampleCode,
      view: <ButtonDefaultExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Compound Button',
      code: ButtonCompoundExampleCode,
      view: <ButtonCompoundExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Command Bar Button',
      code: ButtonCommandBarExampleCode,
      view: <ButtonCommandBarExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Split Button',
      code: ButtonSplitExampleCode,
      view: <ButtonSplitExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Icon Button',
      code: ButtonIconExampleCode,
      view: <ButtonIconExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Contextual Menu Button',
      code: ButtonContextualMenuExampleCode,
      view: <ButtonContextualMenuExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Action Button',
      code: ButtonActionExampleCode,
      view: <ButtonActionExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Command Button',
      code: ButtonCommandExampleCode,
      view: <ButtonCommandExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Button-like Anchor',
      code: ButtonAnchorExampleCode,
      view: <ButtonAnchorExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Button with Aria Description for Screen Reader',
      code: ButtonScreenReaderExampleCode,
      view: <ButtonScreenReaderExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Custom Split Button',
      code: ButtonCustomSplitExampleCode,
      view: <ButtonSplitCustomExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    },
    {
      title: 'Toggle Button',
      code: ButtonToggleExampleCode,
      view: <ButtonToggleExample disabled={props.areButtonsDisabled} checked={props.areButtonsChecked} />
    }
  ],

  allowNativeProps: true,
  nativePropsElement: ['a', 'button'],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonOverview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
});
