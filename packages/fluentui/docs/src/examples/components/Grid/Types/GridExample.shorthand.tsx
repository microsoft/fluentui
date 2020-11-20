import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="ade" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg" />,
  <Image key="chris" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/chris.jpg" />,
  <Image
    key="christian"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/christian.jpg"
  />,
  <Image
    key="daniel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/daniel.jpg"
  />,
  <Image
    key="elliot"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elliot.jpg"
  />,
  <Image key="elyse" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/elyse.png" />,
  <Image key="helen" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/helen.jpg" />,
  <Image key="jenny" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/jenny.jpg" />,
  <Image key="joe" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/joe.jpg" />,
  <Image
    key="justen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/justen.jpg"
  />,
];

const GridExample = () => <Grid content={images} />;

export default GridExample;
