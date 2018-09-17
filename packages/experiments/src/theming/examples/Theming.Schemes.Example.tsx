import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';

import { HorizontalStack, VerticalStack, IStackProps, IStackStyles } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
// tslint:disable:max-line-length
import { CollapsibleSectionRecursiveExample } from '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';
import { IThemedProps } from '../../Foundation';
import { schemeThemeCustom, schemeThemeVariants, defaultTheme } from './Themes';
import { ThemeDialog } from './ThemeDialog';

// TODO: requiring users to type this way is frictiony. find a way to reduce props typing
export const stackStyles = (props: IThemedProps<IStackProps>): IStackStyles => {
  return {
    root: {
      backgroundColor: props.theme.semanticColors.bodyBackground
    }
  };
};

export class ThemingExample extends React.Component<{}, {}> {
  /**
   * Render various components only using scheme names (no Customizers.)
   */
  protected _renderSchemedComponents(): JSX.Element {
    return (
      <HorizontalStack gap={10} styles={stackStyles}>
        <HorizontalStack.Item grow={1}>
          <VerticalStack gap={10} scheme="strong" maxWidth="25%" styles={stackStyles}>
            <Text>Strong Scheme</Text>
            <Checkbox label="Default Theme (Scoped)" />
            <Toggle offText="Current Scheme" onText="Current Scheme" />
            <CollapsibleSectionRecursiveExample />
          </VerticalStack>
        </HorizontalStack.Item>
        <HorizontalStack.Item grow={3}>
          <VerticalStack styles={stackStyles}>
            <VerticalStack gap={10} scheme="soft" styles={stackStyles}>
              <Text>Soft Scheme</Text>
              <Checkbox label="Default Theme (Scoped)" />
              <Toggle offText="Current Scheme" onText="Current Scheme" />
              <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
            </VerticalStack>
            <VerticalStack gap={10} scheme="neutral" styles={stackStyles}>
              <Text>Neutral Scheme</Text>
              <Checkbox label="Default Theme (Scoped)" />
              <Toggle offText="Current Scheme" onText="Current Scheme" />
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
}

export class ThemingSchemesVariantExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <Customizer settings={{ theme: schemeThemeVariants }} scopedSettings={{ Checkbox: { theme: defaultTheme } }}>
        {this._renderSchemedComponents()}
      </Customizer>
    );
  }
}

export class ThemingSchemesCustomExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <Customizer settings={{ theme: schemeThemeCustom }} scopedSettings={{ Checkbox: { theme: defaultTheme } }}>
        {this._renderSchemedComponents()}
      </Customizer>
    );
  }
}

export class ThemingSchemesDefaultExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <div>
        <h3>TODO: This will not work until variants are created in default theme.</h3>
        {this._renderSchemedComponents()}
      </div>
    );
  }
}
