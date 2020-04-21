import {
  Flex,
  Text,
  Card,
  Grid,
  gridWithInnerZoneBehavior,
  cardChildrenFocusableBehavior,
  Button,
  StarIcon,
  DownloadIcon,
  MoreIcon,
} from '@fluentui/react-northstar';
import * as React from 'react';

type SampleCardProps = {
  index?: number;
};

const SampleCard: React.FC<SampleCardProps> = ({ index }) => {
  return (
    <Card accessibility={cardChildrenFocusableBehavior} aria-roledescription="card with action buttons">
      <Card.Header>
        <Text content={`Card #${index}`} weight="bold" />
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

const CardExampleFocusableGrid = () => (
  <Grid accessibility={gridWithInnerZoneBehavior} columns="4">
    <SampleCard index={1} />
    <SampleCard index={2} />
    <SampleCard index={3} />
    <SampleCard index={4} />
    <SampleCard index={5} />
    <SampleCard index={6} />
    <SampleCard index={7} />
    <SampleCard index={8} />
    <SampleCard index={9} />
    <SampleCard index={10} />
    <SampleCard index={11} />
    <SampleCard index={12} />
    <SampleCard index={13} />
    <SampleCard index={14} />
    <SampleCard index={15} />
    <SampleCard index={16} />
    <SampleCard index={17} />
    <SampleCard index={18} />
  </Grid>
);

export default CardExampleFocusableGrid;
