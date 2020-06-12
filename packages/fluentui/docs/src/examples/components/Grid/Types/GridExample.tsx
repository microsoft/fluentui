import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="ade" fluid src="public/images/avatar/large/ade.jpg" style={{ msGridRow: 1, msGridColumn: 1 }} />,
  <Image key="chris" fluid src="public/images/avatar/large/chris.jpg" style={{ msGridRow: 1, msGridColumn: 2 }} />,
  <Image
    key="christian"
    fluid
    src="public/images/avatar/large/christian.jpg"
    style={{ msGridRow: 1, msGridColumn: 3 }}
  />,
  <Image key="daniel" fluid src="public/images/avatar/large/daniel.jpg" style={{ msGridRow: 1, msGridColumn: 4 }} />,
  <Image key="elliot" fluid src="public/images/avatar/large/elliot.jpg" style={{ msGridRow: 1, msGridColumn: 5 }} />,
  <Image key="elyse" fluid src="public/images/avatar/large/elyse.png" style={{ msGridRow: 2, msGridColumn: 1 }} />,
  <Image key="helen" fluid src="public/images/avatar/large/helen.jpg" style={{ msGridRow: 2, msGridColumn: 2 }} />,
  <Image key="jenny" fluid src="public/images/avatar/large/jenny.jpg" style={{ msGridRow: 2, msGridColumn: 3 }} />,
  <Image key="joe" fluid src="public/images/avatar/large/joe.jpg" style={{ msGridRow: 2, msGridColumn: 4 }} />,
  <Image key="justen" fluid src="public/images/avatar/large/justen.jpg" style={{ msGridRow: 2, msGridColumn: 5 }} />,
];

const GridExample = () => <Grid>{images}</Grid>;

export default GridExample;
