import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image
    key="ade"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg"
    style={{ msGridRow: 1, msGridColumn: 1 } as React.CSSProperties}
  />,
  <Image
    key="chris"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/chris.jpg"
    style={{ msGridRow: 1, msGridColumn: 2 } as React.CSSProperties}
  />,
  <Image
    key="christian"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/christian.jpg"
    style={{ msGridRow: 1, msGridColumn: 3 } as React.CSSProperties}
  />,
  <Image
    key="daniel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/daniel.jpg"
    style={{ msGridRow: 1, msGridColumn: 4 } as React.CSSProperties}
  />,
  <Image
    key="elliot"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elliot.jpg"
    style={{ msGridRow: 1, msGridColumn: 5 } as React.CSSProperties}
  />,
  <Image
    key="elyse"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elyse.png"
    style={{ msGridRow: 2, msGridColumn: 1 } as React.CSSProperties}
  />,
  <Image
    key="helen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/helen.jpg"
    style={{ msGridRow: 2, msGridColumn: 2 } as React.CSSProperties}
  />,
  <Image
    key="jenny"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/jenny.jpg"
    style={{ msGridRow: 2, msGridColumn: 3 } as React.CSSProperties}
  />,
  <Image
    key="joe"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/joe.jpg"
    style={{ msGridRow: 2, msGridColumn: 4 } as React.CSSProperties}
  />,
  <Image
    key="justen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/justen.jpg"
    style={{ msGridRow: 2, msGridColumn: 5 } as React.CSSProperties}
  />,
];

const GridExample = () => <Grid>{images}</Grid>;

export default GridExample;
