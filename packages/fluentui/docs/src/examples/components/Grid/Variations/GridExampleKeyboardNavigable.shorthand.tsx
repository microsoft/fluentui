import * as React from 'react';
import { Grid, Image, Button, Text, Label, gridBehavior, gridHorizontalBehavior } from '@fluentui/react-northstar';
import * as _ from 'lodash';

const imageNames = [
  'ade',
  'chris',
  'christian',
  'daniel',
  'elliot',
  'helen',
  'jenny',
  'joe',
  'justen',
  'laura',
  'matt',
  'nan',
  'nom',
  'stevie',
  'steve',
  'tom',
  'veronika',
];

const imageButtonStyles = {
  minWidth: '72px',
  maxWidth: '72px',
  height: '72px',
  padding: '0',
  margin: '0',
};

const getMSGridPositions = (msGridColumn, msGridRow) =>
  ({
    msGridColumn,
    msGridRow,
  } as React.CSSProperties);

const renderImages = () => {
  return _.map(imageNames, (imageName, index) => (
    <Image
      key={imageName}
      style={getMSGridPositions(index % 7, index % 3)}
      fluid
      src={`public/images/avatar/large/${imageName}.jpg`}
      data-is-focusable="true"
    />
  ));
};

const renderImageButtons = () => {
  return _.map(imageNames, (imageName, index) => (
    <Button
      key={imageName}
      style={{ ...imageButtonStyles, ...getMSGridPositions(index % 7, index % 3) }}
      title={imageName}
    >
      <Image fluid src={`public/images/avatar/large/${imageName}.jpg`} />
    </Button>
  ));
};

const GridExample = () => (
  <div>
    <Text size="medium">
      Grid with images, which are not natively focusable elements. Set <Label>data-is-focusable=true</Label> to each
      item to make grid items focusable and navigable. Use <Label>gridBehavior</Label> to provide arrow key navigation
      in 4 directions.
    </Text>
    <Grid accessibility={gridBehavior} columns={7} content={renderImages()} />
    <br />
    <Text size="medium">
      Grid with buttons images, which are natively focusable elements. <b>No need</b> to add
      <Label>data-is-focusable=true</Label>
    </Text>
    <Grid accessibility={gridBehavior} columns={7} content={renderImageButtons()} />
    <br />
    <Text size="medium">
      Grid with buttons images, which are natively focusable elements. Use <Label>gridHorizontalBehavior</Label> to
      provide horizontal navigation within Grid with 4 arrow keys.
    </Text>
    <Grid accessibility={gridHorizontalBehavior} columns={7} content={renderImageButtons()} />
  </div>
);

export default GridExample;
