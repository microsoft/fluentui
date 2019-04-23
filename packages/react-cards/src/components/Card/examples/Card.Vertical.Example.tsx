import * as React from 'react';
import { ActionButton, Button, Persona } from '@uifabric/experiments';
import { Icon, Image, Stack, Text } from 'office-ui-fabric-react';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '@uifabric/react-cards';

const alertClicked = (): void => {
  alert('Clicked');
};

export class CardVerticalExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = {
      siteText: {
        root: {
          color: '#025F52',
          fontWeight: FontWeights.semibold
        }
      },
      descriptionText: {
        root: {
          color: '#333333',
          fontWeight: FontWeights.semibold
        }
      },
      helpfulText: {
        root: {
          color: '#333333',
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
          borderTop: '1px solid #F3F2F1'
        }
      },
      backgroundImageCardSection: {
        root: {
          backgroundImage: 'url(http://wallpoper.com/images/00/37/51/21/landscapes-night_00375121.jpg)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          height: 144
        }
      },
      dateText: {
        root: {
          color: 'white',
          fontWeight: 600 as 600
        }
      },
      subduedText: {
        root: {
          color: '#666666'
        }
      },
      actionButton: {
        root: {
          border: 'none',
          color: '#333333',
          height: 'auto',
          minHeight: 0,
          minWidth: 0,

          selectors: {
            ':hover': {
              color: '#0078D4'
            }
          }
        },
        stack: {
          padding: 0
        },
        content: {
          fontSize: 12,
          fontWeight: FontWeights.semibold
        }
      }
    };

    const tokens = {
      sectionStack: {
        childrenGap: 30
      },
      card: {
        childrenMargin: 12
      },
      footerCardSection: {
        padding: '12px 0px 0px'
      },
      backgroundImageCardSection: {
        padding: 12
      },
      agendaCardSection: {
        childrenGap: 0
      },
      attendantsCardSection: {
        childrenGap: 6
      },
      footerCardItem: {
        margin: '12px 12px 6px',
        padding: '6px 0px 0px'
      },
      addEventButton: {
        backgroundColor: 'transparent',
        backgroundColorHovered: 'transparent',
        backgroundColorPressed: 'transparent',
        borderColor: 'transparent',
        borderColorHovered: 'transparent',
        borderColorPressed: 'transparent',
        colorHovered: '#0078D4',
        colorPressed: '#0078D4',
        contentPadding: 0,
        iconColor: '#0078D4',
        iconColorHovered: '#0078D4',
        iconColorPressed: '#0078D4',
        textSize: 12,
        textWeight: FontWeights.regular
      }
    };

    return (
      <Stack horizontal tokens={tokens.sectionStack}>
        <Card>
          <Card.Item>
            <Text>Basic vertical card</Text>
          </Card.Item>
        </Card>

        <Card onClick={alertClicked} tokens={tokens.card}>
          <Card.Item>
            <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
          </Card.Item>
          <Card.Item fill>
            <Image src="https://placehold.it/256x144" width="100%" alt="Placeholder image." />
          </Card.Item>
          <Card.Section>
            <Text variant="small" styles={styles.siteText}>
              Contoso
            </Text>
            <Text styles={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
            <Text variant="small" styles={styles.helpfulText}>
              Is this recommendation helpful?
            </Text>
          </Card.Section>
          <Card.Section horizontal styles={styles.footerCardSection} tokens={tokens.footerCardSection}>
            <Icon iconName="RedEye" styles={styles.icon} />
            <Icon iconName="SingleBookmark" styles={styles.icon} />
            <Stack.Item grow={1}>
              <span />
            </Stack.Item>
            <Icon iconName="MoreVertical" styles={styles.icon} />
          </Card.Section>
        </Card>

        <Card onClick={alertClicked} tokens={tokens.card}>
          <Card.Section fill verticalAlign="end" styles={styles.backgroundImageCardSection} tokens={tokens.backgroundImageCardSection}>
            <Text variant="large" styles={styles.dateText}>
              NOVEMBER
            </Text>
            <Text variant="superLarge" styles={styles.dateText}>
              26
            </Text>
          </Card.Section>
          <Card.Section>
            <Text variant="small" styles={styles.subduedText}>
              Category
            </Text>
            <Text styles={styles.descriptionText}>Contoso marketing customer visit and survey results</Text>
          </Card.Section>
          <Card.Section tokens={tokens.agendaCardSection}>
            <Text variant="small" styles={styles.descriptionText}>
              Tuesday 2:00-4:30 pm
            </Text>
            <Text variant="small" styles={styles.subduedText}>
              Conf Room 34/1301
            </Text>
          </Card.Section>
          <Card.Item grow={1}>
            <span />
          </Card.Item>
          <Card.Section horizontal tokens={tokens.attendantsCardSection}>
            <ActionButton content="12 Attendees" styles={styles.actionButton} />
            <ActionButton content="4 Accepted" styles={styles.actionButton} />
            <ActionButton content="3 Declined" styles={styles.actionButton} />
          </Card.Section>
          <Card.Item styles={styles.footerCardSection} tokens={tokens.footerCardItem}>
            <Button icon="Add" content="Add to Outlook" tokens={tokens.addEventButton} />
          </Card.Item>
        </Card>
      </Stack>
    );
  }
}
