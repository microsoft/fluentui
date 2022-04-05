import * as React from 'react';

import { Body, Caption, Title3, Text } from '@fluentui/react-text';

import { Button } from '@fluentui/react-button';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Card, CardFooter, CardHeader } from '../index';
import { CardProps } from '../components/Card/Card.types';
import { makeStyles, shorthands } from '@griffel/react';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('30px'),
  },
  card: {
    width: '300px',
  },
});

const SampleCard = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card {...props} className={styles.card}>
      <CardHeader
        image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
        header={
          <Body>
            <b>App Name</b>
          </Body>
        }
        description={<Caption>Developer</Caption>}
      />
      <div>
        Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
      </div>
      <CardFooter>
        <Button appearance="primary" icon={<Open16Regular />}>
          Open
        </Button>
        <Button icon={<Share16Regular />}>Share</Button>
      </CardFooter>
    </Card>
  );
};

export const Focus = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Title3 block>Default</Title3>
        <Text block>
          The contents might still be focusable, but the Card won't manage the focus of its contents or be focusable.
        </Text>
      </div>
      <SampleCard />
      <div>
        <Title3 block>'noTab' | true</Title3>
        <Text block>
          The Card will be focusable and trap the focus. You can use Tab to navigate between the contents and escaping
          focus only by clicking the Esc key.
        </Text>
      </div>
      <SampleCard focusable />
      <div>
        <Title3 block>'tabExit'</Title3>
        <Text block>The Card will be focusable and trap the focus, but release it on an Esc or Tab key press.</Text>
      </div>
      <SampleCard focusable="tabExit" />
      <div>
        <Title3 block>'tabOnly'</Title3>
        <Text block>
          The Card will not trap focus but will still be focusable and allow Tab navigation of its contents.
        </Text>
      </div>
      <SampleCard focusable="tabOnly" />
    </div>
  );
};

Focus.parameters = {
  docs: {
    description: {
      story:
        'Cards can be focusable and manage the focus of their contents in several different strategies. ' +
        'Using the `focusable` prop, we can achieve the following:',
    },
  },
};
