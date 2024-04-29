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
  <Image key="elvia" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg" />,
  <Image key="erik" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg" />,
  <Image key="henry" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/HenryBrill.jpg" />,
  <Image
    key="isaac"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/IsaacFielder.jpg"
  />,
  <Image
    key="johnie"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/JohnieMcConnell.jpg"
  />,
  <Image key="kat" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg" />,
  <Image
    key="katri"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
  />,
  <Image
    key="kevin"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KevinSturgis.jpg"
  />,
  <Image
    key="kristin"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KristinPatterson.jpg"
  />,
  <Image key="lydia" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/LydiaBauer.jpg" />,
  <Image
    key="mauricio"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MauricioAugust.jpg"
  />,
  <Image
    key="miguel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MiguelGarcia.jpg"
  />,
  <Image key="mona" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MonaKane.jpg" />,
];

const GridExample = () => (
  <div>
    Grid with specified number or rows:
    <Grid rows="2">{images}</Grid>
    <br />
    Grid with explicitly specified rows:
    <Grid rows="2fr repeat(2, 1fr)">{images}</Grid>
  </div>
);

export default GridExample;
