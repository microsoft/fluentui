import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Avatar, AvatarProps } from './index';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(15, 1fr)',
    gridAutoFlow: 'row',
    gap: '4px',
    margin: '16px 0',
  },

  title: {
    margin: 0,
  },
});

const Grid: React.FC<{ title?: string; description?: string }> = p => {
  const classes = useStyles();

  return (
    <>
      {p.title && <h4 className={classes.title}>{p.title}</h4>}
      {p.description}
      <div className={classes.grid}>{p.children}</div>
    </>
  );
};

export const Color = (props: Partial<AvatarProps>) => (
  <>
    <Grid title="neutral, brand">
      <Avatar {...props} color="neutral" />
      <Avatar {...props} color="brand" />
    </Grid>
    <Grid title="named colors">
      <Avatar {...props} color="darkRed" />
      <Avatar {...props} color="cranberry" />
      <Avatar {...props} color="red" />
      <Avatar {...props} color="pumpkin" />
      <Avatar {...props} color="peach" />
      <Avatar {...props} color="marigold" />
      <Avatar {...props} color="gold" />
      <Avatar {...props} color="brass" />
      <Avatar {...props} color="brown" />
      <Avatar {...props} color="forest" />
      <Avatar {...props} color="seafoam" />
      <Avatar {...props} color="darkGreen" />
      <Avatar {...props} color="lightTeal" />
      <Avatar {...props} color="teal" />
      <Avatar {...props} color="steel" />
      <Avatar {...props} color="blue" />
      <Avatar {...props} color="royalBlue" />
      <Avatar {...props} color="cornflower" />
      <Avatar {...props} color="navy" />
      <Avatar {...props} color="lavender" />
      <Avatar {...props} color="purple" />
      <Avatar {...props} color="grape" />
      <Avatar {...props} color="lilac" />
      <Avatar {...props} color="pink" />
      <Avatar {...props} color="magenta" />
      <Avatar {...props} color="plum" />
      <Avatar {...props} color="beige" />
      <Avatar {...props} color="mink" />
      <Avatar {...props} color="platinum" />
      <Avatar {...props} color="anchor" />
    </Grid>
    <Grid title="colorful" description="A color can be derived automatically from the name.">
      <Avatar {...props} color="colorful" name="Carole Poland" />
      <Avatar {...props} color="colorful" name="Carlos Slattery" />
      <Avatar {...props} color="colorful" name="Robert Tolbert" />
      <Avatar {...props} color="colorful" name="Kevin Sturgis" />
      <Avatar {...props} color="colorful" name="Charlotte Waltson" />
    </Grid>
  </>
);
