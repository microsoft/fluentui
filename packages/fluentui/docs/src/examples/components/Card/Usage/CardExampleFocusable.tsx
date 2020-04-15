import { Flex, Image, Text, Card, cardFocusableBehavior } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleClickable = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const updateClickCount = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <Card accessibility={cardFocusableBehavior} onClick={updateClickCount} ariaRoleDescription="clickable card">
      <Card.Header>
        <Text content={`Card was clicked ${clickCount} times.`} weight="bold" />
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" />
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default CardExampleFocusable;
