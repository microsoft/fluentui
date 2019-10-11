/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFullWidth } from '../utilities';
import { Button, IButtonStyles, IButtonTokens } from '@uifabric/experiments';
import {
  Card,
  ICardStyles,
  ICardTokens,
  ICardItemStyles,
  ICardItemTokens,
  ICardSectionStyles,
  ICardSectionTokens
} from '@uifabric/react-cards';
import {
  ActionButton,
  Fabric,
  FontWeights,
  Icon,
  IIconStyles,
  Image,
  Persona,
  Stack,
  Text,
  ITextStyles
} from 'office-ui-fabric-react';

const cardClicked = (): void => {
  /** no-impl **/
};

// Styles used in story examples.
const siteTextStyles: ITextStyles = {
  root: {
    color: '#025F52',
    fontWeight: FontWeights.semibold
  }
};
const descriptionTextStyles: ITextStyles = {
  root: {
    color: '#333333',
    fontWeight: FontWeights.semibold
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
    borderTop: '1px solid #F3F2F1'
  }
};
const backgroundImageCardSectionStyles: ICardSectionStyles = {
  root: {
    backgroundImage: 'url(https://placehold.it/256x144)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: 144
  }
};
const dateTextStyles: ITextStyles = {
  root: {
    color: '#505050',
    fontWeight: 600
  }
};
const subduedTextStyles: ITextStyles = {
  root: {
    color: '#666666'
  }
};
const actionButtonStyles: IButtonStyles = {
  root: {
    border: 'none',
    color: '#333333',
    height: 'auto',
    minHeight: 0,
    minWidth: 0,
    padding: 0,

    selectors: {
      ':hover': {
        color: '#0078D4'
      }
    }
  },
  content: {
    fontSize: 12,
    fontWeight: FontWeights.semibold
  }
};
const footerHorizontalCardSectionStyles: ICardSectionStyles = {
  root: {
    borderLeft: '1px solid #F3F2F1'
  }
};
const cardStyles: ICardStyles = {
  root: {
    backgroundColor: '#D8F6FF'
  }
};
const cardSectionOrItemStyles: ICardSectionStyles | ICardItemStyles = {
  root: {
    borderStyle: 'dashed',
    borderWidth: '2px'
  }
};
const firstCardSectionStyles: ICardSectionStyles = {
  root: {
    backgroundColor: '#B0DEFF',
    borderColor: '#2566CA',
    ...(cardSectionOrItemStyles.root as object)
  }
};
const secondCardSectionStyles: ICardSectionStyles = {
  root: {
    backgroundColor: '#ABFFEF',
    borderColor: '#0F7A67',
    ...(cardSectionOrItemStyles.root as object)
  }
};
const thirdCardSectionStyles: ICardSectionStyles = {
  root: {
    backgroundColor: '#E8D4FF',
    borderColor: '#7742B3',
    ...(cardSectionOrItemStyles.root as object)
  }
};

// Tokens used in story examples.
const cardTokens: ICardTokens = { childrenMargin: 12 };
const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };
const agendaCardSectionTokens: ICardSectionTokens = { childrenGap: 0 };
const attendantsCardSectionTokens: ICardSectionTokens = { childrenGap: 6 };
const footerCardItemTokens: ICardItemTokens = {
  margin: '12px 12px 6px',
  padding: '6px 0px 0px'
};
const addEventButtonTokens: IButtonTokens = {
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
};
const footerHorizontalCardSectionTokens: ICardSectionTokens = { padding: '0px 0px 0px 12px' };
const cardSectionTokens: ICardSectionTokens = {
  childrenGap: 6,
  padding: 6
};

