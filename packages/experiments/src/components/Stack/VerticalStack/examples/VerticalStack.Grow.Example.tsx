import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackGrowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const padding = 10;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: 200
      },

      item: {
        background: `${DefaultPalette.white}55`,
        border: `1px solid ${DefaultPalette.neutralPrimary}`
      }
    });

    return (
      <VerticalStack gap={5}>
        <VerticalStack gap={5} padding={padding} className={styles.root}>
          <VerticalStack.Item grow={3} className={styles.item}>
            <Text>Grow is 3</Text>
          </VerticalStack.Item>
          <VerticalStack.Item grow className={styles.item}>
            <Text>Grow is 1</Text>
          </VerticalStack.Item>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
