import * as React from 'react';
import { Persona, Text } from '@uifabric/experiments';
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { mergeStyleSets, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '../Card';

const alertClicked = (): void => {
  alert('Clicked');
};

export class CardBasicExample extends React.Component<{}, {}> {
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

    const tokens = {
      sectionStack: {
        childrenGap: 30
      },
      cardFooterStack: {
        childrenGap: 16
      }
    };

    return (
      <Stack horizontal tokens={tokens.sectionStack}>
        <Card>
          <Text>Basic card</Text>
        </Card>

        <Card onClick={alertClicked}>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
          <Card.Item tokens={{ margin: '0 -13px' }}>
            <Image src="https://placehold.it/286x144" width="100%" />
          </Card.Item>
          <Text className={styles.siteText}>Contoso</Text>
          <Text className={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
          <Text className={styles.helpfulText}>Is this recommendation helpful?</Text>
          <Card.Item>
            <Stack horizontal tokens={tokens.cardFooterStack} padding="12px 0 0" styles={{ root: { borderTop: '1px solid #F3F2F1' } }}>
              <Icon iconName="RedEye" className={styles.icon} />
              <Icon iconName="SingleBookmark" className={styles.icon} />
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <Icon iconName="MoreVertical" className={styles.icon} />
            </Stack>
          </Card.Item>
        </Card>
      </Stack>
    );
  }
}
