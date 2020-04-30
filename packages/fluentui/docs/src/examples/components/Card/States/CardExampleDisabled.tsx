import { Flex, Image, Text, Card } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleDisabled = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const updateClickCount = () => {
    setClickCount(count => count + 1);
  };

  return (
    <Card onClick={updateClickCount} disabled aria-roledescription="disabled card">
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

export default CardExampleDisabled;
