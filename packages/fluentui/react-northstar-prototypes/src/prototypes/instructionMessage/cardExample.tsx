import * as React from 'react';
import * as _ from 'lodash';
import {
  Flex,
  Text,
  Card,
  Grid,
  cardsContainerBehavior,
  cardChildrenFocusableBehavior,
  Button,
  StarIcon,
  DownloadIcon,
  MoreIcon,
} from '@fluentui/react-northstar';

const names = [
  'Beatris',
  'Theodore',
  'Raylene',
  'Exie',
  'Mozell',
  'Tim',
  'Dann',
  'Carlyn',
  'Virgil',
  'Olin',
  'Beatris',
  'Theodore',
  'Raylene',
  'Exie',
  'Mozell',
  'Tim',
  'Dann',
  'Carlyn',
  'Virgil',
  'Olin',
];
const positions = [
  'Art Director',
  'Janitor',
  'Landscaper',
  'Zoologist',
  'Groundskeeper',
  'Economist',
  'Social Worker',
  'Artist',
  'Electrician',
  'Computer Specialist',
  'Art Director',
  'Janitor',
  'Landscaper',
  'Zoologist',
  'Groundskeeper',
  'Economist',
  'Social Worker',
  'Artist',
  'Electrician',
  'Computer Specialist',
];

const SampleCard = ({ index, ...unhandledProps }) => {
  return (
    <Card
      id={`card_${index}`}
      accessibility={cardChildrenFocusableBehavior}
      aria-roledescription="user card"
      {...unhandledProps}
    >
      <Card.Header>
        <Text content={`${names[index]}`} weight="bold" id={`cardUserName_${index}`} />
        <Text content={`${positions[index]}`} temporary id={`cardUserPosition_${index}`} />
      </Card.Header>
      <Card.Footer>
        <Flex space="between">
          <Button content="Action" />
          <Flex>
            <Button icon={<StarIcon />} iconOnly text title="Favourite" />
            <Button icon={<DownloadIcon />} iconOnly text title="Download" />
            <Button icon={<MoreIcon />} iconOnly text title="More" />
          </Flex>
        </Flex>
      </Card.Footer>
    </Card>
  );
};

const CardExampleFocusableGrid = () => {
  const navigationMessageId = 'navigationMessage';
  const timeout = React.useRef();
  const cardsNumber = 18;

  const cleanup = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  React.useEffect(() => cleanup, []);
  return (
    <>
      <Grid accessibility={cardsContainerBehavior} columns={3}>
        {_.times(cardsNumber, i => {
          const nonZeroIndex = i + 1;
          return (
            <SampleCard
              key={nonZeroIndex}
              index={nonZeroIndex}
              aria-labelledby={`cardUserName_${nonZeroIndex} cardUserPosition_${nonZeroIndex} card_${nonZeroIndex} `}
              aria-label={`${nonZeroIndex} of ${cardsNumber}`}
              aria-describedby={navigationMessageId}
            />
          );
        })}
      </Grid>
      <Button content="Test focus" />
    </>
  );
};

export default CardExampleFocusableGrid;
