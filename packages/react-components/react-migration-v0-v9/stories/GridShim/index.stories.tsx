import * as React from 'react';
import descriptionMd from './Description.md';
import { Grid, Image } from '@fluentui/react-northstar';
import { makeStyles } from '@fluentui/react-components';
import { GridShim } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: 'fit-content',
  },
});

const images = [
  <Image
    key="allan"
    alt="allan"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
  />,
  <Image
    key="amanda"
    alt="amanda"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
  />,
  <Image
    key="cameron"
    alt="cameron"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg"
  />,
  <Image
    key="carlos"
    alt="carlos"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg"
  />,
  <Image
    key="carole"
    alt="carole"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
  />,
  <Image
    key="cecil"
    alt="cecil"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg"
  />,
  <Image
    key="celeste"
    alt="celeste"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg"
  />,
  <Image
    key="colin"
    alt="colin"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ColinBallinger.jpg"
  />,
  <Image
    key="daisy"
    alt="daisy"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/DaisyPhillips.jpg"
  />,
  <Image
    key="elliot"
    alt="elliot"
    fluid
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElliotWoodward.jpg"
  />,
];

export const Default = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <h3>v0</h3>
        <Grid columns={3} content={images} />
      </div>

      <div>
        <h3>shim</h3>
        <GridShim columns={3}>{images}</GridShim>
      </div>
    </div>
  );
};

export default {
  title: 'Migration Shims/V0/GridShim',
  component: GridShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