storiesOf('Card', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Card')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      {story()}
    </Screener>
  )
  .addStory('Vertical Card - Basic - Non hoverable', () => (
    <Fabric>
      <Card>
        <Card.Item>
          <Text>Basic vertical card</Text>
        </Card.Item>
      </Card>
    </Fabric>
  ))
  .addStory('Vertical Card - Basic - Hoverable', () => (
    <Fabric>
      <Card onClick={cardClicked}>
        <Card.Item>
          <Text>Basic vertical card</Text>
        </Card.Item>
      </Card>
    </Fabric>
  ))
  .addStory('Vertical Card - Example with contents - Image on top', () => (
    <Fabric>
      <Card onClick={cardClicked} tokens={cardTokens}>
        <Card.Item>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
        </Card.Item>
        <Card.Item fill>
          <Image src="https://placehold.it/256x144" width="100%" alt="Placeholder image." />
        </Card.Item>
        <Card.Section>
          <Text variant="medium" styles={siteTextStyles}>
            Contoso
          </Text>
          <Text styles={descriptionTextStyles}>
            Contoso Denver expansion design marketing hero guidelines
          </Text>
          <Text variant="medium" styles={helpfulTextStyles}>
            Is this recommendation helpful?
          </Text>
        </Card.Section>
        <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
          <Icon iconName="RedEye" styles={iconStyles} />
          <Icon iconName="SingleBookmark" styles={iconStyles} />
          <Stack.Item grow={1}>
            <span />
          </Stack.Item>
          <Icon iconName="MoreVertical" styles={iconStyles} />
        </Card.Section>
      </Card>
    </Fabric>
  ))
  .addStory('Vertical Card - Example with contents - Image in middle', () => (
    <Fabric>
      <Card onClick={cardClicked} tokens={cardTokens}>
        <Card.Section
          fill
          verticalAlign="end"
          styles={backgroundImageCardSectionStyles}
          tokens={backgroundImageCardSectionTokens}
        >
          <Text variant="xLarge" styles={dateTextStyles}>
            NOVEMBER
          </Text>
          <Text variant="superLarge" styles={dateTextStyles}>
            26
          </Text>
        </Card.Section>
        <Card.Section>
          <Text variant="medium" styles={subduedTextStyles}>
            Category
          </Text>
          <Text styles={descriptionTextStyles}>
            Contoso marketing customer visit and survey results
          </Text>
        </Card.Section>
        <Card.Section tokens={agendaCardSectionTokens}>
          <Text variant="medium" styles={descriptionTextStyles}>
            Tuesday 2:00-4:30 pm
          </Text>
          <Text variant="medium" styles={subduedTextStyles}>
            Conf Room 34/1301
          </Text>
        </Card.Section>
        <Card.Item grow={1}>
          <span />
        </Card.Item>
        <Card.Section horizontal tokens={attendantsCardSectionTokens}>
          <ActionButton content="12 Attendees" styles={actionButtonStyles} />
          <ActionButton content="4 Accepted" styles={actionButtonStyles} />
          <ActionButton content="3 Declined" styles={actionButtonStyles} />
        </Card.Section>
        <Card.Item styles={footerCardSectionStyles} tokens={footerCardItemTokens}>
          <Button icon="Add" content="Add to Outlook" tokens={addEventButtonTokens} />
        </Card.Item>
      </Card>
    </Fabric>
  ))
  .addStory('Horizontal Card - Basic - Non hoverable', () => (
    <Fabric>
      <Card horizontal>
        <Card.Item>
          <Text>Basic horizontal card</Text>
        </Card.Item>
      </Card>
    </Fabric>
  ))
  .addStory('Horizontal Card - Basic - Hoverable', () => (
    <Fabric>
      <Card horizontal onClick={cardClicked}>
        <Card.Item>
          <Text>Basic horizontal card</Text>
        </Card.Item>
      </Card>
    </Fabric>
  ))
  .addStory('Horizontal Card - Example with contents', () => (
    <Fabric>
      <Card horizontal onClick={cardClicked} tokens={cardTokens}>
        <Card.Item fill>
          <Image src="https://placehold.it/180x135" alt="Placeholder image." />
        </Card.Item>
        <Card.Section>
          <Text variant="medium" styles={siteTextStyles}>
            Contoso
          </Text>
          <Text styles={descriptionTextStyles}>
            Contoso Denver expansion design marketing hero guidelines
          </Text>
          <Text variant="medium" styles={helpfulTextStyles}>
            Is this recommendation helpful?
          </Text>
        </Card.Section>
        <Card.Section
          styles={footerHorizontalCardSectionStyles}
          tokens={footerHorizontalCardSectionTokens}
        >
          <Icon iconName="RedEye" styles={iconStyles} />
          <Icon iconName="SingleBookmark" styles={iconStyles} />
          <Stack.Item grow={1}>
            <span />
          </Stack.Item>
          <Icon iconName="MoreVertical" styles={iconStyles} />
        </Card.Section>
      </Card>
    </Fabric>
  ))
  .addStory('Card with first CardSection filled', () => (
    <Card styles={cardStyles} tokens={cardTokens}>
      <Card.Section fill styles={firstCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
      <Card.Section styles={secondCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
      <Card.Section styles={thirdCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
    </Card>
  ))
  .addStory('Card with second CardSection filled', () => (
    <Card styles={cardStyles} tokens={cardTokens}>
      <Card.Section styles={firstCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
      <Card.Section fill styles={secondCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
      <Card.Section styles={thirdCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
    </Card>
  ))
  .addStory('Card with third CardSection filled', () => (
    <Card styles={cardStyles} tokens={cardTokens}>
      <Card.Section styles={firstCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
      <Card.Section styles={secondCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
      <Card.Section fill styles={thirdCardSectionStyles} tokens={cardSectionTokens}>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
        <Text>This is a Card Section</Text>
      </Card.Section>
    </Card>
  ));
