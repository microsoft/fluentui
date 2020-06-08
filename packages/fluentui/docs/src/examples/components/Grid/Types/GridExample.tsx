import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="ade" fluid src="public/images/avatar/large/ade.jpg" styles={{ msGridRow: 1, msGridColumn: 1 }} />,
  <Image key="chris" fluid src="public/images/avatar/large/chris.jpg" styles={{ msGridRow: 1, msGridColumn: 2 }} />,
  <Image
    key="christian"
    fluid
    src="public/images/avatar/large/christian.jpg"
    styles={{ msGridRow: 1, msGridColumn: 3 }}
  />,
  <Image key="daniel" fluid src="public/images/avatar/large/daniel.jpg" styles={{ msGridRow: 1, msGridColumn: 4 }} />,
  <Image key="elliot" fluid src="public/images/avatar/large/elliot.jpg" styles={{ msGridRow: 1, msGridColumn: 5 }} />,
  <Image key="elyse" fluid src="public/images/avatar/large/elyse.png" styles={{ msGridRow: 2, msGridColumn: 1 }} />,
  <Image key="helen" fluid src="public/images/avatar/large/helen.jpg" styles={{ msGridRow: 2, msGridColumn: 2 }} />,
  <Image key="jenny" fluid src="public/images/avatar/large/jenny.jpg" styles={{ msGridRow: 2, msGridColumn: 3 }} />,
  <Image key="joe" fluid src="public/images/avatar/large/joe.jpg" styles={{ msGridRow: 2, msGridColumn: 4 }} />,
  <Image key="justen" fluid src="public/images/avatar/large/justen.jpg" styles={{ msGridRow: 2, msGridColumn: 5 }} />,
];

const GridExample = () => <Grid>{images}</Grid>;

export default GridExample;
