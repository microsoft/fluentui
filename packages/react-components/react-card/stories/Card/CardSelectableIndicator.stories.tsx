import * as React from 'react';
import { makeStyles, shorthands, Button, Caption1, tokens, Checkbox, Text } from '@fluentui/react-components';
import { MoreHorizontal20Filled } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview, CardProps } from '@fluentui/react-card';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  main: {
    ...shorthands.gap('16px'),
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

  smallRadius: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },

  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  logoBadge: {
    ...shorthands.padding('5px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
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
        logo={<img className={styles.logoBadge} alt="app logo" src={resolveAsset('logo3.svg')} />}
      >
        <img alt="Presentation Preview" src={resolveAsset('office1.png')} className={styles.smallRadius} />
      </CardPreview>

      <CardHeader
        header={<Text weight="semibold">iOS App Prototype</Text>}
        description={<Caption1 className={styles.caption}>You created 53m ago</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More actions" />}
      />
    </Card>
  );
};

export const SelectableIndicator = () => {
  const styles = useStyles();

  const [selected1, setSelected1] = React.useState(false);
  const [selected2, setSelected2] = React.useState(false);

  const onFirstCardSelected = React.useCallback((_, { selected }) => setSelected1(selected), [setSelected1]);
  const onSecondCardSelected = React.useCallback((_, { selected }) => setSelected2(selected), [setSelected2]);

  return (
    <div className={styles.main}>
      <CardExample
        floatingAction={<Checkbox checked={selected1} />}
        selected={selected1}
        onSelectionChange={onFirstCardSelected}
      />
      <CardExample
        floatingAction={<Checkbox checked={selected2} />}
        selected={selected2}
        onSelectionChange={onSecondCardSelected}
      />
    </div>
  );
};

SelectableIndicator.parameters = {
  docs: {
    description: {
      story: `By default, selectable cards do not include any element to represent its selection state. For example,
      checkboxes can be composed together as an additional element by using the \`floatingIndicator\` property.`,
    },
  },
};
