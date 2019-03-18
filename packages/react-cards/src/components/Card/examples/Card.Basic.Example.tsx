import * as React from 'react';
import { Persona, Text } from '@uifabric/experiments';
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '../Card';

const alertClicked = (): void => {
  alert('Clicked');
};

export class CardBasicExample extends React.Component<{}, {}> {
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
      <Stack horizontal tokens={{ childrenGap: 30 }}>
        <Card>
          <Text>Basic card</Text>
        </Card>

        <Card tokens={{ width: '220px' }} onClick={alertClicked}>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
          <Card.Item tokens={{ margin: '0 -13px' }}>
            <Image
              src="https://placehold.it/250x120"
              alt="Example implementation of the property image fit using the center value on an image larger than the frame."
              width="100%"
              height="120px"
            />
          </Card.Item>
          <Text className={styles.siteText}>Contoso</Text>
          <Text className={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
          <Text className={styles.helpfulText}>Is this recommendation helpful?</Text>
          <Card.Item>
            <Stack horizontal tokens={{ childrenGap: 16 }} padding="12px 0 0" styles={{ root: { borderTop: '1px solid #F3F2F1' } }}>
              <Icon iconName="RedEye" styles={{ root: { color: '#0078D4', fontSize: 16 } }} />
              <Icon iconName="SingleBookmark" styles={{ root: { color: '#0078D4', fontSize: 16 } }} />
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <Icon iconName="MoreVertical" styles={{ root: { color: '#0078D4', fontSize: 16 } }} />
            </Stack>
          </Card.Item>
        </Card>
      </Stack>
    );
  }
}
