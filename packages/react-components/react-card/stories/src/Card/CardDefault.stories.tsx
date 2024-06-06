import * as React from 'react';

import { makeStyles, Body1, Caption1, Button } from '@fluentui/react-components';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import { Card, CardFooter, CardHeader, CardPreview } from '@fluentui/react-components';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  card: {
    margin: 'auto',
    width: '720px',
    maxWidth: '100%',
  },
});

export const Default = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
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
        <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
        <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
      </CardFooter>
    </Card>
  );
};
