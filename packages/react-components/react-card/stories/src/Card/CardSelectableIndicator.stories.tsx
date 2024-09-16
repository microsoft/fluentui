import * as React from 'react';
import { makeStyles, Button, Caption1, tokens, Checkbox, Text } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const flex = {
  gap: '16px',
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

  const setCheckboxState = React.useCallback(({ selected, checked }, setFn) => setFn(!!(selected || checked)), []);

  const onSelected1Change = React.useCallback((_, state) => setCheckboxState(state, setSelected1), [setCheckboxState]);
  const onSelected2Change = React.useCallback((_, state) => setCheckboxState(state, setSelected2), [setCheckboxState]);
  const onSelected3Change = React.useCallback((_, state) => setCheckboxState(state, setSelected3), [setCheckboxState]);
  const onSelected4Change = React.useCallback((_, state) => setCheckboxState(state, setSelected4), [setCheckboxState]);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <Card
          className={styles.card}
          floatingAction={<Checkbox onChange={onSelected1Change} checked={selected1} />}
          selected={selected1}
          onSelectionChange={onSelected1Change}
        >
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

        <Card
          className={styles.card}
          floatingAction={<Checkbox onChange={onSelected2Change} checked={selected2} />}
          selected={selected2}
          onSelectionChange={onSelected2Change}
        >
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
      </div>

      <div className={styles.row}>
        <Card
          className={styles.card}
          selected={selected3}
          onSelectionChange={onSelected3Change}
          floatingAction={<Checkbox onChange={onSelected3Change} checked={selected3} />}
        >
          <CardHeader
            image={<img src={resolveAsset('docx.png')} alt="Microsoft Word Logo" />}
            header={<Text weight="semibold">Secret Project Briefing</Text>}
            description={<Caption1 className={styles.caption}>OneDrive &gt; Documents</Caption1>}
          />
        </Card>

        <Card
          className={styles.card}
          selected={selected4}
          onSelectionChange={onSelected4Change}
          floatingAction={<Checkbox onChange={onSelected4Change} checked={selected4} />}
        >
          <CardHeader
            image={<img src={resolveAsset('xlsx.png')} alt="Microsoft Excel Logo" />}
            header={<Text weight="semibold">Team Budget</Text>}
            description={<Caption1 className={styles.caption}>OneDrive &gt; Spreadsheets</Caption1>}
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
