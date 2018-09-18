import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';

import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
// tslint:disable:max-line-length
import { CollapsibleSectionRecursiveExample } from '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';

import { ThemeDialog } from './ThemeDialog';
import { defaultTheme, neutralTheme, softTheme, strongTheme, scopedSettings } from './Themes';

export class ThemingExample extends React.Component<{}, {}> {
  /**
   * Render various components using multiple Customizers.
   */
  protected _renderCustomizedComponents(): JSX.Element {
    return (
      <HorizontalStack gap={10}>
        <Customizer settings={{ theme: strongTheme }}>
          <HorizontalStack.Item grow={1}>
            <VerticalStack fillHorizontal={true} maxWidth="33%" padding={5}>
              <Text weight="bold">Strong Theme</Text>
              <CollapsibleSectionRecursiveExample />
            </VerticalStack>
          </HorizontalStack.Item>
        </Customizer>
        <HorizontalStack.Item grow={3}>
          <VerticalStack>
            <Customizer settings={{ theme: softTheme }}>
              <VerticalStack padding={5}>
                <Text weight="bold">Soft Theme</Text>
                <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
              </VerticalStack>
            </Customizer>
            <Customizer settings={{ theme: neutralTheme }}>
              <VerticalStack padding={5}>
                <Text weight="bold">Neutral Theme</Text>
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
    return <Customizer scopedSettings={scopedSettings}>{this._renderCustomizedComponents()}</Customizer>;
  }
}
