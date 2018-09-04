import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const padding = 10;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary
      }
    });

    return (
      <VerticalStack gap={5}>
        <Text>Left-aligned</Text>
        <VerticalStack horizontalAlign="left" padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </VerticalStack>

        <Text>Horizontally centered</Text>
        <VerticalStack horizontalAlign="center" padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </VerticalStack>

        <Text>Right-aligned</Text>
        <VerticalStack horizontalAlign="right" padding={padding} className={styles.root}>
          <Text>Item One</Text>
          <Text>Item Two</Text>
          <Text>Item Three</Text>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
