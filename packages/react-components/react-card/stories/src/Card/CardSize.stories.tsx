import * as React from 'react';
import type { JSXElement, CardProps } from '@fluentui/react-components';
import { Caption1, Subtitle1, Text } from '@fluentui/react-components';
import { Card, CardHeader } from '@fluentui/react-components';

import styles from './CardSize.module.css';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const Title = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Subtitle1 as="h4" block className={styles.title}>
      {children}
    </Subtitle1>
  );
};

const CardExample = (props: CardProps) => {
  return (
    <Card className={styles.card} {...props}>
      <header className={styles.flex}>
        <img className={styles.appIcon} src={resolveAsset('logo.svg')} alt="Application one logo" />
        <img className={styles.appIcon} src={resolveAsset('logo2.svg')} alt="Application two logo" />
      </header>

      <CardHeader
        header={
          <Text as="h5" weight="semibold" style={{ margin: 0 }}>
            Alert in Teams when a new document is uploaded in channel
          </Text>
        }
        description={<Caption1 className={styles.caption}>By Microsoft</Caption1>}
      />

      <footer className={`${styles.flex} ${styles.cardFooter}`}>
        <span>Automated</span>
        <span>3290</span>
      </footer>
    </Card>
  );
};

export const Size = (): JSXElement => {
  return (
    <div className={styles.main}>
      <section>
        <Title>'small'</Title>
        <CardExample size="small" />
      </section>

      <section>
        <Title>'medium' (Default)</Title>
        <CardExample size="medium" />
      </section>

      <section>
        <Title>'large'</Title>
        <CardExample size="large" />
      </section>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story:
        'Size options are mainly to provide variety, and consistency when using cards for different usages.' +
        'It relates to padding and border-radius and not so much the actual dimensions of the card.',
    },
  },
};
