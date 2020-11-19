import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="ade" fluid src="public/images/avatar/large/ade.jpg" />,
  <Image key="chris" fluid src="public/images/avatar/large/chris.jpg" />,
  <Image key="christian" fluid src="public/images/avatar/large/christian.jpg" />,
  <Image key="daniel" fluid src="public/images/avatar/large/daniel.jpg" />,
  <Image key="elliot" fluid src="public/images/avatar/large/elliot.jpg" />,
  <Image key="elyse" fluid src="public/images/avatar/large/elyse.png" />,
  <Image key="helen" fluid src="public/images/avatar/large/helen.jpg" />,
  <Image key="jenny" fluid src="public/images/avatar/large/jenny.jpg" />,
  <Image key="joe" fluid src="public/images/avatar/large/joe.jpg" />,
  <Image key="justen" fluid src="public/images/avatar/large/justen.jpg" />,
  <Image key="kristy" fluid src="public/images/avatar/large/kristy.png" />,
  <Image key="laura" fluid src="public/images/avatar/large/laura.jpg" />,
  <Image key="matt" fluid src="public/images/avatar/large/matt.jpg" />,
  <Image key="matthew" fluid src="public/images/avatar/large/matthew.png" />,
  <Image key="molly" fluid src="public/images/avatar/large/molly.png" />,
  <Image key="nan" fluid src="public/images/avatar/large/nan.jpg" />,
  <Image key="nom" fluid src="public/images/avatar/large/nom.jpg" />,
  <Image key="patrick" fluid src="public/images/avatar/large/patrick.png" />,
  <Image key="rachel" fluid src="public/images/avatar/large/rachel.png" />,
  <Image key="steve" fluid src="public/images/avatar/large/steve.jpg" />,
  <Image key="stevie" fluid src="public/images/avatar/large/stevie.jpg" />,
  <Image key="tom" fluid src="public/images/avatar/large/tom.jpg" />,
  <Image key="veronika" fluid src="public/images/avatar/large/veronika.jpg" />,
];

const GridExample = () => (
  <div>
    Grid with specified number or rows:
    <Grid rows={2}>{images}</Grid>
    <br />
    Grid with explicitly specified rows:
    <Grid
      styles={{
        gridAutoFlow: 'column',
        gridTemplateRows: '2fr repeat(2, 1fr)',
        msGridRows: '2fr (1fr)[2]',
      }}
      variables={{
        defaultColumnCount: undefined,
      }}
    >
      {images}
    </Grid>
  </div>
);

export default GridExample;
