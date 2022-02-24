import * as React from 'react';

import { Body, Caption } from '@fluentui/react-text';

import { Button } from '@fluentui/react-button';
import { MoreVerticalRegular } from '@fluentui/react-icons';
import { Card, CardHeader } from '../index'; // codesandbox-dependency: @fluentui/react-card ^9.0.0-beta
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const avatarMauricioURL = ASSET_URL + '/assets/avatar_mauricio.svg';

const SampleCardContent = () => (
  <>
    <CardHeader
      image={<img src={avatarMauricioURL} alt="Face of a person" />}
      header={
        <Body>
          <b>Mauricio August</b> + 7 others edited
        </Body>
      }
      description={<Caption>Artificial Intelligence Deck</Caption>}
      action={<Button appearance="transparent" icon={<MoreVerticalRegular fontSize={20} />} />}
    />
  </>
);

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('24px'),
  },
  container: {
    width: '500px',
    height: '200px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.border('5px', 'solid', tokens.colorNeutralStrokeAccessible),
  },
});
export const CardScale = () => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <div>
        <h1>Default (fixed size)</h1>
        <div className={styles.container}>
          <Card style={{ width: '400px', height: '75px', justifyContent: 'center' }}>
            <SampleCardContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Auto width</h1>
        <div className={styles.container}>
          <Card scale="auto-width" style={{ height: '75px', justifyContent: 'center' }}>
            <SampleCardContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Auto height</h1>
        <div className={styles.container}>
          <Card scale="auto-height" style={{ width: '400px' }}>
            <SampleCardContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Auto</h1>
        <div className={styles.container}>
          <Card scale="auto">
            <SampleCardContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Fluid width</h1>
        <div className={styles.container}>
          <Card scale="fluid-width">
            <SampleCardContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Fluid height</h1>
        <div className={styles.container}>
          <Card scale="fluid-height" style={{ justifyContent: 'center' }}>
            <SampleCardContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Fluid</h1>
        <div className={styles.container}>
          <Card scale="fluid" style={{ justifyContent: 'center' }}>
            <SampleCardContent />
          </Card>
        </div>
      </div>
    </div>
  );
};

CardScale.parameters = {
  docs: {
    description: {
      story: 'Cards can be sized to fit into a grid',
    },
  },
};
