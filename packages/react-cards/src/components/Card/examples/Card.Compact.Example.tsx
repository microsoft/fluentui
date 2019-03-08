// @codepen
import * as React from 'react';
import { Text } from '@uifabric/experiments';
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '../Card';

const alertClicked = (): void => {
  alert('Clicked');
};
export class CardCompactExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      siteText: {
        color: '#025F52',
        fontSize: 14,
        fontWeight: 600
      },
      descriptionText: {
        color: '#33332D',
        fontSize: 16,
        fontWeight: 600
      },
      helpfulText: {
        color: '#323130',
        fontSize: 14,
        fontWeight: 600
      }
    });

    return (
      <Stack gap={20}>
        <Card compact={true} gap={12} tokens={{ padding: 12 }}>
          Basic compact card
        </Card>

        <Card compact={true} gap={12} tokens={{ padding: 12 }} onClick={alertClicked}>
          <Card.Item tokens={{ margin: '-12px 0 -12px -12px' }}>
            <Image
              src="https://placehold.it/180x135"
              alt="Example implementation of the property image fit using the center value on an image larger than the frame."
            />
          </Card.Item>
          <Stack gap={12}>
            <Text className={styles.siteText}>Contoso</Text>
            <Text className={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
            <Text className={styles.helpfulText}>Is this recommendation helpful?</Text>
          </Stack>
          <Stack gap={16} padding="0 0 0 12px" styles={{ root: { borderLeft: '1px solid #F3F2F1' } }}>
            <Icon iconName="RedEye" styles={{ root: { color: '#0078D4', fontSize: 16 } }} />
            <Icon iconName="SingleBookmark" styles={{ root: { color: '#0078D4', fontSize: 16 } }} />
            <Stack.Item grow={1}>
              <span />
            </Stack.Item>
            <Icon iconName="MoreVertical" styles={{ root: { color: '#0078D4', fontSize: 16 } }} />
          </Stack>
        </Card>
      </Stack>
    );
  }
}
