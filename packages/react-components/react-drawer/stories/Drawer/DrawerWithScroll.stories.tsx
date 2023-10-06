import * as React from 'react';
import { DrawerInline, DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerFooter } from '@fluentui/react-drawer';
import { Button, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: tokens.spacingHorizontalXXL,
    columnGap: tokens.spacingHorizontalXXL,
  },

  drawer: {
    height: '400px',
    minWidth: '320px',
  },
});

const Header = () => {
  return (
    <DrawerHeader>
      <DrawerHeaderTitle>Title goes here</DrawerHeaderTitle>
    </DrawerHeader>
  );
};

const Footer = () => {
  return (
    <DrawerFooter>
      <Button appearance="primary">Primary</Button>
      <Button>Secondary</Button>
    </DrawerFooter>
  );
};

const Body = () => {
  return (
    <DrawerBody>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus nam aut amet similique, iure vel voluptates
      cum cumque repellendus perferendis maiores officia unde in? Autem neque sequi maiores eum omnis. Lorem ipsum,
      dolor sit amet consectetur adipisicing elit. Perspiciatis ipsam explicabo tempora ipsum saepe nam. Eum aliquid
      aperiam, laborum labore excepturi nisi odio deserunt facilis error. Mollitia dolor quidem a. Lorem ipsum, dolor
      sit amet consectetur adipisicing elit. Eius soluta ea repellendus voluptatum provident ad aut unde accusantium
      sed. Officia qui praesentium repudiandae maxime molestias, non mollitia animi laboriosam quis. Lorem, ipsum dolor
      sit amet consectetur adipisicing elit. Inventore, architecto eligendi earum dolor voluptas hic minima nihil porro
      odio suscipit quaerat accusantium, aperiam, neque beatae ipsa explicabo consequatur cum quam?
    </DrawerBody>
  );
};

export const WithScroll = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <DrawerInline className={styles.drawer} open>
        <Body />
      </DrawerInline>

      <DrawerInline className={styles.drawer} open>
        <Header />
        <Body />
      </DrawerInline>

      <DrawerInline className={styles.drawer} open>
        <Body />
        <Footer />
      </DrawerInline>

      <DrawerInline className={styles.drawer} open>
        <Header />
        <Body />
        <Footer />
      </DrawerInline>
    </div>
  );
};

WithScroll.parameters = {
  docs: {
    description: {
      story: [
        'By default, the drawer will not scroll its content when it overflows.',
        'To enable this behavior, the DrawerBody component can be used to wrap the content of the drawer.',
      ].join('\n'),
    },
  },
};
