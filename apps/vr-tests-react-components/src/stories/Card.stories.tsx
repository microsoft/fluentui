import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Card, CardHeader, CardFooter, CardPreview } from '@fluentui/react-card';
import { MoreHorizontal24Filled, Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Body1, Caption1 } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { action } from '@storybook/addon-actions';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';
const salesPresentationTemplateURL = ASSET_URL + '/assets/sales_template.png';

const SampleCardContent = () => (
  <>
    <CardHeader
      image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
      header={
        <Body1>
          <b>App Name</b>
        </Body1>
      }
      description={<Caption1>Developer</Caption1>}
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

storiesOf('Card Converged', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '600px' }}>
        {story()}
      </div>
    </StoryWright>
  ))
  .addStory('card templates', () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card>
        <CardPreview>
          <img src={salesPresentationTemplateURL} alt="sales presentation preview" />
        </CardPreview>
        <CardHeader
          image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
          header={
            <Body1>
              <b>Sales analysis 2019 presentation</b>
            </Body1>
          }
          description={<Caption1>Folder &gt; Presentations</Caption1>}
        />
      </Card>
    </div>
  ))
  .addStory(
    'appearance',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h1>Filled</h1>
          <Card appearance="filled">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Filled alternative</h1>
          <Card appearance="filled-alternative">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Outline</h1>
          <Card appearance="outline">
            <SampleCardContent />
          </Card>
        </div>
        <div>
          <h1>Subtle</h1>
          <Card appearance="subtle">
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
  .addStory('size', () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card size="small">
        <SampleCardContent />
      </Card>
      <Card size="medium">
        <SampleCardContent />
      </Card>
      <Card size="large">
        <SampleCardContent />
      </Card>
    </div>
  ))
  .addStory('orientation', () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1>Vertical</h1>
        <Card orientation="vertical">
          <SampleCardContent />
        </Card>
      </div>
      <div>
        <h1>Horizontal</h1>
        <Card orientation="horizontal">
          <SampleCardContent />
        </Card>
      </div>
    </div>
  ))
  .addStory('CardHeader', () => (
    <Card>
      <CardHeader
        image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal24Filled />} />}
      />
      <CardHeader
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal24Filled />} />}
      />
      <CardHeader
        image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        action={<Button appearance="transparent" icon={<MoreHorizontal24Filled />} />}
      />
      <CardHeader
        image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
      />
      <CardHeader
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        action={<Button appearance="transparent" icon={<MoreHorizontal24Filled />} />}
      />
      <CardHeader
        image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
      />
      <CardHeader
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
      />
    </Card>
  ));

storiesOf('Card Converged', module)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
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
    </StoryWright>
  ))
  .addStory(
    'appearance interactive - Filled',
    () => (
      <Card onClick={action('filled card clicked')} appearance="filled">
        <SampleCardContent />
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
        <SampleCardContent />
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
        <SampleCardContent />
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
        <SampleCardContent />
      </Card>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
