import * as React from 'react';
import { Persona, Text } from '@uifabric/experiments';
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '../Card';

const alertClicked = (): void => {
  alert('Clicked');
};

export class CardBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = {
      siteText: {
        root: {
          color: '#025F52',
          fontSize: 12,
          fontWeight: FontWeights.semibold
        }
      },
      descriptionText: {
        root: {
          color: '#333333',
          fontSize: 14,
          fontWeight: FontWeights.regular
        }
      },
      helpfulText: {
        root: {
          color: '#333333',
          fontSize: 12,
          fontWeight: FontWeights.regular
        }
      },
      icon: {
        root: {
          color: '#0078D4',
          fontSize: 16,
          fontWeight: FontWeights.regular
        }
      }
    };

    const tokens = {
      sectionStack: {
        childrenGap: 30
      },
      cardFooterStack: {
        childrenGap: 16
      },
      narrowCard: {
        width: 212
      }
    };

    return (
      <Stack horizontal tokens={tokens.sectionStack}>
        <Card>
          <Text>Basic card</Text>
        </Card>

        <Card onClick={alertClicked} tokens={tokens.narrowCard}>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
          <Card.Item tokens={{ margin: '0 -13px' }}>
            <Image src="https://placehold.it/256x144" width="100%" alt="Placeholder image." />
          </Card.Item>
          <Text styles={styles.siteText}>Contoso</Text>
          <Text styles={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
          <Text styles={styles.helpfulText}>Is this recommendation helpful?</Text>
          <Card.Item>
            <Stack horizontal tokens={tokens.cardFooterStack} padding="12px 0 0" styles={{ root: { borderTop: '1px solid #F3F2F1' } }}>
              <Icon iconName="RedEye" styles={styles.icon} />
              <Icon iconName="SingleBookmark" styles={styles.icon} />
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <Icon iconName="MoreVertical" styles={styles.icon} />
            </Stack>
          </Card.Item>
        </Card>

        <Card onClick={alertClicked}>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
          <Card.Item tokens={{ margin: '0 -13px' }}>
            <Image src="https://placehold.it/256x144" width="100%" alt="Placeholder image." />
          </Card.Item>
          <Text styles={styles.siteText}>Contoso</Text>
          <Text styles={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
          <Text styles={styles.helpfulText}>Is this recommendation helpful?</Text>
          <Card.Item>
            <Stack horizontal tokens={tokens.cardFooterStack} padding="12px 0 0" styles={{ root: { borderTop: '1px solid #F3F2F1' } }}>
              <Icon iconName="RedEye" styles={styles.icon} />
              <Icon iconName="SingleBookmark" styles={styles.icon} />
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <Icon iconName="MoreVertical" styles={styles.icon} />
            </Stack>
          </Card.Item>
        </Card>
      </Stack>
    );
  }
}
