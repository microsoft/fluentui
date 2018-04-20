import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { ButtonStatus } from './Button.checklist';
import { ButtonDefaultExample } from './examples/Button.Default.Example';
import { ButtonContextualMenuExample } from './examples/Button.ContextualMenu.Example';
import { ButtonCompoundExample } from './examples/Button.Compound.Example';
import { ButtonActionExample } from './examples/Button.Action.Example';
import { ButtonCommandBarExample } from './examples/Button.CommandBar.Example';
import { ButtonIconExample } from './examples/Button.Icon.Example';
import { ButtonAnchorExample } from './examples/Button.Anchor.Example';
import { ButtonScreenReaderExample } from './examples/Button.ScreenReader.Example';
import { ButtonSwapExample } from './examples/Button.Swap.Example';
import { ButtonSplitExample, ButtonSplitCustomExample } from './examples/Button.Split.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as exampleStylesImport from '../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const ButtonDefaultExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Default.Example.tsx'
) as string;
const ButtonCompoundExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Compound.Example.tsx'
) as string;
const ButtonActionExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Action.Example.tsx'
) as string;
const ButtonCommandBarExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.CommandBar.Example.tsx'
) as string;
const ButtonIconExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Icon.Example.tsx'
) as string;
const ButtonAnchorExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Anchor.Example.tsx'
) as string;
const ButtonScreenReaderExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.ScreenReader.Example.tsx'
) as string;
const ButtonContextualMenuExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.ContextualMenu.Example.tsx'
) as string;
const ButtonSwapExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Swap.Example.tsx'
) as string;
const ButtonSplitExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Split.Example.tsx'
) as string;

export interface IButtonDemoPageState {
  areButtonsDisabled?: boolean;
  areButtonsChecked?: boolean;
}

export class ButtonPage extends React.Component<IComponentDemoPageProps, IButtonDemoPageState> {
  constructor(props: IComponentDemoPageProps) {
    super(props);
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false
    };
  }

  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Button'
        componentName='ButtonExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Button'
        exampleCards={
          <div>
            <Checkbox
              className={ exampleStyles.exampleCheckbox }
              label='Disable buttons'
              checked={ this.state.areButtonsDisabled }
              onChange={ this._onDisabledChanged.bind(this) }
            />
            <Checkbox
              className={ exampleStyles.exampleCheckbox }
              label='Mark as checked'
              checked={ this.state.areButtonsChecked }
              onChange={ this._onToggledChanged.bind(this) }
            />
            <ExampleCard title='Default Button' code={ ButtonDefaultExampleCode }>
              <ButtonDefaultExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Compound Button' code={ ButtonCompoundExampleCode }>
              <ButtonCompoundExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Command Bar Button' code={ ButtonCommandBarExampleCode }>
              <ButtonCommandBarExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Split Button' code={ ButtonSplitExampleCode }>
              <ButtonSplitExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Icon Button' code={ ButtonIconExampleCode }>
              <ButtonIconExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Contextual Menu Button' code={ ButtonContextualMenuExampleCode }>
              <ButtonContextualMenuExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Action Button' code={ ButtonActionExampleCode }>
              <ButtonActionExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
          </div>
        }
        implementationExampleCards={
          <div>
            <ExampleCard title='Button Like Anchor' code={ ButtonAnchorExampleCode }>
              <ButtonAnchorExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Button with Aria Description for Screen Reader' code={ ButtonScreenReaderExampleCode }>
              <ButtonScreenReaderExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Button Swap with Focus State' code={ ButtonSwapExampleCode }>
              <ButtonSwapExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Custom Split Button' code={ ButtonSplitExampleCode }>
              <ButtonSplitCustomExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        nativePropsElement={ ['a', 'button'] }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/Button.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ButtonStatus }
          />
        }
      />
    );
  }

  private _onDisabledChanged(ev: React.MouseEvent<HTMLElement>, disabled: boolean): void {
    this.setState({
      areButtonsDisabled: disabled
    });
  }

  private _onToggledChanged(ev: React.MouseEvent<HTMLElement>, toggled: boolean): void {
    this.setState({
      areButtonsChecked: toggled
    });
  }
}
