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
  <Image
    key="kristy"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg"
  />,
  <Image key="laura" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg" />,
  <Image key="matt" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/HenryBrill.jpg" />,
  <Image
    key="matthew"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/IsaacFielder.jpg"
  />,
  <Image
    key="molly"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/JohnieMcConnell.jpg"
  />,
  <Image key="nan" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg" />,
  <Image key="nom" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg" />,
  <Image
    key="patrick"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KevinSturgis.jpg"
  />,
  <Image
    key="rachel"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KristinPatterson.jpg"
  />,
  <Image key="steve" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/LydiaBauer.jpg" />,
  <Image
    key="stevie"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MauricioAugust.jpg"
  />,
  <Image key="tom" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MiguelGarcia.jpg" />,
  <Image key="veronika" fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MonaKane.jpg" />,
];

const GridExample = () => (
  <div>
    Grid with specified number or rows and columns:
    <Grid rows="3" columns="8">
      {images}
    </Grid>
    <br />
    Grid with explicitly specified columns:
    <Grid rows="2fr repeat(2, 1fr)" columns="repeat(2, 2fr) 3fr 3fr 100px 14rem 50px 20%">
      {images}
    </Grid>
  </div>
);

export default GridExample;
