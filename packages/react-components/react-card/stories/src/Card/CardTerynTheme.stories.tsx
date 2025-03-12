import * as React from 'react';

import {
  makeStyles,
  makeResetStyles,
  Body1,
  Caption1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from '@fluentui/react-components';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import { FluentProvider } from '@fluentui/react-components';
import { customStyleHooks } from '../customStyleHooks/index';

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

const useOuterWrapperStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '15px',
});

export const DefaultTeryn = () => {
  const styles = useStyles();
  const outerWrapperStyles = useOuterWrapperStyles();

  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <div className={outerWrapperStyles}>
        <h3>Small</h3>
        <Card className={styles.card} size="small">
          <CardHeader
            image={
              <img
                src={resolveAsset('avatar_elvia.svg')}
                alt="Elvia Atkins avatar picture"
                height="36px"
                width="36px"
              />
            }
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
        <h3>Medium</h3>
        <Card className={styles.card} size="medium">
          <CardHeader
            image={
              <img
                src={resolveAsset('avatar_elvia.svg')}
                alt="Elvia Atkins avatar picture"
                height="36px"
                width="36px"
              />
            }
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
        <h3>Large</h3>
        <Card className={styles.card} size="large">
          <CardHeader
            image={
              <img
                src={resolveAsset('avatar_elvia.svg')}
                alt="Elvia Atkins avatar picture"
                height="36px"
                width="36px"
              />
            }
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
      </div>
    </FluentProvider>
  );
};
