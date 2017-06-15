import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ButtonDefaultExample } from './examples/Button.Default.Example';
import { ButtonContextualMenuExample } from './examples/Button.ContextualMenu.Example';
import { ButtonPrimaryExample } from './examples/Button.Primary.Example';
import { ButtonCompoundExample } from './examples/Button.Compound.Example';
import { ButtonCommandExample } from './examples/Button.Command.Example';
import { ButtonIconExample } from './examples/Button.Icon.Example';
import { ButtonAnchorExample } from './examples/Button.Anchor.Example';
import { ButtonScreenReaderExample } from './examples/Button.ScreenReader.Example';
import { ButtonSwapExample } from './examples/Button.Swap.Example';
import { ButtonSplitExample, ButtonSplitCustomExample } from './examples/Button.Split.Example';
import './examples/Button.Basic.Example.scss';
import { Link } from '../../Link';

const ButtonDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Default.Example.tsx') as string;
const ButtonPrimaryExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Primary.Example.tsx') as string;
const ButtonCompoundExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Compound.Example.tsx') as string;
const ButtonCommandExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Command.Example.tsx') as string;
const ButtonIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Icon.Example.tsx') as string;
const ButtonAnchorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Anchor.Example.tsx') as string;
const ButtonScreenReaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.ScreenReader.Example.tsx') as string;
const ButtonContextualMenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.ContextualMenu.Example.tsx') as string;
const ButtonSwapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Swap.Example.tsx') as string;
const ButtonSplitExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Split.Example.tsx') as string;
const ButtonSplitCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Button/examples/Button.Split.Example.tsx') as string;

export interface IButtonDemoPageState {
  areButtonsDisabled?: boolean;
  areButtonsChecked?: boolean;
}

export class ButtonPage extends React.Component<IComponentDemoPageProps, IButtonDemoPageState> {
  constructor() {
    super();
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false
    };
  }

  public render() {
    return (
      <ComponentPage
        title='Button'
        componentName='ButtonExample'
        exampleCards={
          <div>
            <Checkbox label='Disable buttons' checked={ this.state.areButtonsDisabled } onChange={ this._onDisabledChanged.bind(this) } />
            <Checkbox label='Mark as checked' checked={ this.state.areButtonsChecked } onChange={ this._onToggledChanged.bind(this) } />
            <ExampleCard title='Default Button' code={ ButtonDefaultExampleCode }>
              <ButtonDefaultExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Primary Button' code={ ButtonPrimaryExampleCode }>
              <ButtonPrimaryExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Compound Button' code={ ButtonCompoundExampleCode }>
              <ButtonCompoundExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Command Button' code={ ButtonCommandExampleCode }>
              <ButtonCommandExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Icon Button' code={ ButtonIconExampleCode }>
              <ButtonIconExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Contextual Menu Button' code={ ButtonContextualMenuExampleCode }>
              <ButtonContextualMenuExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Button Like Anchor' code={ ButtonAnchorExampleCode }>
              <ButtonAnchorExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Button with Aria Description for Screen Reader' code={ ButtonScreenReaderExampleCode }>
              <ButtonScreenReaderExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='Button Swap with Focus State' code={ ButtonSwapExampleCode }>
              <ButtonSwapExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='SplitButton' code={ ButtonSplitExampleCode }>
              <ButtonSplitExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
            <ExampleCard title='' code={ ButtonSplitExampleCode }>
              <ButtonSplitCustomExample disabled={ this.state.areButtonsDisabled } checked={ this.state.areButtonsChecked } />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <div>
            <PropertiesTableSet
              sources={ [
                require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/Button.Props.ts')
              ] }
            />
            <p>Besides the above properties, the <code>Button</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
          </div>
        }
        overview={
          <div>
            <p>Buttons are best used to enable a user to commit a change or complete steps in a task. They are typically found inside forms, dialogs, panels or pages. An example of their usage is confirming the deletion of a file in a confirmation dialog.</p>
            <p>When considering their place in a layout, contemplate the order in which a user will flow through the UI. As an example, in a form, the individual will need to read and interact with the form fields before submiting the form. Therefore, as a general rule, the button should be placed at the bottom of the UI container (a dialog, panel, or page) which holds the related UI elements.</p>
            <p>While buttons can technically be used to navigate a user to another part of the experience, this is not recommended unless that navigation is part of an action or their flow.</p>
            <p>Note that both iconProps and menuIconProps take <Link href='#/examples/icon'>IIconProps</Link> to specify name and type.</p>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Button/Button.html'>Fabric JS</a>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Make sure the label conveys a clear purpose of the button to the user.</li>
              <li>Button labels must describe the action the button will perform and should include a verb. Use concise, specific, self-explanatory labels, usually a single word.</li>
              <li>Buttons should always include a noun if there is any room for interpretation about what the verb operates on.</li>
              <li>Consider the affect localization will have on the button and what will happen to components around it.</li>
              <li>If the button’s label content is dynamic, consider how the button will resize and what will happen to components around it.</li>
              <li>Use only a single line of text in the label of the button.</li>
              <li>Expose only one or two buttons to the user at a time, for example, "Accept" and "Cancel". If you need to expose more actions to the user, consider using checkboxes or radio buttons from which the user can select actions, with a single command button to trigger those actions.</li>
              <li>Show only one primary button that inherits theme color at rest state. In the event there are more than two buttons with equal priority, all buttons should have neutral backgrounds.</li>
              <li>"Submit", "OK", and "Apply" buttons should always be styled as primary buttons. When "Reset" or "Cancel" buttons appear alongside one of the above, they should be styled as secondary buttons.</li>
              <li>Default buttons should always perform safe operations. For example, a default button should never delete.</li>
              <li>Use task buttons to cause actions that complete a task or cause a transitional task. Do not use buttons to toggle other UX in the same context. For example, a button may be used to open an interface area but should not be used to open an additional set of components in the same interface.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use generic labels like "Ok," especially in the case of an error; errors are never "Ok."</li>
              <li>Don’t place the default focus on a button that destroys data. Instead, place the default focus on the button that performs the "safe act" and retains the content (i.e. "Save") or cancels the action (i.e. "Cancel").</li>
              <li>Don’t use a button to navigate to another place, use a link instead. The exception is in a wizard where "Back" and "Next" buttons may be used.</li>
              <li>Don’t put too much text in a button - try to keep the length of your text to a minimum.</li>
              <li>Don't put anything other than text in a button.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

  private _onDisabledChanged(ev: React.MouseEvent<HTMLElement>, disabled: boolean) {
    this.setState({
      areButtonsDisabled: disabled
    });
  }

  private _onToggledChanged(ev: React.MouseEvent<HTMLElement>, toggled: boolean) {
    this.setState({
      areButtonsChecked: toggled
    });
  }
}
