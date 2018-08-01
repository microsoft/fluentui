import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';
import { Toggle } from 'office-ui-fabric-react/lib/components/Toggle';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { FluentCustomizations } from '../FluentCustomizations';

import { FluentStylesLinkExample } from './examples/FluentStyles.Link.Example';
import { FluentStylesButtonExample } from './examples/FluentStyles.Button.Example';
import { FluentStylesDialogExample } from './examples/FluentStyles.Dialog.Example';
import { FluentStylesBreadcrumbExample } from './examples/FluentStyles.Breadcrumb.Example';
import { FluentStylesCheckboxExample } from './examples/FluentStyles.Checkbox.Example';
import { FluentStylesChoiceGroupExample } from './examples/FluentStyles.ChoiceGroup.Example';
import { FluentStylesContextualMenuExample } from './examples/FluentStyles.ContextualMenu.Example';
import { FluentStylesLabelExample } from './examples/FluentStyles.Label.Example';
import { FluentStylesRatingExample } from './examples/FluentStyles.Rating.Example';
import { FluentStylesSliderExample } from './examples/FluentStyles.Slider.Example';
import { FluentStylesToggleExample } from './examples/FluentStyles.Toggle.Example';
import { FluentStylesTextFieldExample } from './examples/FluentStyles.TextField.Example';
import { FluentStylesPanelExample } from './examples/FluentStyles.Panel.Example';
import { FluentStylesComboBoxExample } from './examples/FluentStyles.ComboBox.Example';

const FluentBreadcrumbExampleCode = require('!raw-loader!./examples/FluentStyles.Breadcrumb.Example.tsx') as string;
const FluentButtonExampleCode = require('!raw-loader!./examples/FluentStyles.Button.Example.tsx') as string;
const FluentLinkExampleCode = require('!raw-loader!./examples/FluentStyles.Link.Example.tsx') as string;
const FluentDialogExampleCode = require('!raw-loader!./examples/FluentStyles.Dialog.Example.tsx') as string;
const FluentCheckboxExampleCode = require('!raw-loader!./examples/FluentStyles.Checkbox.Example.tsx') as string;
const FluentChoiceGroupExampleCode = require('!raw-loader!./examples/FluentStyles.ChoiceGroup.Example.tsx') as string;
const FluentLabelExampleCode = require('!raw-loader!./examples/FluentStyles.Label.Example.tsx') as string;
const FluentRatingExampleCode = require('!raw-loader!./examples/FluentStyles.Rating.Example.tsx') as string;
const FluentSliderExampleCode = require('!raw-loader!./examples/FluentStyles.Slider.Example.tsx') as string;
const FluentStylesToggleExampleCode = require('!raw-loader!./examples/FluentStyles.Toggle.Example.tsx') as string;

const FluentStylesContextualMenuExampleCode = require('!raw-loader!./examples/FluentStyles.ContextualMenu.Example.tsx') as string;
const FluentStylesTextFieldExampleCode = require('!raw-loader!./examples/FluentStyles.TextField.Example.tsx') as string;
const FluentStylesPanelExampleCode = require('!raw-loader!./examples/FluentStyles.Panel.Example.tsx') as string;
const FluentStylesComboBoxExampleCode = require('!raw-loader!./examples/FluentStyles.ComboBox.Example.tsx') as string;

export interface IFabricStylesPageState {
  isFluent?: boolean;
}

export class FluentStylesPage extends React.Component<IComponentDemoPageProps, IFabricStylesPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isFluent: true
    };
  }
  public render(): JSX.Element {
    const { isFluent } = this.state;
    return (
      <ComponentPage
        title="Fluent Component Styles"
        componentName="FluentStyles"
        overview={
          <div>
            <p>Press this Fluent button to make stuff fluenty :)</p>
            <Toggle label="Fluent" checked={isFluent} onChanged={this._onChangeToggle} />
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        exampleCards={
          <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
            <div>
              <ExampleCard title="Link - No Current Changes" code={FluentLinkExampleCode}>
                <FluentStylesLinkExample />
              </ExampleCard>
              <ExampleCard title="Breadcrumb" code={FluentBreadcrumbExampleCode}>
                <FluentStylesBreadcrumbExample />
              </ExampleCard>
              <ExampleCard title="Button" code={FluentButtonExampleCode}>
                <FluentStylesButtonExample />
              </ExampleCard>
              <ExampleCard title="Checkbox" code={FluentCheckboxExampleCode}>
                <FluentStylesCheckboxExample />
              </ExampleCard>
              <ExampleCard title="ChoiceGroup" code={FluentChoiceGroupExampleCode}>
                <FluentStylesChoiceGroupExample />
              </ExampleCard>
              <ExampleCard title="ComboBox" code={FluentStylesComboBoxExampleCode}>
                <FluentStylesComboBoxExample />
              </ExampleCard>
              <ExampleCard title="ContextualMenu" code={FluentStylesContextualMenuExampleCode}>
                <FluentStylesContextualMenuExample />
              </ExampleCard>
              <ExampleCard title="Dialog" code={FluentDialogExampleCode}>
                <FluentStylesDialogExample />
              </ExampleCard>
              <ExampleCard title="Label" code={FluentLabelExampleCode}>
                <FluentStylesLabelExample />
              </ExampleCard>
              <ExampleCard title="Panel" code={FluentStylesPanelExampleCode}>
                <FluentStylesPanelExample />
              </ExampleCard>
              <ExampleCard title="Rating - No Current Changes" code={FluentRatingExampleCode}>
                <FluentStylesRatingExample />
              </ExampleCard>
              <ExampleCard title="Slider - No Current Changes" code={FluentSliderExampleCode}>
                <FluentStylesSliderExample />
              </ExampleCard>
              <ExampleCard title="TextField" code={FluentStylesTextFieldExampleCode}>
                <FluentStylesTextFieldExample />
              </ExampleCard>
              <ExampleCard title="Toggle" code={FluentStylesToggleExampleCode}>
                <FluentStylesToggleExample />
              </ExampleCard>
            </div>
          </Customizer>
        }
      />
    );
  }

  private _onChangeToggle = (checked: boolean): void => {
    this.setState({ isFluent: checked });
  };
}
