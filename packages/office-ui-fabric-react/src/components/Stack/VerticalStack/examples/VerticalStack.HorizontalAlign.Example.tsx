import * as React from 'react';
import { VerticalStack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        selectors: {
          '> *': {
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white
          }
        }
      }
    });

    return (
      <VerticalStack gap={5}>
        <span>Left-aligned</span>
        <VerticalStack horizontalAlign="left" className={styles.root}>
          <span>1</span>
          <span>2</span>
        </VerticalStack>

        <span>Horizontally centered</span>
        <VerticalStack horizontalAlign="center" className={styles.root}>
          <span>1</span>
          <span>2</span>
        </VerticalStack>

        <span>Right-aligned</span>
        <VerticalStack horizontalAlign="right" className={styles.root}>
          <span>1</span>
          <span>2</span>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
