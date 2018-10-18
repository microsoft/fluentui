import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
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
import { FluentStylesDropdownExample } from './examples/FluentStyles.Dropdown.Example';

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
const FluentStylesDropdownExampleCode = require('!raw-loader!./examples/FluentStyles.Dropdown.Example.tsx') as string;

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
            <Toggle label="Fluent" checked={isFluent} onChange={this._onChangeToggle} />
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        exampleCards={
          <div>
            {/* <ExampleCard title="Link - No Current Changes" code={FluentLinkExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesLinkExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Breadcrumb" code={FluentBreadcrumbExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesBreadcrumbExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Button" code={FluentButtonExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesButtonExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Checkbox" code={FluentCheckboxExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesCheckboxExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="ChoiceGroup" code={FluentChoiceGroupExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesChoiceGroupExample />
              </Customizer>
            </ExampleCard> */}
            <ExampleCard title="Dropdown" code={FluentStylesDropdownExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesDropdownExample />
              </Customizer>
            </ExampleCard>
            {/* <ExampleCard title="ComboBox" code={FluentStylesComboBoxExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesComboBoxExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="ContextualMenu" code={FluentStylesContextualMenuExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesContextualMenuExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Dialog" code={FluentDialogExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesDialogExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Label" code={FluentLabelExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesLabelExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Panel" code={FluentStylesPanelExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesPanelExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Rating - No Current Changes" code={FluentRatingExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesRatingExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Slider - No Current Changes" code={FluentSliderExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesSliderExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="TextField" code={FluentStylesTextFieldExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesTextFieldExample />
              </Customizer>
            </ExampleCard>
            <ExampleCard title="Toggle" code={FluentStylesToggleExampleCode}>
              <Customizer {...(isFluent ? FluentCustomizations : undefined)}>
                <FluentStylesToggleExample />
              </Customizer>
            </ExampleCard> */}
          </div>
        }
      />
    );
  }

  private _onChangeToggle = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isFluent: checked });
  };
}
