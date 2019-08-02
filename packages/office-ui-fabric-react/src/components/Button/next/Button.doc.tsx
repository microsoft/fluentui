import * as React from 'react';
import { KeytipLayer } from 'office-ui-fabric-react';
import { IDocPageProps } from '../../../common/DocPage.types';

import { ButtonExample } from './examples/Button.Example';
import { MenuButtonExample } from './MenuButton/examples/MenuButton.Example';
import { SplitButtonExample } from './SplitButton/examples/SplitButton.Example';
import { ButtonKeytipsExample } from './examples/Button.Keytips.Example';
import { ButtonSlotsExample } from './examples/Button.Slots.Example';
import { ButtonStylesExample } from './examples/Button.Styles.Example';
import { ButtonToggleExample } from './examples/Button.Toggle.Example';
import { ButtonTokensExample } from './examples/Button.Tokens.Example';
import { ButtonVariantsExample } from './examples/Button.Variants.Example';

const ButtonExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Example.tsx') as string;
const MenuButtonExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/MenuButton/examples/MenuButton.Example.tsx') as string;
const SplitButtonExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/SplitButton/examples/SplitButton.Example.tsx') as string;
const ButtonKeytipsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Keytips.Example.tsx') as string;
const ButtonSlotsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Slots.Example.tsx') as string;
const ButtonStylesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Styles.Example.tsx') as string;
const ButtonToggleExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Toggle.Example.tsx') as string;
const ButtonTokensExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Tokens.Example.tsx') as string;
const ButtonVariantsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/next/examples/Button.Variants.Example.tsx') as string;

/**
 * Exports a function because the documentation of this page requires some interactivity that is passed in here as a prop
 * @param props Props that are specific to generating page props for ButtonPage
 */
export const ButtonPageProps: IDocPageProps = {
  title: 'Button',
  componentName: 'ButtonExample',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Button/next',
  examples: [
    {
      title: 'Button Ramps',
      code: ButtonExampleCode,
      view: <ButtonExample />
    },
    {
      title: 'Menu Button Examples',
      code: MenuButtonExampleCode,
      view: <MenuButtonExample />
    },
    {
      title: 'Split Button Examples',
      code: SplitButtonExampleCode,
      view: <SplitButtonExample />
    },
    {
      title: 'Button Variants Examples',
      code: ButtonVariantsExampleCode,
      view: <ButtonVariantsExample />
    },
    {
      title: 'Toggle Button Examples',
      code: ButtonToggleExampleCode,
      view: <ButtonToggleExample />
    },
    {
      title: 'Buttons with Keytips',
      code: ButtonKeytipsExampleCode,
      view: (
        <>
          <ButtonKeytipsExample />
          <KeytipLayer content="Alt Windows" />
        </>
      )
    },
    {
      title: 'Button Slots Customization',
      code: ButtonSlotsExampleCode,
      view: <ButtonSlotsExample />
    },
    {
      title: 'Button Styles Customization',
      code: ButtonStylesExampleCode,
      view: <ButtonStylesExample />
    },
    {
      title: 'Button Tokens Customization',
      code: ButtonTokensExampleCode,
      view: <ButtonTokensExample />
    }
  ],

  allowNativeProps: true,
  nativePropsElement: ['a', 'button'],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonOverview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
