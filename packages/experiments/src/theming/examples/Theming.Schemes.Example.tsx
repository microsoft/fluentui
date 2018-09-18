import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';

import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
// tslint:disable:max-line-length
import { CollapsibleSectionRecursiveExample } from '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';

import { schemeThemeCustom, schemeThemeVariants, scopedSettings } from './Themes';
import { ThemeDialog } from './ThemeDialog';

export interface IThemingExampleState {
  bodyToggle: boolean;
  sideToggle: boolean;
  topToggle: boolean;
}

export class ThemingExample extends React.Component<{}, IThemingExampleState> {
  constructor(props: IThemingExampleState) {
    super(props);

    this.state = {
      bodyToggle: false,
      sideToggle: false,
      topToggle: false
    };
  }

  /**
   * Render various components only using scheme names (no Customizers.)
   */
  protected _renderSchemedComponents(): JSX.Element {
    const bodyScheme = this.state.bodyToggle ? 'soft' : 'neutral';
    const sideScheme = this.state.sideToggle ? 'neutral' : 'strong';
    const topScheme = this.state.topToggle ? 'strong' : 'soft';
    const bodyCaption = 'Scheme: ' + bodyScheme;
    const sideCaption = 'Scheme: ' + sideScheme;
    const topCaption = 'Scheme: ' + topScheme;

    return (
      <HorizontalStack gap={10}>
        <HorizontalStack.Item grow={1}>
          <VerticalStack gap={10} scheme={sideScheme} fillHorizontal={true} maxWidth="33%" padding={5}>
            <Text weight="bold">{sideCaption}</Text>
            <Toggle offText={sideCaption} onText={sideCaption} onChange={this.toggleSide} />
            <CollapsibleSectionRecursiveExample />
          </VerticalStack>
        </HorizontalStack.Item>
        <HorizontalStack.Item grow={3}>
          <VerticalStack>
            <VerticalStack gap={10} scheme={topScheme} padding={5}>
              <HorizontalStack horizontalAlign="space-between">
                <Text weight="bold">{topCaption}</Text>
                <Toggle offText={topCaption} onText={topCaption} onChange={this.toggleTop} />
              </HorizontalStack>
              <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
            </VerticalStack>
            <VerticalStack fillVertical={true} gap={10} scheme={bodyScheme} padding={5}>
              <HorizontalStack horizontalAlign="space-between">
                <Text weight="bold">{bodyCaption}</Text>
                <Toggle offText={bodyCaption} onText={bodyCaption} onChange={this.toggleBody} />
              </HorizontalStack>
              <VerticalStack.Item scheme="default">
                <ThemeDialog buttonText="Default Theme" />
              </VerticalStack.Item>
              <VerticalStack.Item scheme="strong">
                <ThemeDialog buttonText="Strong Scheme" />
              </VerticalStack.Item>
              <VerticalStack.Item scheme="soft">
                <ThemeDialog buttonText="Soft Scheme" />
              </VerticalStack.Item>
              <ThemeDialog buttonText="Inherited Scheme" />
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack.Item>
      </HorizontalStack>
    );
  }

  private toggleBody = () => {
    this.setState((state: IThemingExampleState) => this.setState({ bodyToggle: !state.bodyToggle }));
  };

  private toggleSide = () => {
    this.setState((state: IThemingExampleState) => this.setState({ sideToggle: !state.sideToggle }));
  };

  private toggleTop = () => {
    this.setState((state: IThemingExampleState) => this.setState({ topToggle: !state.topToggle }));
  };
}

export class ThemingSchemesVariantExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <Customizer settings={{ theme: schemeThemeVariants }} scopedSettings={scopedSettings}>
        {this._renderSchemedComponents()}
      </Customizer>
    );
  }
}

export class ThemingSchemesCustomExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <Customizer settings={{ theme: schemeThemeCustom }} scopedSettings={scopedSettings}>
        {this._renderSchemedComponents()}
      </Customizer>
    );
  }
}
