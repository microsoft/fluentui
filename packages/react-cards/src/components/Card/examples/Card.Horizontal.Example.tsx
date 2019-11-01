// @codepen
import * as React from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { FontWeights } from '@uifabric/styling';
import { Icon, IIconStyles, Image, Stack, IStackTokens, Text, ITextStyles } from 'office-ui-fabric-react';

const alertClicked = (): void => {
  alert('Clicked');
};
export class CardHorizontalExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const siteTextStyles: ITextStyles = {
      root: {
        color: '#025F52',
        fontWeight: FontWeights.semibold
      }
    };
    const descriptionTextStyles: ITextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.regular
      }
    };
    const helpfulTextStyles: ITextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.regular
      }
    };
    const iconStyles: IIconStyles = {
      root: {
        color: '#0078D4',
        fontSize: 16,
        fontWeight: FontWeights.regular
      }
    };
    const footerCardSectionStyles: ICardSectionStyles = {
      root: {
        borderLeft: '1px solid #F3F2F1'
      }
    };

    const sectionStackTokens: IStackTokens = { childrenGap: 20 };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = { padding: '0px 0px 0px 12px' };

    return (
      <Stack tokens={sectionStackTokens}>
        <Card horizontal tokens={cardTokens}>
          <Card.Item>
            <Text>Basic horizontal card</Text>
          </Card.Item>
        </Card>

        <Card horizontal onClick={alertClicked} tokens={cardTokens}>
          <Card.Item fill>
            <Image src="https://placehold.it/180x135" alt="Placeholder image." />
          </Card.Item>
          <Card.Section>
            <Text variant="small" styles={siteTextStyles}>
              Contoso
            </Text>
            <Text styles={descriptionTextStyles}>Contoso Denver expansion design marketing hero guidelines</Text>
            <Text variant="small" styles={helpfulTextStyles}>
              Is this recommendation helpful?
            </Text>
          </Card.Section>
          <Card.Section styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
            <Icon iconName="RedEye" styles={iconStyles} />
            <Icon iconName="SingleBookmark" styles={iconStyles} />
            <Stack.Item grow={1}>
              <span />
            </Stack.Item>
            <Icon iconName="MoreVertical" styles={iconStyles} />
          </Card.Section>
        </Card>
      </Stack>
    );
  }
}
