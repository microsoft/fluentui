import * as React from 'react';
import { Body, Caption } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import {
  Open16Regular,
  ArrowReply16Regular,
  MoreHorizontal16Regular,
  MoreVertical20Regular,
  Share16Regular,
} from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';
import { Menu, MenuItem, MenuList, MenuPopover } from '@fluentui/react-menu';
import { createVirtualElementFromClick } from '@fluentui/react-positioning';
import { Card, CardFooter, CardHeader, CardPreview } from '../index';

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
  const [target, setTarget] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const onOpenChange = (e: any, { open }: any) => {
    setOpen(open);
  };
  const onContextMenu = (e: any) => {
    e.preventDefault();
    setOpen(true);
    setTarget(createVirtualElementFromClick(e) as any);
  };

  return (
    <>
      <Card tabIndex={0} className={styles.actionCard}>
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
          <Button icon={<Share16Regular />}>Share</Button>
        </CardFooter>
      </Card>

      <br />

      <Card
        tabIndex={0}
        className={styles.actionCard}
        onContextMenu={onContextMenu}
        onClick={() => console.log('Test action')}
      >
        <CardHeader
          image={<img src="./avatar_mauricio.svg" alt="Face of a person" />}
          header={
            <Body>
              <b>Mauricio August</b> <span className={styles.gray}>+ 7 others edited</span>
            </Body>
          }
          description={<Caption>Artificial Intelligence Deck</Caption>}
          action={<Button appearance="transparent" onClick={onContextMenu} icon={<MoreVertical20Regular />} />}
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

        <CardFooter>
          <Button icon={<Open16Regular />}>View changes</Button>
        </CardFooter>
      </Card>
      <Menu open={open} onOpenChange={onOpenChange} positioning={{ target }}>
        <MenuPopover>
          <MenuList>
            <MenuItem>Share</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export const GridviewCard = () => {
  const styles = useStyles();
  const [target, setTarget] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const onOpenChange = (e: any, { open }: any) => {
    setOpen(open);
  };
  const onContextMenu = (e: any) => {
    e.preventDefault();
    setOpen(true);
    setTarget(createVirtualElementFromClick(e) as any);
  };

  return (
    <>
      <Card onContextMenu={onContextMenu} className={styles.gridViewCard}>
        <CardPreview>
          <img src="./sales_template.png" alt="Preview of a sales slide deck" />
        </CardPreview>
        <CardHeader
          image={<img src="./powerpoint_logo.svg" alt="Microsoft PowerPoint logo" />}
          header={
            <Body>
              <b>Sales Analysis</b>
            </Body>
          }
          description={<Caption className={styles.gray}>Elvia replied to a comment</Caption>}
          action={<Button appearance="transparent" onClick={onContextMenu} icon={<MoreHorizontal16Regular />} />}
        />
      </Card>
      <Menu open={open} onOpenChange={onOpenChange} positioning={{ target }}>
        <MenuPopover>
          <MenuList>
            <MenuItem>Share</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export default {
  title: 'Components/OfficeCard',
  component: Card,
};
