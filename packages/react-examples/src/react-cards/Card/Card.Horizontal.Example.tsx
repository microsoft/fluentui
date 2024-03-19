import * as React from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@fluentui/react-cards';
import { FontWeights, Icon, IIconStyles, Image, Stack, IStackTokens, Text, ITextStyles } from '@fluentui/react';

/* eslint-disable deprecation/deprecation */

const alertClicked = (): void => {
  alert('Clicked');
};
const siteTextStyles: ITextStyles = {
  root: {
    color: '#025F52',
    fontWeight: FontWeights.semibold,
  },
};
const descriptionTextStyles: ITextStyles = {
  root: {
    color: '#333333',
    fontWeight: FontWeights.regular,
  },
};
const helpfulTextStyles: ITextStyles = {
  root: {
    color: '#333333',
    fontWeight: FontWeights.regular,
  },
};
const iconStyles: IIconStyles = {
  root: {
    color: '#0078D4',
    fontSize: 16,
    fontWeight: FontWeights.regular,
  },
};
const footerCardSectionStyles: ICardSectionStyles = {
  root: {
    alignSelf: 'stretch',
    borderLeft: '1px solid #F3F2F1',
  },
};

const sectionStackTokens: IStackTokens = { childrenGap: 20 };
const cardTokens: ICardTokens = { childrenMargin: 12 };
const footerCardSectionTokens: ICardSectionTokens = { padding: '0px 0px 0px 12px' };

export const CardHorizontalExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={sectionStackTokens}>
      <Card aria-label="Basic horizontal card" horizontal tokens={cardTokens}>
        <Card.Item>
          <Text>Basic horizontal card</Text>
        </Card.Item>
      </Card>

      <Card aria-label="Clickable horizontal card " horizontal onClick={alertClicked} tokens={cardTokens}>
        <Card.Item fill>
          <Image
            src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg"
            alt="Placeholder image."
            height={135}
            width={180}
          />
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
};
