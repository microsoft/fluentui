import * as React from 'react';
import type { JSXElement, CardProps } from '@fluentui/react-components';
import { Button, Text, Caption1, Subtitle1, Body1 } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Card, CardHeader } from '@fluentui/react-components';

import styles from './CardAppearance.module.css';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const ExampleHeader = ({ title, description }: Record<string, string>) => {
  return (
    <header>
      {title ? (
        <Subtitle1 as="h4" block className={styles.title}>
          {title}
        </Subtitle1>
      ) : null}

      {description ? (
        <Body1 as="p" block className={styles.description}>
          {description}
        </Body1>
      ) : null}
    </header>
  );
};

const CardExample = ({ className, ...props }: CardProps) => {
  const onClick = React.useCallback(() => console.log('Interactive!'), []);

  return (
    <Card {...props} className={`${className} ${styles.card}`} onClick={onClick}>
      <CardHeader
        image={<img className={styles.logo} src={resolveAsset('app_logo.svg')} alt="App name logo" />}
        header={
          <Text as="h5" style={{ margin: 0 }} weight="semibold">
            App Name
          </Text>
        }
        description={<Caption1 className={styles.caption}>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      />

      <p className={styles.text}>
        Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
      </p>
    </Card>
  );
};

export const Appearance = (): JSXElement => {
  return (
    <div className={styles.main}>
      <section>
        <ExampleHeader
          title="Filled (Default)"
          description="This is the default style to use for cards. Use this style variant for most of your card
          designs."
        />
        <CardExample />
      </section>

      <section>
        <ExampleHeader
          title="Filled Alternative"
          description="Use if your card is being displayed on a lighter gray or white surface. This ensures that you
          have adequate contrast between the card surface and the background of the application."
        />
        <CardExample appearance="filled-alternative" />
      </section>

      <section>
        <ExampleHeader
          title="Outline"
          description="Use when you don't want a filled background color but a discernable outline (border) on the
          card."
        />
        <CardExample appearance="outline" />
      </section>

      <section>
        <ExampleHeader
          title="Subtle"
          description="This variant doesn't have a background or border for the card container. However, it does include
          interaction states that display a visible footprint when interacting with the card item."
        />
        <CardExample appearance="subtle" />
      </section>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'Cards can have different styles depending on the situation and where it is placed.',
    },
  },
};
