import * as React from 'react';
import { Button, makeStyles, shorthands, Title1, tokens } from '@fluentui/react-components';
import Head from 'next/head';
import type { NextPage } from 'next';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',

    ...shorthands.border('2px', 'dashed', tokens.colorPaletteBerryBorder2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.gap('5px'),
    ...shorthands.padding('10px'),
  },
});

const Home: NextPage = () => {
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>My app</title>
      </Head>

      <div className={styles.container}>
        <Title1>Hello world!</Title1>
        <Button>A button</Button>
      </div>
    </>
  );
};

export default Home;
