import * as React from 'react';
import { Body, Caption } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { Open16Regular, ArrowReply16Regular, MoreVertical20Regular, Share16Regular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';
import { Card, CardFooter, CardHeader, CardPreview } from '../index';
import avatarElvia from '../../assets/avatar_elvia.svg';
import wordLogo from '../../assets/word_logo.svg';
import docTemplate from '../../assets/doc_template.png';

import avatarMauricio from '../../assets/avatar_mauricio.svg';
import powerpointLogo from '../../assets/powerpoint_logo.svg';
import aiDeckTemplate from '../../assets/ai_deck_template.png';

const useStyles = makeStyles({
  actionCard: {
    minWidth: '368px',
  },
  gridViewCard: {
    minWidth: '254px',
    maxWidth: '368px',
  },
  gray: {
    color: 'gray',
  },
  logo: {
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

  return <div className={styles.logo}>{props.children}</div>;
};

export const ActionCard = () => {
  const styles = useStyles();

  return (
    <>
      <Card tabIndex={0} className={styles.actionCard}>
        <CardHeader
          image={<img src={avatarElvia} alt="Face of a person" />}
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
              <img src={wordLogo} alt="Microsoft Word logo" />
            </LogoBackground>
          }
        >
          <img src={docTemplate} alt="Preview of a Word document " />
        </CardPreview>

        <CardFooter>
          <Button icon={<ArrowReply16Regular />}>Reply</Button>
          <Button icon={<Share16Regular />}>Share</Button>
        </CardFooter>
      </Card>

      <br />

      <Card tabIndex={0} className={styles.actionCard} onClick={() => console.log('Test action')}>
        <CardHeader
          image={<img src={avatarMauricio} alt="Face of a person" />}
          header={
            <Body>
              <b>Mauricio August</b> <span className={styles.gray}>+ 7 others edited</span>
            </Body>
          }
          description={<Caption>Artificial Intelligence Deck</Caption>}
          action={<Button appearance="transparent" icon={<MoreVertical20Regular />} />}
        />

        <CardPreview
          logo={
            <LogoBackground>
              <img src={powerpointLogo} alt="Microsoft PowerPoint logo" />
            </LogoBackground>
          }
        >
          <img src={aiDeckTemplate} alt="Preview of an artificial intelligence slide deck" />
        </CardPreview>

        <CardFooter>
          <Button icon={<Open16Regular />}>View changes</Button>
        </CardFooter>
      </Card>
    </>
  );
};
