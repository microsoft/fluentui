import * as React from 'react';
import { makeStyles, shorthands, Button, Caption1, tokens, Checkbox, Text } from '@fluentui/react-components';
import { MoreHorizontal20Filled } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview } from '@fluentui/react-card';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const flex = {
  ...shorthands.gap('16px'),
  display: 'flex',
};

const useStyles = makeStyles({
  main: {
    ...flex,
    flexDirection: 'column',
  },

  row: {
    ...flex,
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

  actions: {
    display: 'flex',
  },
});

export const SelectableIndicator = () => {
  const styles = useStyles();

  const [selected1, setSelected1] = React.useState(false);
  const [selected2, setSelected2] = React.useState(false);
  const [selected3, setSelected3] = React.useState(false);
  const [selected4, setSelected4] = React.useState(false);

  const onFirstCardSelected = React.useCallback((_, { selected }) => setSelected1(selected), [setSelected1]);
  const onSecondCardSelected = React.useCallback((_, { selected }) => setSelected2(selected), [setSelected2]);
  const onThirdCardSelected = React.useCallback((_, { selected }) => setSelected3(selected), [setSelected3]);
  const onForthCardSelected = React.useCallback((_, { selected }) => setSelected4(selected), [setSelected4]);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <Card
          className={styles.card}
          floatingAction={<Checkbox checked={selected1} />}
          selected={selected1}
          onSelectionChange={onFirstCardSelected}
        >
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

        <Card
          className={styles.card}
          floatingAction={<Checkbox checked={selected2} />}
          selected={selected2}
          onSelectionChange={onSecondCardSelected}
        >
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
      </div>

      <div className={styles.row}>
        <Card className={styles.card} selected={selected3} onSelectionChange={onThirdCardSelected}>
          <CardHeader
            image={<img src={resolveAsset('word_logo.svg')} alt="Microsoft Word Logo" />}
            header={<Text weight="semibold">Secret Project Briefing</Text>}
            description={<Caption1 className={styles.caption}>OneDrive &gt; Documents</Caption1>}
            action={
              <div className={styles.actions}>
                <Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More actions" />
                <Checkbox checked={selected3} />
              </div>
            }
          />
        </Card>

        <Card className={styles.card} selected={selected4} onSelectionChange={onForthCardSelected}>
          <CardHeader
            image={<img src={resolveAsset('excel_logo.svg')} alt="Microsoft Excel Logo" />}
            header={<Text weight="semibold">Team Budget</Text>}
            description={<Caption1 className={styles.caption}>OneDrive &gt; Spreadsheets</Caption1>}
            action={
              <div className={styles.actions}>
                <Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More actions" />
                <Checkbox checked={selected4} />
              </div>
            }
          />
        </Card>
      </div>
    </div>
  );
};

SelectableIndicator.parameters = {
  docs: {
    description: {
      story: `By default, selectable cards do not include any element to represent its selection state. For example,
      checkboxes can be composed together as an additional element by using the \`floatingAction\` property.`,
    },
  },
};
