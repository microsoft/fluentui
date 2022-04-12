import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Card, CardHeader, CardFooter } from '@fluentui/react-card';
import { MoreVerticalRegular, Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Body, Caption } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { action } from '@storybook/addon-actions';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';
const avatarMauricioURL = ASSET_URL + '/assets/avatar_mauricio.svg';

const SampleAppearanceContent = () => (
  <>
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
  </>
);

const SampleScaleContent = () => (
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
);

const useScaleStyles = makeStyles({
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
const CardScale = () => {
  const styles = useScaleStyles();

  return (
    <div className={styles.grid}>
      <div>
        <h1>Default (fixed size)</h1>
        <div className={styles.container}>
          <Card style={{ width: '400px', height: '75px', justifyContent: 'center' }}>
            <SampleScaleContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Auto width</h1>
        <div className={styles.container}>
          <Card scale="auto-width" style={{ height: '75px', justifyContent: 'center' }}>
            <SampleScaleContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Auto height</h1>
        <div className={styles.container}>
          <Card scale="auto-height" style={{ width: '400px' }}>
            <SampleScaleContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Auto</h1>
        <div className={styles.container}>
          <Card scale="auto">
            <SampleScaleContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Fluid width</h1>
        <div className={styles.container}>
          <Card scale="fluid-width">
            <SampleScaleContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Fluid height</h1>
        <div className={styles.container}>
          <Card scale="fluid-height" style={{ justifyContent: 'center' }}>
            <SampleScaleContent />
          </Card>
        </div>
      </div>
      <div>
        <h1>Fluid</h1>
        <div className={styles.container}>
          <Card scale="fluid" style={{ justifyContent: 'center' }}>
            <SampleScaleContent />
          </Card>
        </div>
      </div>
    </div>
  );
};

storiesOf('Card', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </Screener>
  ))
  .addStory(
    'appearance',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h1>Filled</h1>
          <Card appearance="filled">
            <SampleAppearanceContent />
          </Card>
        </div>
        <div>
          <h1>Filled alternative</h1>
          <Card appearance="filled-alternative">
            <SampleAppearanceContent />
          </Card>
        </div>
        <div>
          <h1>Outline</h1>
          <Card appearance="outline">
            <SampleAppearanceContent />
          </Card>
        </div>
        <div>
          <h1>Subtle</h1>
          <Card appearance="subtle">
            <SampleAppearanceContent />
          </Card>
        </div>
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('scale', CardScale);

storiesOf('Card', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('normal', { cropTo: '.testWrapper' })
        .hover('[role="group"]')
        .snapshot('focused', { cropTo: '.testWrapper' })
        .mouseDown('[role="group"]')
        .snapshot('clicked', { cropTo: '.testWrapper' })
        .end()}
    >
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </Screener>
  ))
  .addStory(
    'appearance interactive - Filled',
    () => (
      <Card onClick={action('filled card clicked')} appearance="filled">
        <SampleAppearanceContent />
      </Card>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'appearance interactive - Filled Alternative',
    () => (
      <Card onClick={action('filled alternative card clicked')} appearance="filled-alternative">
        <SampleAppearanceContent />
      </Card>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'appearance interactive - Outline',
    () => (
      <Card onClick={action('outline card clicked')} appearance="outline">
        <SampleAppearanceContent />
      </Card>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'appearance interactive - Subtle',
    () => (
      <Card onClick={action('subtle card clicked')} appearance="subtle">
        <SampleAppearanceContent />
      </Card>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
