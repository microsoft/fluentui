import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Card, CardHeader, CardFooter } from '@fluentui/react-card';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Body, Caption } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { action } from '@storybook/addon-actions';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

const SampleCardContent = () => (
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
    Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes
    toffee sugar plum.
    <CardFooter>
      <Button appearance="primary" icon={<Open16Regular />}>
        Open
      </Button>
      <Button icon={<Share16Regular />}>Share</Button>
    </CardFooter>
  </>
);

storiesOf('Card Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('normal', { cropTo: '.testWrapper' })
        .focus('.card')
        .snapshot('focused', { cropTo: '.testWrapper' })
        .click('.card')
        .snapshot('clicked', { cropTo: '.testWrapper' })
        .end()}
    >
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </Screener>
  ))
  .addStory(
    'appearance',
    () => (
      <div style={{ padding: '16px' }}>
        <div>
          <h1>Filled</h1>
          <Card appearance="filled" className="card">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Filled Alternative</h1>
          <Card appearance="filled-alternative" className="card">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Outline</h1>
          <Card appearance="outline" className="card">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Subtle</h1>
          <Card appearance="subtle" className="card">
            <SampleCardContent />
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
  .addStory(
    'appearance interactive',
    () => (
      <div style={{ padding: '16px' }}>
        <div>
          <h1>Filled</h1>
          <Card onClick={action('filled card clicked')} appearance="filled" className="card">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Filled Alternative</h1>
          <Card
            onClick={action('filled alternative card clicked')}
            appearance="filled-alternative"
            className="card"
          >
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Outline</h1>
          <Card onClick={action('outline card clicked')} appearance="outline" className="card">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Subtle</h1>
          <Card onClick={action('subtle card clicked')} appearance="subtle" className="card">
            <SampleCardContent />
          </Card>
        </div>
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
