import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image
    key="ade"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg"
    style={{ msGridColumn: 1, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="chris"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/chris.jpg"
    style={{ msGridColumn: 2, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="christian"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/christian.jpg"
    style={{ msGridColumn: 3, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="daniel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/daniel.jpg"
    style={{ msGridColumn: 4, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="elliot"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elliot.jpg"
    style={{ msGridColumn: 5, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="elyse"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elyse.png"
    style={{ msGridColumn: 6, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="helen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/helen.jpg"
    style={{ msGridColumn: 7, msGridRow: 1 } as React.CSSProperties}
  />,
  <Image
    key="jenny"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/jenny.jpg"
    style={{ msGridColumn: 1, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="joe"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/joe.jpg"
    style={{ msGridColumn: 2, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="justen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/justen.jpg"
    style={{ msGridColumn: 3, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="kristy"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/kristy.png"
    style={{ msGridColumn: 4, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="laura"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/laura.jpg"
    style={{ msGridColumn: 5, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="matt"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/matt.jpg"
    style={{ msGridColumn: 6, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="matthew"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/matthew.png"
    style={{ msGridColumn: 7, msGridRow: 2 } as React.CSSProperties}
  />,
  <Image
    key="molly"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/molly.png"
    style={{ msGridColumn: 1, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="nan"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/nan.jpg"
    style={{ msGridColumn: 2, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="nom"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/nom.jpg"
    style={{ msGridColumn: 3, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="patrick"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/patrick.png"
    style={{ msGridColumn: 4, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="rachel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/rachel.png"
    style={{ msGridColumn: 5, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="steve"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/steve.jpg"
    style={{ msGridColumn: 6, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="stevie"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/stevie.jpg"
    style={{ msGridColumn: 7, msGridRow: 3 } as React.CSSProperties}
  />,
  <Image
    key="tom"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/tom.jpg"
    style={{ msGridColumn: 1, msGridRow: 4 } as React.CSSProperties}
  />,
  <Image
    key="veronika"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/veronika.jpg"
    style={{ msGridColumn: 2, msGridRow: 4 } as React.CSSProperties}
  />,
];

const GridExample = () => (
  <div>
    Grid with specified number or rows and columns:
    <Grid rows={3} columns={8}>
      {images}
    </Grid>
    <br />
    Grid with explicitly specified columns:
    <Grid
      style={{
        gridTemplateRows: '2fr repeat(2, 1fr)',
        msGridRows: '2fr (1fr)[2]',
        gridTemplateColumns: 'repeat(2, 2fr) 3fr 3fr 100px 14rem 50px 20%',
        msGridColumns: '(2fr)[2] 3fr 3fr 100px 14rem 50px 20%',
      }}
    >
      {images}
    </Grid>
  </div>
);

export default GridExample;
