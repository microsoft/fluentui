import { Flex, Image, Text, Card, cardFocusableBehavior, Grid, gridBehavior } from '@fluentui/react-northstar';
import * as React from 'react';

type ClickableCardProps = {
  index?: number;
};

const ClickableCard: React.FC<ClickableCardProps> = ({ index }) => {
  const [clickCount, setClickCount] = React.useState(0);
  const updateClickCount = () => {
    setClickCount(count => count + 1);
  };

  return (
    <Card accessibility={cardFocusableBehavior} onClick={updateClickCount} aria-roledescription="clickable card">
      <Card.Header>
        <Text content={`Card #${index}`} weight="bold" />
        <Text content={`Card was clicked ${clickCount} times.`} temporary />
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" />
        </Flex>
      </Card.Body>
    </Card>
  );
};

const CardExampleFocusableGrid = () => (
  <Grid accessibility={gridBehavior} columns="3">
    <ClickableCard index={1} />
    <ClickableCard index={2} />
    <ClickableCard index={3} />
    <ClickableCard index={4} />
    <ClickableCard index={5} />
    <ClickableCard index={6} />
    <ClickableCard index={7} />
    <ClickableCard index={9} />
    <ClickableCard index={10} />
    <ClickableCard index={11} />
    <ClickableCard index={12} />
  </Grid>
);

export default CardExampleFocusableGrid;
