// @codepen
import * as React from 'react';
import { Text } from '@uifabric/experiments';
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { mergeStyleSets, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '../Card';

const alertClicked = (): void => {
  alert('Clicked');
};
export class CardCompactExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      siteText: {
        color: '#025F52',
        fontSize: 12,
        fontWeight: FontWeights.semibold
      },
      descriptionText: {
        color: '#333333',
        fontSize: 14,
        fontWeight: FontWeights.regular
      },
      helpfulText: {
        color: '#333333',
        fontSize: 12,
        fontWeight: FontWeights.regular
      },
      icon: {
        color: '#0078D4',
        fontSize: 16,
        fontWeight: FontWeights.regular
      }
    });

    return (
      <Stack gap={20}>
        <Card compact={true}>
          <Text>Basic compact card</Text>
        </Card>

        <Card compact={true} onClick={alertClicked}>
          <Card.Item tokens={{ margin: '-12px 0 -12px -12px' }}>
            <Image src="https://placehold.it/180x135" />
          </Card.Item>
          <Stack gap={12}>
            <Text className={styles.siteText}>Contoso</Text>
            <Text className={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
            <Text className={styles.helpfulText}>Is this recommendation helpful?</Text>
          </Stack>
          <Stack gap={16} padding="0 0 0 12px" styles={{ root: { borderLeft: '1px solid #F3F2F1' } }}>
            <Icon iconName="RedEye" className={styles.icon} />
            <Icon iconName="SingleBookmark" className={styles.icon} />
            <Stack.Item grow={1}>
              <span />
            </Stack.Item>
            <Icon iconName="MoreVertical" className={styles.icon} />
          </Stack>
        </Card>
      </Stack>
    );
  }
}
