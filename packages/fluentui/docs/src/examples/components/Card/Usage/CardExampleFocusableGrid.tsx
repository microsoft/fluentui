import {
  Flex,
  Image,
  Text,
  Card,
  cardFocusableBehavior,
  Grid,
  cardsContainerBehavior,
} from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

type ClickableCardProps = {
  index?: number;
};

const ClickableCard: React.FC<ClickableCardProps> = ({ index }) => {
  const [clickCount, setClickCount] = React.useState(0);
  const updateClickCount = () => {
    setClickCount(count => count + 1);
  };

  return (
    <Card accessibility={cardFocusableBehavior} onClick={updateClickCount} aria-roledescription="user card">
      <Card.Header>
        <Text content={`Card #${index}`} weight="bold" />
        <Text content={`Card was clicked ${clickCount} times.`} temporary />
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
        </Flex>
      </Card.Body>
    </Card>
  );
};

const CardExampleFocusableGrid = () => {
  const cardsNumber = 12;

  return (
    <Grid accessibility={cardsContainerBehavior} columns={3}>
      {_.times(cardsNumber, i => {
        const nonZeroIndex = i + 1;
        return (
          <ClickableCard key={nonZeroIndex} index={nonZeroIndex} aria-label={`${nonZeroIndex} of ${cardsNumber}`} />
        );
      })}
    </Grid>
  );
};

export default CardExampleFocusableGrid;
