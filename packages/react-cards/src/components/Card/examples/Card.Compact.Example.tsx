// @codepen
import * as React from 'react';
import { Icon, Image, Stack, Text } from 'office-ui-fabric-react';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '@uifabric/react-cards';

const alertClicked = (): void => {
  alert('Clicked');
};
export class CardCompactExample extends React.Component<{}, {}> {
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
      },
      footerCardSection: {
        root: {
          borderLeft: '1px solid #F3F2F1'
        }
      }
    };

    const tokens = {
      sectionStack: {
        childrenGap: 20
      },
      card: {
        childrenMargin: 12
      },
      footerCardSection: {
        padding: '0px 0px 0px 12px'
      }
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Card compact tokens={tokens.card}>
          <Card.Item>
            <Text>Basic compact card</Text>
          </Card.Item>
        </Card>

        <Card compact onClick={alertClicked} tokens={tokens.card}>
          <Card.Item fill>
            <Image src="https://placehold.it/180x135" alt="Placeholder image." />
          </Card.Item>
          <Card.Section>
            <Text styles={styles.siteText}>Contoso</Text>
            <Text styles={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
            <Text styles={styles.helpfulText}>Is this recommendation helpful?</Text>
          </Card.Section>
          <Card.Section styles={styles.footerCardSection} tokens={tokens.footerCardSection}>
            <Icon iconName="RedEye" styles={styles.icon} />
            <Icon iconName="SingleBookmark" styles={styles.icon} />
            <Stack.Item grow={1}>
              <span />
            </Stack.Item>
            <Icon iconName="MoreVertical" styles={styles.icon} />
          </Card.Section>
        </Card>
      </Stack>
    );
  }
}
