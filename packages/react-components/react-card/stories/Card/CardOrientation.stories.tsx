import * as React from 'react';
import { makeStyles, shorthands, Button, Caption1, Text, tokens, Subtitle1 } from '@fluentui/react-components';
import { MoreHorizontal20Filled } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview } from '@fluentui/react-card';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  main: {
    ...shorthands.gap('36px'),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  section: {
    width: 'fit-content',
  },

  title: {
    ...shorthands.margin(0, 0, '12px'),
  },

  horizontalCardImage: {
    width: '64px',
    height: '64px',
  },

  headerImage: {
    ...shorthands.borderRadius('4px'),
    maxWidth: '42px',
    maxHeight: '42px',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  text: {
    ...shorthands.margin(0),
  },
});

const Title = ({ children }: React.PropsWithChildren<{}>) => {
  const styles = useStyles();

  return (
    <Subtitle1 as="h4" block className={styles.title}>
      {children}
    </Subtitle1>
  );
};

export const Orientation = () => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      <section className={styles.section}>
        <Title>'vertical' (Default)</Title>
        <p>With image as part of header</p>

        <Card className={styles.card}>
          <CardHeader
            image={<img className={styles.headerImage} src={resolveAsset('app_logo.svg')} alt="App Name Document" />}
            header={<Text weight="semibold">App Name</Text>}
            description={<Caption1 className={styles.caption}>Developer</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />

          <p className={styles.text}>
            Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar
            plum.
          </p>
        </Card>
      </section>

      <section className={styles.section}>
        <Title>'horizontal'</Title>
        <p>With image as part of preview</p>

        <Card className={styles.card} orientation="horizontal">
          <CardPreview className={styles.horizontalCardImage}>
            <img className={styles.horizontalCardImage} src={resolveAsset('app_logo.svg')} alt="App Name Document" />
          </CardPreview>

          <CardHeader
            header={<Text weight="semibold">App Name</Text>}
            description={<Caption1 className={styles.caption}>Developer</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />
        </Card>
      </section>
    </div>
  );
};

Orientation.parameters = {
  docs: {
    description: {
      story: 'Cards can have a different anatomy and be displayed either vertically (by default) or horizontally.',
    },
  },
};
