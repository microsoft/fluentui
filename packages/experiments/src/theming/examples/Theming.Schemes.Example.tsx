import * as React from 'react';

import { CommandBar, Customizer, Stack, Toggle, Text } from 'office-ui-fabric-react';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';

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
      <Stack horizontal gap={10}>
        <Stack.Item grow={true} styles={{ root: { width: '33%', maxWidth: '33%' } }}>
          <ThemeProvider scheme={sideScheme}>
            <Stack styles={regionStyles} gap={10} padding={5}>
              <Text>{sideCaption}</Text>
              <Toggle offText={sideCaption} onText={sideCaption} onChange={this.toggleSide} />
              <CollapsibleSectionRecursiveExample />
            </Stack>
          </ThemeProvider>
        </Stack.Item>
        <Stack.Item grow={true} styles={{ root: { height: 'auto' } }}>
          <Stack grow={true} verticalFill={true}>
            <ThemeProvider scheme={topScheme}>
              <Stack styles={regionStyles} gap={10} padding={5}>
                <Stack horizontal horizontalAlign="space-between">
                  <Text>{topCaption}</Text>
                  <Toggle offText={topCaption} onText={topCaption} onChange={this.toggleTop} />
                </Stack>
                <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
              </Stack>
            </ThemeProvider>
            <ThemeProvider scheme={bodyScheme}>
              <Stack styles={regionStyles} verticalFill={true} padding={5}>
                <Stack horizontal horizontalAlign="space-between">
                  <Text>{bodyCaption}</Text>
                  <Toggle offText={bodyCaption} onText={bodyCaption} onChange={this.toggleBody} />
                </Stack>
                <ThemeProvider scheme="default">
                  <Stack.Item>
                    <DialogExample buttonText="Default Theme" />
                  </Stack.Item>
                </ThemeProvider>
                <ThemeProvider scheme="strong">
                  <Stack.Item>
                    <DialogExample buttonText="Strong Scheme" />
                  </Stack.Item>
                </ThemeProvider>
                <ThemeProvider scheme="soft">
                  <Stack.Item>
                    <DialogExample buttonText="Soft Scheme" />
                  </Stack.Item>
                </ThemeProvider>
                <DialogExample buttonText="Inherited Scheme" />
              </Stack>
            </ThemeProvider>
          </Stack>
        </Stack.Item>
      </Stack>
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
