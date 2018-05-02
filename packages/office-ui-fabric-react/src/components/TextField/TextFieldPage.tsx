import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldBorderlessExample } from './examples/TextField.Borderless.Example';
import { TextFieldCustomRenderExample } from './examples/TextField.CustomRender.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { TextFieldIconExample } from './examples/TextField.Icon.Example';
import { TextFieldMultilineExample } from './examples/TextField.Multiline.Example';
import { TextFieldPlaceholderExample } from './examples/TextField.Placeholder.Example';
import { TextFieldPrefixExample } from './examples/TextField.Prefix.Example';
import { TextFieldPrefixAndSuffixExample } from './examples/TextField.PrefixAndSuffix.Example';
import { TextFieldStatus } from './TextField.checklist';
import { TextFieldSuffixExample } from './examples/TextField.Suffix.Example';
import { TextFieldUnderlinedExample } from './examples/TextField.Underlined.Example';
import { TextFieldAutoCompleteExample } from './examples/TextField.AutoComplete.Example';
import { TextFieldOnRenderDescriptionExample } from './examples/TextField.OnRenderDescription.Example';

const TextFieldBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx') as string;
const TextFieldBorderlessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx') as string;
const TextFieldCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx') as string;
const TextFieldErrorMessageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx') as string;
const TextFieldIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Icon.Example.tsx') as string;
const TextFieldMultilineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx') as string;
const TextFieldPlaceholderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Placeholder.Example.tsx') as string;
const TextFieldPrefixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Prefix.Example.tsx') as string;
const TextFieldPrefixAndSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.PrefixAndSuffix.Example.tsx') as string;
const TextFieldSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Suffix.Example.tsx') as string;
const TextFieldUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Underlined.Example.tsx') as string;
const TextFieldAutoCompleteExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.AutoComplete.Example.tsx') as string;
const TextFieldOnRenderDescriptionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.OnRenderDescription.Example.tsx') as string;

export class TextFieldPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='TextField'
        componentName='TextFieldExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/TextField'
        exampleCards={
          <div>
            <ExampleCard
              title='Default TextField with Label'
              code={ TextFieldBasicExampleCode }
            >
              <TextFieldBasicExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with Placeholder'
              code={ TextFieldPlaceholderExampleCode }
            >
              <TextFieldPlaceholderExample />
            </ExampleCard>
            <ExampleCard
              title='Multiline TextField'
              code={ TextFieldMultilineExampleCode }
            >
              <TextFieldMultilineExample />
            </ExampleCard>
            <ExampleCard
              title='Underlined TextField'
              code={ TextFieldUnderlinedExampleCode }
            >
              <TextFieldUnderlinedExample />
            </ExampleCard>
            <ExampleCard
              title='Borderless TextField'
              code={ TextFieldBorderlessExampleCode }
            >
              <TextFieldBorderlessExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with browser AutoComplete'
              code={ TextFieldAutoCompleteExampleCode }
            >
              <TextFieldAutoCompleteExample />
            </ExampleCard>
          </div>
        }
        implementationExampleCards={
          <div>
            <ExampleCard
              title='Textfield with a prefix'
              code={ TextFieldPrefixExampleCode }
            >
              <TextFieldPrefixExample />
            </ExampleCard>
            <ExampleCard
              title='Textfield with a suffix'
              code={ TextFieldSuffixExampleCode }
            >
              <TextFieldSuffixExample />
            </ExampleCard>
            <ExampleCard
              title='Textfield with a prefix and a suffix'
              code={ TextFieldPrefixAndSuffixExampleCode }
            >
              <TextFieldPrefixAndSuffixExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with an icon'
              code={ TextFieldIconExampleCode }
            >
              <TextFieldIconExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with custom Label'
              code={ TextFieldCustomRenderExampleCode }
            >
              <TextFieldCustomRenderExample />
            </ExampleCard>
            <ExampleCard
              title='TextField with custom description'
              code={ TextFieldOnRenderDescriptionExampleCode }
            >
              <TextFieldOnRenderDescriptionExample />
            </ExampleCard>
            <ExampleCard
              title='TextField error message variations'
              code={ TextFieldErrorMessageExampleCode }
            >
              <TextFieldErrorMessageExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        nativePropsElement={ ['input', 'textarea'] }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/TextField.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...TextFieldStatus }
          />
        }
      />
    );
  }
}
