import * as React from 'react';
import { Drawer, DrawerBody, DrawerBodyProps, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button, makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    rowGap: '24px',
    columnGap: '24px',
  },

  drawer: {
    height: '300px',
  },

  footer: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Button appearance="primary">Button</Button>
    </footer>
  );
};

const Body = (props: Partial<DrawerBodyProps>) => {
  return (
    <DrawerBody {...props}>
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

export const Default = (props: Partial<DrawerBodyProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Drawer className={styles.drawer} type="inline" open>
        <Body {...props} />
      </Drawer>

      <Drawer className={styles.drawer} type="inline" open>
        <Header />
        <Body {...props} />
      </Drawer>

      <Drawer className={styles.drawer} type="inline" open>
        <Body {...props} />
        <Footer />
      </Drawer>

      <Drawer className={styles.drawer} type="inline" open>
        <Header />
        <Body {...props} />
        <Footer />
      </Drawer>
    </div>
  );
};
