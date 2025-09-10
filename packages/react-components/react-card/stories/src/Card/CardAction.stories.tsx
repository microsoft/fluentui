import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  CardFooter,
  CardPreview,
  Link,
  makeStyles,
  Subtitle1,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular, Open16Regular } from '@fluentui/react-icons';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    columnGap: '16px',
    rowGap: '36px',
  },

  title: { margin: '0 0 12px' },

  description: { margin: '0 0 12px' },

  card: {
    width: '400px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  link: {
    color: tokens.colorNeutralForeground1,

    ':hover': {
      color: tokens.colorNeutralForeground1,
      textDecoration: 'none',
    },
  },

  text: { margin: '0' },
});

const Header = ({ title, description }: Record<string, string>) => {
  const styles = useStyles();

  return (
    <>
      {title ? (
        <Subtitle1 as="h4" block className={styles.title}>
          {title}
        </Subtitle1>
      ) : null}

      {description ? (
        <Body1 as="p" block className={styles.description}>
          {description}
        </Body1>
      ) : null}
    </>
  );
};

export const WithAction = (): JSXElement => {
  const styles = useStyles();
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const onActionCardKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Enter') {
      onActionCardClick();
    }
  };

  const onActionCardClick = () => {
    alert('Opened Classroom Collaboration app');
  };

  const onLinkedCardClick = () => {
    linkRef.current?.click();
  };

  const onLinkedCardKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Enter') {
      onLinkedCardClick();
    }
  };

  return (
    <div className={styles.main}>
      <section>
        <Header
          title="Card with click event"
          description="This card has both a root click event and an Open button that performs the same action. Adding enter key handling to the card root is optional since the Open button also provides keyboard access."
        />
        <Card className={styles.card} onClick={onActionCardClick} onKeyDown={onActionCardKeyDown} focusMode="off">
          <CardPreview>
            <img src={resolveAsset('office2.png')} alt="Sales Presentation Preview" />
          </CardPreview>

          <CardHeader
            image={<img src={resolveAsset('pptx.png')} width="32px" height="32px" alt="Microsoft PowerPoint logo" />}
            header={
              <Body1 as="h5" style={{ margin: 0, fontWeight: 'bold' }}>
                App Name
              </Body1>
            }
            description={<Caption1>Developer</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
          />

          <p className={styles.text}>
            Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar
            plum.
          </p>

          <CardFooter>
            <Button appearance="primary" icon={<Open16Regular />} onClick={onActionCardClick}>
              Open
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <Header
          title="Linked Card"
          description="When a card doesn't have a separate button within its contents, it usually makes the most sense for the title text of the card to become the additional interactive element (a link in this example)."
        />
        <Card className={styles.card} onClick={onLinkedCardClick} onKeyDown={onLinkedCardKeyDown} focusMode="off">
          <CardPreview>
            <img src={resolveAsset('office2.png')} alt="Sales Presentation Preview" />
          </CardPreview>

          <CardHeader
            image={<img src={resolveAsset('pptx.png')} width="32px" height="32px" alt="Microsoft PowerPoint logo" />}
            header={
              <Text as="h5" style={{ margin: 0 }}>
                <Link href="https://www.microsoft.com/" target="_blank" ref={linkRef} className={styles.link}>
                  <b>App Name</b>
                </Link>
              </Text>
            }
            description={<Caption1>Developer</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
          />
        </Card>
      </section>
    </div>
  );
};

WithAction.parameters = {
  docs: {
    description: {
      story:
        "When giving a card a top-level click handler, it's important to ensure the same action can be done by a button or link within the Card. " +
        'This ensures the action is accesible to screen reader, touch screen reader, keyboard, and voice control users.',
    },
  },
};
