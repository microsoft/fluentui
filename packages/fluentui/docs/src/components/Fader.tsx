import * as React from 'react';
import { Link } from 'react-router-dom';
import { createComponent, ComponentSlotStylesInput, Button, Flex } from '@fluentui/react-northstar';

type FaderProps = {
  children: JSX.Element;
  url: string;
};

export const faderStyles: ComponentSlotStylesInput<FaderProps> = {
  fader: {
    position: 'relative',
    height: '400px',
    overflow: 'hidden',
    ':after': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1) 90%)',
      width: '100%',
      height: '4em',
    },
  },
};

const Fader = createComponent<FaderProps>({
  displayName: 'Fader',
  render: ({ children, url, config: { classes } }) => {
    return (
      <Flex column hAlign="center" vAlign="center">
        <div className={classes.fader}>{children}</div>
        <Button as={Link} content="See more" text href={''} to={url} />
      </Flex>
    );
  },
});

export default Fader;
