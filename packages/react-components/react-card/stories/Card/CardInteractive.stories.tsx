import * as React from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Caption1,
  Subtitle1,
  Avatar,
  Text,
  mergeClasses,
} from '@fluentui/react-components';
import { Card, CardHeader, CardPreview, CardProps } from '@fluentui/react-card';
import { Comment16Regular } from '@fluentui/react-icons';

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

  title: {
    ...shorthands.margin(0, 0, '12px'),
  },

  card: {
    width: '300px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  flexContainer: {
    columnGap: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  appIcon: {
    ...shorthands.borderRadius('4px'),
    height: '32px',
  },
  logoBadge: {
    ...shorthands.padding('5px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
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

const CardExample = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card} {...props}>
      <CardPreview logo={<img alt="app logo" src={resolveAsset('excel_logo.svg')} className={styles.logoBadge} />}>
        <img alt="file preview" src={resolveAsset('office2.png')} />
      </CardPreview>

      <CardHeader
        image={<Avatar image={{ src: resolveAsset('avatar_colin.svg') }} />}
        header={<Text weight="semibold">Classroom Collaboration</Text>}
        description={
          <Caption1 className={mergeClasses(styles.flexContainer, styles.caption)}>
            <Comment16Regular color="#D83B01" />
            <span>Colin replied to a comment</span>
          </Caption1>
        }
      />
    </Card>
  );
};

export const Interactive = () => {
  const styles = useStyles();

  const onClickEvent = () => {
    console.log('Interactive when has onClick event');
  };

  return (
    <div className={styles.main}>
      <section>
        <Title>As a link</Title>
        <CardExample as="a" href="/?path=/docs/preview-components-card-card--interactive" />
      </section>

      <section>
        <Title>As a button</Title>
        <CardExample appearance="filled-alternative" as="button" type="button" />
      </section>

      <section>
        <Title>With a MouseEvent</Title>
        <CardExample appearance="outline" onClick={onClickEvent} />
      </section>
    </div>
  );
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'The card surface can be used as an interactive target, either with mouse or keyboard interaction.',
    },
  },
};
