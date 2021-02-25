import * as React from 'react';
import { Grid, Image, Button, Text, Label, gridBehavior, gridHorizontalBehavior } from '@fluentui/react-northstar';
import * as _ from 'lodash';

const imageNames = [
  'WandaHoward',
  'TimDeboer',
  'RobinCounts',
  'RobertTolbert',
  'MonaKane',
  'MiguelGarcia',
  'MauricioAugust',
  'LydiaBauer',
  'KristinPatterson',
  'KevinSturgis',
  'KatriAthokas',
  'KatLarsson',
  'JohnieMcConnell',
  'IsaacFielder',
  'HenryBrill',
  'ErikNason',
  'ElviaAtkins',
];

const imageButtonStyles = {
  minWidth: '72px',
  maxWidth: '72px',
  height: '72px',
  padding: '0',
  margin: '0',
  background: '#fff',
};
const renderImages = () => {
  return _.map(imageNames, imageName => (
    <Image
      key={imageName}
      fluid
      src={`https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/${imageName}.jpg`}
      data-is-focusable="true"
    />
  ));
};

const renderImageButtons = () => {
  return _.map(imageNames, imageName => (
    <Button key={imageName} styles={imageButtonStyles} title={imageName}>
      <Image fluid src={`https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/${imageName}.jpg`} />
    </Button>
  ));
};

const gridStyles = {
  gridColumnGap: '10px',
  gridRowGap: '10px',
};

const GridExample = () => (
  <div>
    <Text size="medium">
      Grid with images, which are not natively focusable elements. Set <Label>data-is-focusable=true</Label> to each
      item to make grid items focusable and navigable. Use <Label>gridBehavior</Label> to provide arrow key navigation
      in 4 directions.
    </Text>
    <Grid accessibility={gridBehavior} styles={gridStyles} columns="7">
      {renderImages()}
    </Grid>
    <br />
    <Text size="medium">
      Grid with buttons images, which are natively focusable elements. <b>No need</b> to add{' '}
      <Label>data-is-focusable=true</Label>
    </Text>
    <Grid accessibility={gridBehavior} styles={gridStyles} columns="7">
      {renderImageButtons()}
    </Grid>
    <br />
    <Text size="medium">
      Grid with buttons images, which are natively focusable elements. Use <Label>gridHorizontalBehavior</Label> to
      provide horizontal navigation within Grid with 4 arrow keys.
    </Text>
    <Grid accessibility={gridHorizontalBehavior} styles={gridStyles} columns="7">
      {renderImageButtons()}
    </Grid>
  </div>
);

export default GridExample;
