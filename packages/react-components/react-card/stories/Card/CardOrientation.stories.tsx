import * as React from 'react';
import { makeStyles, shorthands, Avatar, Button, Caption1, Text, tokens, Subtitle1 } from '@fluentui/react-components';
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

  section: {
    width: 'fit-content',
  },

  title: {
    ...shorthands.margin(0, 0, '12px'),
  },

  horizontalCardImage: {
    width: '60px',
    height: '60px',
  },

  verticalCard: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
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
        <Card className={styles.verticalCard}>
          <CardHeader
            image={<img src={resolveAsset('app_logo.svg')} className={styles.headerImage} />}
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

        <Card size="small" orientation="horizontal">
          <CardPreview className={styles.horizontalCardImage}>
            <img src={resolveAsset('logo.svg')} alt="Company Logo" />
          </CardPreview>

          <CardHeader
            image={<Avatar badge={{ status: 'available' }} image={{ src: resolveAsset('avatar_elvia.svg') }} />}
            header={<Text weight="semibold">Strategy 2021</Text>}
            description={<Caption1>https://aka.ms/fluentui</Caption1>}
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
