import * as React from 'react';

import { CommandBar, Customizer, Toggle } from 'office-ui-fabric-react';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';
import { HorizontalStack, Text, VerticalStack } from '@uifabric/experiments';

// tslint:disable:max-line-length
import { CollapsibleSectionRecursiveExample } from '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';

import { ThemeProvider } from '../../Foundation';
import { regionStyles, schemeThemeCustom, schemeThemeVariants } from './Themes';
import { DialogExample } from './DialogExample';

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

    // TODO: Even though this styles function is the same for all regions, it has to be provided whenever the scheme
    //        is changed to apply the new semanticColors. Is this the best way we can do this?
    return (
      <HorizontalStack gap={10}>
        <HorizontalStack.Item grow={true} styles={{ root: { width: '33%', maxWidth: '33%' } }}>
          <ThemeProvider scheme={sideScheme}>
            <VerticalStack styles={regionStyles} gap={10} padding={5}>
              <Text weight="bold">{sideCaption}</Text>
              <Toggle offText={sideCaption} onText={sideCaption} onChange={this.toggleSide} />
              <CollapsibleSectionRecursiveExample />
            </VerticalStack>
          </ThemeProvider>
        </HorizontalStack.Item>
        <HorizontalStack.Item grow={true} styles={{ root: { height: 'auto' } }}>
          <VerticalStack grow={true} fillVertical={true}>
            <ThemeProvider scheme={topScheme}>
              <VerticalStack styles={regionStyles} gap={10} padding={5}>
                <HorizontalStack horizontalAlign="space-between">
                  <Text weight="bold">{topCaption}</Text>
                  <Toggle offText={topCaption} onText={topCaption} onChange={this.toggleTop} />
                </HorizontalStack>
                <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
              </VerticalStack>
            </ThemeProvider>
            <ThemeProvider scheme={bodyScheme}>
              <VerticalStack styles={regionStyles} fillVertical={true} padding={5}>
                <HorizontalStack horizontalAlign="space-between">
                  <Text weight="bold">{bodyCaption}</Text>
                  <Toggle offText={bodyCaption} onText={bodyCaption} onChange={this.toggleBody} />
                </HorizontalStack>
                <ThemeProvider scheme="default">
                  <VerticalStack.Item>
                    <DialogExample buttonText="Default Theme" />
                  </VerticalStack.Item>
                </ThemeProvider>
                <ThemeProvider scheme="strong">
                  <VerticalStack.Item>
                    <DialogExample buttonText="Strong Scheme" />
                  </VerticalStack.Item>
                </ThemeProvider>
                <ThemeProvider scheme="soft">
                  <VerticalStack.Item>
                    <DialogExample buttonText="Soft Scheme" />
                  </VerticalStack.Item>
                </ThemeProvider>
                <DialogExample buttonText="Inherited Scheme" />
              </VerticalStack>
            </ThemeProvider>
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
    return <Customizer settings={{ theme: schemeThemeVariants }}>{this._renderSchemedComponents()}</Customizer>;
  }
}

export class ThemingSchemesCustomExample extends ThemingExample {
  public render(): JSX.Element {
    return <Customizer settings={{ theme: schemeThemeCustom }}>{this._renderSchemedComponents()}</Customizer>;
  }
}
