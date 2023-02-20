import * as React from 'react';
import { makeStyles, shorthands, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    width: '64px',
    height: '64px',
    ...shorthands.margin('10px'),
    ...shorthands.borderRadius('50%'),
    backgroundColor: 'silver',
    ...shorthands.outline('1px', 'solid', 'transparent'),

    transitionProperty: 'outline',
    transitionDuration: '500ms, 100ms',
    transitionDelay: 'cubic-bezier(0.80,0.00,0.20,1.00), linear',
  },
  x: {
    ...shorthands.outline('10px', 'solid', 'cornflowerblue'),
  },
});

const onTransitionEnd = () => {
  console.log('transitionEnd');
};

export const Default = () => {
  const classes = useStyles();
  const [border, setBorder] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBorder(b => !b);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div onTransitionEnd={onTransitionEnd} className={mergeClasses(classes.root, border && classes.x)} />;
};
