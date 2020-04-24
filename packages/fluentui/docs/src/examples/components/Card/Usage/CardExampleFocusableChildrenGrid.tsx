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
import { screenReaderContainerStyles } from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

type SampleCardProps = {
  index?: number;
};

const SampleCard: React.FC<SampleCardProps> = ({ index, ...unhandledProps }) => {
  return (
    <Card accessibility={cardChildrenFocusableBehavior} aria-roledescription="user card" {...unhandledProps}>
      <Card.Header>
        <Text content={`User #${index}`} weight="bold" />
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
  const defaultMessage = 'Press arrow keys to navigate between cards.';
  const [navigationMessage, setNavigationMessage] = React.useState(defaultMessage);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  const cardsNumber = 18;
  const handleGridFocus = () => {
    if (navigationMessage !== null) {
      timeout.current = setTimeout(() => {
        setNavigationMessage(null);
      }, 3000);
    }
  };

  const handleGridBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setNavigationMessage(defaultMessage);
    }
  };

  const cleanup = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  React.useEffect(() => cleanup, []);

  return (
    <>
      <div id={navigationMessageId} style={screenReaderContainerStyles}>
        {navigationMessage}
      </div>
      <Grid accessibility={cardsContainerBehavior} columns="3" onFocus={handleGridFocus} onBlur={handleGridBlur}>
        {_.times(cardsNumber, i => {
          const nonZeroIndex = i + 1;
          return (
            <SampleCard
              key={nonZeroIndex}
              index={nonZeroIndex}
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
