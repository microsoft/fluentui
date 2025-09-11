import * as React from 'react';
import { Body1, Caption1, Checkbox, JSXElement, makeStyles } from '@fluentui/react-components';
import { Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    width: '400px',
    maxWidth: '100%',
  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const CardContentExample = ({ disabled }: { disabled?: boolean }) => (
  <>
    <CardHeader
      image={<img src={resolveAsset('avatar_elvia.svg')} alt="Elvia Atkins avatar picture" />}
      header={
        <Body1>
          <b>Elvia Atkins</b> mentioned you
        </Body1>
      }
      description={<Caption1>5h ago · About us - Overview</Caption1>}
    />

    <CardPreview logo={<img src={resolveAsset('docx.png')} alt="Microsoft Word document" />}>
      <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document: About Us - Overview" />
    </CardPreview>

    <CardFooter>
      <Button disabled={disabled} icon={<ArrowReplyRegular fontSize={16} />}>
        Reply
      </Button>
      <Button disabled={disabled} icon={<ShareRegular fontSize={16} />}>
        Share
      </Button>
    </CardFooter>
  </>
);

export const Disabled = (): JSXElement => {
  const styles = useStyles();
  const [isSelected1, setIsSelected1] = React.useState(false);
  const [isSelected2, setIsSelected2] = React.useState(false);

  return (
    <div className={styles.container}>
      <div>
        <h3>Default Card</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Card className={styles.card}>
            <CardContentExample />
          </Card>

          <Card className={styles.card} disabled>
            <CardContentExample disabled />
          </Card>
        </div>
      </div>

      <div>
        <h3>Interactive Card</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Card className={styles.card} onClick={() => alert('Card clicked')}>
            <CardContentExample />
          </Card>

          <Card className={styles.card} disabled onClick={() => alert('Card clicked')}>
            <CardContentExample disabled />
          </Card>
        </div>
      </div>

      <div>
        <h3>Selectable Card</h3>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Card
              className={styles.card}
              selected={isSelected1}
              onSelectionChange={(_, { selected }) => setIsSelected1(selected)}
            >
              <CardContentExample />
            </Card>
            <Card className={styles.card} disabled selected={false}>
              <CardContentExample disabled />
            </Card>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Card
              className={styles.card}
              selected={isSelected2}
              onSelectionChange={(_, { selected }) => setIsSelected2(selected)}
              floatingAction={<Checkbox checked={isSelected2} onChange={() => setIsSelected2(!isSelected2)} />}
            >
              <CardContentExample />
            </Card>
            <Card className={styles.card} selected={false} floatingAction={<Checkbox disabled />} disabled>
              <CardContentExample disabled />
            </Card>
          </div>
        </div>
      </div>

      <div>
        <h3>Outline Card</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Card className={styles.card} appearance="outline">
            <CardContentExample />
          </Card>

          <Card className={styles.card} appearance="outline" disabled>
            <CardContentExample disabled />
          </Card>
        </div>
      </div>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `
A card can be disabled, which prevents interaction and shows a visual disabled state.

**Key behaviors:**
- Interactive disabled cards do not respond to click events
- Selectable disabled cards cannot change their selection state
- The internal checkbox in selectable cards is also disabled
- Focus is not applied to disabled cards (no tabindex)

**Accessibility:**
- Disabled cards have \`aria-disabled="true"\`
- Screen readers announce the disabled state
- Cards do not receive focus when disabled, maintaining proper tab order
- Make sure to explicitly disable interactive child elements as well, like buttons and fields, as they are not disabled by default due to limited control over slot contents
      `,
    },
  },
};
