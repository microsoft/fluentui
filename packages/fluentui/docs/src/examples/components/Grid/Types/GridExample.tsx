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
];

const GridExample = () => <Grid>{images}</Grid>;

export default GridExample;
