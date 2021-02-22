import * as React from 'react';
import { Grid, Image } from '@fluentui/react-northstar';

const images = [
  <Image key="allan" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" />,
  <Image
    key="amanda"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
  />,
  <Image
    key="cameron"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg"
  />,
  <Image
    key="carlos"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg"
  />,
  <Image
    key="carole"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
  />,
  <Image key="cecil" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" />,
  <Image
    key="celeste"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg"
  />,
  <Image
    key="colin"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ColinBallinger.jpg"
  />,
  <Image
    key="daisy"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/DaisyPhillips.jpg"
  />,
  <Image
    key="elliot"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElliotWoodward.jpg"
  />,
];

const GridExample = () => <Grid>{images}</Grid>;

export default GridExample;
