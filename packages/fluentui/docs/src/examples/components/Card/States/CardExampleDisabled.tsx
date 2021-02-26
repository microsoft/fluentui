import { Image, Text, Card } from '@fluentui/react-northstar';
import * as React from 'react';
import { useBooleanKnob } from '@fluentui/docs-components';

const CardExampleDisabled = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const [inverted] = useBooleanKnob({ name: 'inverted', initialValue: false });
  const [ghost] = useBooleanKnob({ name: 'ghost', initialValue: false });
  const updateClickCount = () => {
    setClickCount(count => count + 1);
  };

  return (
    <Card onClick={updateClickCount} disabled aria-roledescription="disabled card" inverted={inverted} ghost={ghost}>
      <Card.Header>
        <Text content={`Card was clicked ${clickCount} times.`} weight="bold" />
      </Card.Header>
      <Card.Body>
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
      </Card.Body>
    </Card>
  );
};

export default CardExampleDisabled;
