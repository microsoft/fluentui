import * as React from 'react';
import { makeStyles, Button, Caption1, Body1, Subtitle1 } from '@fluentui/react-components';
import { MoreHorizontal20Regular, Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardFooter, CardPreview, CardProps } from '@fluentui/react-components';

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

const CardExample = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card} {...props}>
      <CardPreview>
        <img src={resolveAsset('sales_template.png')} alt="Sales Presentation Preview" />
      </CardPreview>

      <CardHeader
        image={<img src={resolveAsset('pptx.png')} width="32px" height="32px" alt="Microsoft PowerPoint logo" />}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      />

      <p className={styles.text}>
        Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
      </p>

      <CardFooter>
        <Button appearance="primary" icon={<Open16Regular />}>
          Open
        </Button>
        <Button icon={<Share16Regular />}>Share</Button>
      </CardFooter>
    </Card>
  );
};

export const FocusMode = () => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      <section>
        <Header
          title="'off' (Default)"
          description="The contents might still be focusable, but the Card won't manage the focus of its contents or be
          focusable."
        />
        <CardExample />
      </section>

      <section>
        <Header
          title="'no-tab'"
          description="The Card will be focusable and trap the focus. You can use Tab to navigate between the contents
          and escaping focus only by pressing the Esc key."
        />
        <CardExample focusMode="no-tab" />
      </section>

      <section>
        <Header
          title="'tab-exit'"
          description="The Card will be focusable and trap the focus, but release it on an Esc or Tab key press."
        />
        <CardExample focusMode="tab-exit" />
      </section>

      <section>
        <Header
          title="'tab-only'"
          description="The Card will not trap focus but will still be focusable and allow Tab navigation of its
          contents."
        />
        <CardExample focusMode="tab-only" />
      </section>
    </div>
  );
};

FocusMode.parameters = {
  docs: {
    description: {
      story:
        'Cards can be focusable and manage the focus of their contents in several different strategies. ' +
        'Using the `focusMode` prop, we can achieve the following:',
    },
  },
};
