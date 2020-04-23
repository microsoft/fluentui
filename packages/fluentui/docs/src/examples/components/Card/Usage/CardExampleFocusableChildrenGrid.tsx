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
  const handleGridFocus = () => {
    console.log(navigationMessage);
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

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  React.useEffect(() => cleanup, []);

  return (
    <>
      <div id={navigationMessageId} style={screenReaderContainerStyles}>
        {navigationMessage}
      </div>
      <Grid accessibility={cardsContainerBehavior} columns="3" onFocus={handleGridFocus} onBlur={handleGridBlur}>
        <SampleCard index={1} aria-label="1 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={2} aria-label="2 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={3} aria-label="3 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={4} aria-label="4 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={5} aria-label="5 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={6} aria-label="6 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={7} aria-label="7 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={8} aria-label="8 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={9} aria-label="9 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={10} aria-label="10 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={11} aria-label="11 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={12} aria-label="12 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={13} aria-label="13 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={14} aria-label="14 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={15} aria-label="15 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={16} aria-label="16 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={17} aria-label="17 of 18" aria-describedby={navigationMessageId} />
        <SampleCard index={18} aria-label="18 of 18" aria-describedby={navigationMessageId} />
      </Grid>
      <Button content="Test focus" />
    </>
  );
};

export default CardExampleFocusableGrid;
