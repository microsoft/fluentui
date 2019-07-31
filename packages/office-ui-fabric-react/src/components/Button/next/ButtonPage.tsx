import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, Markdown, PropertiesTableSet } from '@uifabric/example-app-base';
import { KeytipLayer } from 'office-ui-fabric-react';

import { ButtonExample } from './examples/Button.Example';
import { MenuButtonExample } from './MenuButton/examples/MenuButton.Example';
import { SplitButtonExample } from './SplitButton/examples/SplitButton.Example';
import { ButtonKeytipsExample } from './examples/Button.Keytips.Example';
import { ButtonSlotsExample } from './examples/Button.Slots.Example';
import { ButtonStylesExample } from './examples/Button.Styles.Example';
import { ButtonToggleExample } from './examples/Button.Toggle.Example';
import { ButtonTokensExample } from './examples/Button.Tokens.Example';
import { ButtonVariantsExample } from './examples/Button.Variants.Example';

const ButtonExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Example.tsx') as string;
const MenuButtonExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/MenuButton/examples/MenuButton.Example.tsx') as string;
const SplitButtonExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/SplitButton/examples/SplitButton.Example.tsx') as string;
const ButtonKeytipsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Keytips.Example.tsx') as string;
const ButtonSlotsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Slots.Example.tsx') as string;
const ButtonStylesExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Styles.Example.tsx') as string;
const ButtonToggleExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Toggle.Example.tsx') as string;
const ButtonTokensExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Tokens.Example.tsx') as string;
const ButtonVariantsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Variants.Example.tsx') as string;

export class ButtonPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Button"
        componentName=" Button"
        exampleCards={
          <div>
            <ExampleCard title="Button Ramps" code={ButtonExampleCode}>
              <ButtonExample />
            </ExampleCard>
            <ExampleCard title="Menu Button Examples" code={MenuButtonExampleCode}>
              <MenuButtonExample />
            </ExampleCard>
            <ExampleCard title="Split Button Examples" code={SplitButtonExampleCode}>
              <SplitButtonExample />
            </ExampleCard>
            <ExampleCard title="Button Variants Examples" code={ButtonVariantsExampleCode}>
              <ButtonVariantsExample />
            </ExampleCard>
            <ExampleCard title="Toggle Button Examples" code={ButtonToggleExampleCode}>
              <ButtonToggleExample />
            </ExampleCard>
            <ExampleCard title="Buttons with Keytips" code={ButtonKeytipsExampleCode}>
              <ButtonKeytipsExample />
            </ExampleCard>
            <ExampleCard title="Button Slots Customization" code={ButtonSlotsExampleCode}>
              <ButtonSlotsExample />
            </ExampleCard>
            <ExampleCard title="Button Styles Customization" code={ButtonStylesExampleCode}>
              <ButtonStylesExample />
            </ExampleCard>
            <ExampleCard title="Button Tokens Customization" code={ButtonTokensExampleCode}>
              <ButtonTokensExample />
            </ExampleCard>
            <KeytipLayer content="Alt Windows" />
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/experiments/src/components/Button/Button.types.tsx'),
              require<string>('!raw-loader!@uifabric/experiments/src/components/Button/MenuButton/MenuButton.types.tsx'),
              require<string>('!raw-loader!@uifabric/experiments/src/components/Button/SplitButton/SplitButton.types.tsx')
            ]}
          />
        }
        overview={<Markdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Button/docs/ButtonOverview.md')}</Markdown>}
        bestPractices={<div />}
        dos={<Markdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Button/docs/ButtonDos.md')}</Markdown>}
        donts={<Markdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Button/docs/ButtonDonts.md')}</Markdown>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
