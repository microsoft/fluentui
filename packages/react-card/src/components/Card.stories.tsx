import * as React from 'react';
import { Body, Caption } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import {
  Open16Regular,
  ArrowReply16Regular,
  DismissSquare20Regular,
  MoreHorizontal16Regular,
  MoreVertical20Regular,
} from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';
import { Card, CardFooter, CardHeader, CardPreview } from '../index';

const useStyles = makeStyles({
  root: {
    background: 'white',
    padding: '6px',
    width: '20px',
    height: '20px',

    '> img': {
      width: '100%',
      height: '100%',
    },
  },
});
const LogoBackground = (props: React.HTMLAttributes<HTMLElement>) => {
  const styles = useStyles();

  return <div className={styles.root}>{props.children}</div>;
};

export const ActionCard = () => (
  <>
    <Card style={{ minWidth: '368px' }} onClick={() => console.log('Test action')}>
      <CardHeader
        image={<img src="./avatar_elvia.svg" alt="Face of a person" />}
        header={
          <Body>
            <b>Elvia Atkins</b> mentioned you
          </Body>
        }
        description={<Caption>5h ago · About us - Overview</Caption>}
      />

      <CardPreview
        logo={
          <LogoBackground>
            <img src="./word_logo.svg" alt="Microsoft Word logo" />
          </LogoBackground>
        }
      >
        <img src="./doc_template.png" alt="Preview of a Word document " />
      </CardPreview>

      <CardFooter>
        <Button icon={<ArrowReply16Regular />}>Reply</Button>
      </CardFooter>
    </Card>

    <br />

    <Card style={{ minWidth: '368px' }}>
      <CardHeader
        image={<img src="./avatar_mauricio.svg" alt="Face of a person" />}
        header={
          <Body>
            <b>Mauricio August</b> <span style={{ color: 'gray' }}>+ 7 others edited</span>
          </Body>
        }
        description={<Caption>Artificial Intelligence Deck</Caption>}
        action={<DismissSquare20Regular />}
      />

      <CardPreview
        logo={
          <LogoBackground>
            <img src="./powerpoint_logo.svg" alt="Microsoft PowerPoint logo" />
          </LogoBackground>
        }
      >
        <img src="./ai_deck_template.png" alt="Preview of an artificial intelligence slide deck" />
      </CardPreview>

      <CardFooter action={<Button transparent icon={<MoreVertical20Regular />} />}>
        <Button icon={<Open16Regular />}>View changes</Button>
      </CardFooter>
    </Card>
  </>
);

export const GridviewCard = () => (
  <Card
    style={{
      minWidth: '254px',
      maxWidth: '368px',
    }}
  >
    <CardPreview style={{ marginTop: '-12px' }}>
      <img src="./sales_template.png" alt="Preview of a sales slide deck" />
    </CardPreview>
    <CardHeader
      image={<img src="./powerpoint_logo.svg" alt="Microsoft PowerPoint logo" />}
      header={
        <Body>
          <b>Sales Analysis</b>
        </Body>
      }
      description={<Caption style={{ color: 'gray' }}>Elvia replied to a comment</Caption>}
      action={<MoreHorizontal16Regular />}
    />
  </Card>
);

export default {
  title: 'Components/OfficeCard',
  component: Card,
};
