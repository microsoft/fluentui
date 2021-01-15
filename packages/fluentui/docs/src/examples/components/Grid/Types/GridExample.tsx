import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="ade" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" />,
  <Image key="chris" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg" />,
  <Image
    key="christian"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg"
  />,
  <Image
    key="daniel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg"
  />,
  <Image
    key="elliot"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
  />,
  <Image key="elyse" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" />,
  <Image
    key="helen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg"
  />,
  <Image
    key="jenny"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ColinBallinger.jpg"
  />,
  <Image key="joe" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/DaisyPhillips.jpg" />,
  <Image
    key="justen"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElliotWoodward.jpg"
  />,
];

const GridExample = () => <Grid>{images}</Grid>;

export default GridExample;
