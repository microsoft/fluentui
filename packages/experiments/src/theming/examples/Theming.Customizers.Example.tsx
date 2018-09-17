import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';

import { HorizontalStack, VerticalStack, IStackProps, IStackStyles } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
// tslint:disable:max-line-length
import { CollapsibleSectionRecursiveExample } from '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';
import { IThemedProps } from '../../Foundation';
import { ThemeDialog } from './ThemeDialog';
import { defaultTheme, neutralTheme, softTheme, strongTheme } from './Themes';

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
   * Render various components using multiple Customizers.
   */
  protected _renderCustomizedComponents(): JSX.Element {
    return (
      <HorizontalStack gap={10} styles={stackStyles}>
        <Customizer settings={{ theme: strongTheme }}>
          <HorizontalStack.Item grow={1}>
            <VerticalStack maxWidth="25%" styles={stackStyles}>
              <Text>Strong Theme</Text>
              <CollapsibleSectionRecursiveExample />
            </VerticalStack>
          </HorizontalStack.Item>
        </Customizer>
        <HorizontalStack.Item grow={3}>
          <VerticalStack styles={stackStyles}>
            <Customizer settings={{ theme: softTheme }}>
              <VerticalStack styles={stackStyles}>
                <Text>Soft Theme</Text>
                <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
              </VerticalStack>
            </Customizer>
            <Customizer settings={{ theme: neutralTheme }}>
              <VerticalStack styles={stackStyles}>
                <Text>Neutral Theme</Text>
                <Customizer settings={{ theme: defaultTheme }}>
                  <ThemeDialog buttonText="Default Theme" />
                </Customizer>
                <Customizer settings={{ theme: strongTheme }}>
                  <ThemeDialog buttonText="Strong Theme" />
                </Customizer>
                <Customizer settings={{ theme: softTheme }}>
                  <ThemeDialog buttonText="Soft Theme" />
                </Customizer>
                <ThemeDialog buttonText="Inherited Theme" />
              </VerticalStack>
            </Customizer>
          </VerticalStack>
        </HorizontalStack.Item>
      </HorizontalStack>
    );
  }
}

export class ThemingBasicExample extends ThemingExample {
  public render(): JSX.Element {
    return this._renderCustomizedComponents();
  }
}
