import * as React from 'react';
import { Drawer, DrawerBody, DrawerBodyProps, DrawerFooter } from '@fluentui/react-drawer';
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

  container: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const Header = () => {
  const styles = useStyles();

  return (
    <header className={styles.container}>
      <strong>This is a header</strong>
    </header>
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
