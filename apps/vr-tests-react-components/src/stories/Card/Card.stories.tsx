import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Card, CardHeader, CardPreview } from '@fluentui/react-card';
import { MoreHorizontal24Filled, MoreHorizontal20Filled } from '@fluentui/react-icons';
import { Body1, Caption1, Text } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { powerpointLogoURL, salesPresentationTemplateURL, SampleCardContent, appLogoUrl } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export default {
  title: 'Card Converged',

  decorators: [
    story => (
      <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
        <div className="testWrapper" style={{ width: '600px' }}>
          {story()}
        </div>
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Card>;

export const CardTemplates = () => (
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
);

CardTemplates.storyName = 'card templates';

export const Appearance = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '10px', marginRight: '10px' }}>
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
);

Appearance.storyName = 'appearance';

export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);
export const AppearanceHighContrast = getStoryVariant(Appearance, HIGH_CONTRAST);
export const AppearanceRTL = getStoryVariant(Appearance, RTL);

export const Size = () => (
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
);

Size.storyName = 'size';

const useOrientationStyles = makeStyles({
  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
    marginTop: '16px',
  },

  horizontalCardImage: {
    width: '64px',
    height: '64px',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },
});

export const Orientation = () => {
  const styles = useOrientationStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1>Vertical</h1>
        <Card orientation="vertical">
          <SampleCardContent />
        </Card>
      </div>

      <div>
        <h1>Horizontal</h1>
        <Card className={styles.card} orientation="horizontal">
          <CardPreview className={styles.horizontalCardImage}>
            <img className={styles.horizontalCardImage} src={appLogoUrl} alt="App Name Document" />
          </CardPreview>

          <CardHeader
            header={<Text weight="semibold">App Name</Text>}
            description={<Caption1 className={styles.caption}>Developer</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />
        </Card>
      </div>
    </div>
  );
};

Orientation.storyName = 'orientation';

export const _CardHeader = () => (
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
);

_CardHeader.storyName = 'CardHeader';
