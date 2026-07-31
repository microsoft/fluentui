import * as React from 'react';
import type { JSXElement, CardProps } from '@fluentui/react-components';
import { Button, Caption1, Text } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';

import styles from './CardSelectable.module.css';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const CardExample = (props: CardProps) => {
  return (
    <Card className={styles.card} {...props}>
      <CardPreview
        className={styles.grayBackground}
        logo={<img className={styles.logoBadge} src={resolveAsset('logo3.svg')} alt="Figma app logo" />}
      >
        <img className={styles.smallRadius} src={resolveAsset('office1.png')} alt="Presentation Preview" />
      </CardPreview>

      <CardHeader
        header={<Text weight="semibold">iOS App Prototype</Text>}
        description={<Caption1 className={styles.caption}>You created 53m ago</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More actions" />}
      />
    </Card>
  );
};

export const Selectable = (): JSXElement => {
  const [selected1, setSelected1] = React.useState(false);
  const [selected2, setSelected2] = React.useState(false);

  return (
    <div className={styles.main}>
      <CardExample selected={selected1} onSelectionChange={(_, { selected }) => setSelected1(selected)} />
      <CardExample selected={selected2} onSelectionChange={(_, { selected }) => setSelected2(selected)} />
    </div>
  );
};

Selectable.parameters = {
  docs: {
    description: {
      story: 'Cards can be selectable and clicking the card surface can toggle its state to selected.',
    },
  },
};
