import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="ade" fluid src="public/images/avatar/large/ade.jpg" styles={{ msGridColumn: 1, msGridRow: 1 }} />,
  <Image key="chris" fluid src="public/images/avatar/large/chris.jpg" styles={{ msGridColumn: 2, msGridRow: 1 }} />,
  <Image
    key="christian"
    fluid
    src="public/images/avatar/large/christian.jpg"
    styles={{ msGridColumn: 3, msGridRow: 1 }}
  />,
  <Image key="daniel" fluid src="public/images/avatar/large/daniel.jpg" styles={{ msGridColumn: 4, msGridRow: 1 }} />,
  <Image key="elliot" fluid src="public/images/avatar/large/elliot.jpg" styles={{ msGridColumn: 5, msGridRow: 1 }} />,
  <Image key="elyse" fluid src="public/images/avatar/large/elyse.png" styles={{ msGridColumn: 6, msGridRow: 1 }} />,
  <Image key="helen" fluid src="public/images/avatar/large/helen.jpg" styles={{ msGridColumn: 7, msGridRow: 1 }} />,
  <Image key="jenny" fluid src="public/images/avatar/large/jenny.jpg" styles={{ msGridColumn: 1, msGridRow: 2 }} />,
  <Image key="joe" fluid src="public/images/avatar/large/joe.jpg" styles={{ msGridColumn: 2, msGridRow: 2 }} />,
  <Image key="justen" fluid src="public/images/avatar/large/justen.jpg" styles={{ msGridColumn: 3, msGridRow: 2 }} />,
  <Image key="kristy" fluid src="public/images/avatar/large/kristy.png" styles={{ msGridColumn: 4, msGridRow: 2 }} />,
  <Image key="laura" fluid src="public/images/avatar/large/laura.jpg" styles={{ msGridColumn: 5, msGridRow: 2 }} />,
  <Image key="matt" fluid src="public/images/avatar/large/matt.jpg" styles={{ msGridColumn: 6, msGridRow: 2 }} />,
  <Image key="matthew" fluid src="public/images/avatar/large/matthew.png" styles={{ msGridColumn: 7, msGridRow: 2 }} />,
  <Image key="molly" fluid src="public/images/avatar/large/molly.png" styles={{ msGridColumn: 1, msGridRow: 3 }} />,
  <Image key="nan" fluid src="public/images/avatar/large/nan.jpg" styles={{ msGridColumn: 2, msGridRow: 3 }} />,
  <Image key="nom" fluid src="public/images/avatar/large/nom.jpg" styles={{ msGridColumn: 3, msGridRow: 3 }} />,
  <Image key="patrick" fluid src="public/images/avatar/large/patrick.png" styles={{ msGridColumn: 4, msGridRow: 3 }} />,
  <Image key="rachel" fluid src="public/images/avatar/large/rachel.png" styles={{ msGridColumn: 5, msGridRow: 3 }} />,
  <Image key="steve" fluid src="public/images/avatar/large/steve.jpg" styles={{ msGridColumn: 6, msGridRow: 3 }} />,
  <Image key="stevie" fluid src="public/images/avatar/large/stevie.jpg" styles={{ msGridColumn: 7, msGridRow: 3 }} />,
  <Image key="tom" fluid src="public/images/avatar/large/tom.jpg" styles={{ msGridColumn: 1, msGridRow: 4 }} />,
  <Image
    key="veronika"
    fluid
    src="public/images/avatar/large/veronika.jpg"
    styles={{ msGridColumn: 2, msGridRow: 4 }}
  />,
];

const GridExample = () => (
  <div>
    Grid with specified number or columns:
    <Grid columns={7} content={images} />
    <br />
    Grid with explicitly specified columns:
    <Grid
      styles={{
        gridTemplateColumns: 'repeat(3, 1fr) 2fr 2fr 110px 14rem 50px 20%',
        msGridColumns: '(1fr)[3] 2fr 2fr 110px 14rem 50px 20%',
      }}
      content={images}
    />
  </div>
);

export default GridExample;
