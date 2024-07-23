import * as React from 'react';
import { makeStyles, Button, Caption1, tokens, Text } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview, CardProps } from '@fluentui/react-components';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
  },

  card: {
    width: '400px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  smallRadius: { borderRadius: tokens.borderRadiusSmall },

  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  logoBadge: {
    padding: '5px',
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  },
});

const CardExample = (props: CardProps) => {
  const styles = useStyles();

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

export const Selectable = () => {
  const styles = useStyles();

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
