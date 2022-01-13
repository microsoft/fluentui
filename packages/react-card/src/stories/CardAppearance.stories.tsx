import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { Body, Caption, Headline } from '@fluentui/react-text';
import { makeStyles, shorthands } from '@fluentui/react-make-styles';

import { Card, CardHeader } from '../index'; // codesandbox-dependency: @fluentui/react-card ^9.0.0-beta
import { CardProps } from '../components/Card/index';
import { CardFooter } from '../components/CardFooter/index';
import { Button } from '@fluentui/react-button';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  header: {
    marginBottom: '12px',
  },
  card: {
    width: '240px',
  },
});

const Title = (props: { children: React.ReactNode }) => {
  const styles = useStyles();

  return (
    <Headline as="h4" block className={styles.header}>
      {props.children}
    </Headline>
  );
};

const SampleCard = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card} {...props}>
      <CardHeader
        image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
        header={
          <Body>
            <b>App Name</b>
          </Body>
        }
        description={<Caption>Developer</Caption>}
      />
      Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
      <CardFooter>
        <Button appearance="primary" icon={<Open16Regular />}>
          Open
        </Button>
        <Button icon={<Share16Regular />}>Share</Button>
      </CardFooter>
    </Card>
  );
};

export const AppearanceCard = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Title>Filled (default)</Title>
        <SampleCard appearance="filled" />
      </div>
      <div>
        <Title>Filled - Interactive</Title>
        <SampleCard onClick={action('Filled Card clicked')} appearance="filled" />
      </div>
      <div>
        <Title>Filled Alternative</Title>
        <SampleCard appearance="filled-alternative" />
      </div>
      <div>
        <Title>Filled Alternative - Interactive</Title>
        <SampleCard onClick={action('Filled Alternative Card clicked')} appearance="filled-alternative" />
      </div>
      <div>
        <Title>Outline</Title>
        <SampleCard appearance="outline" />
      </div>
      <div>
        <Title>Outline - Interactive</Title>
        <SampleCard onClick={action('Outline Card clicked')} appearance="outline" />
      </div>
      <div>
        <Title>Subtle</Title>
        <SampleCard appearance="subtle" />
      </div>
      <div>
        <Title>Subtle - Interactive</Title>
        <SampleCard onClick={action('Subtle Card clicked')} appearance="subtle" />
      </div>
    </div>
  );
};
