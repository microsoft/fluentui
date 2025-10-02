import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from '@fluentui/react-northstar';

type FaderProps = {
  children: JSX.Element;
  url: string;
};

const Fader: React.FC<FaderProps> = ({ children, url }) => {
  return (
    <Flex column hAlign="center" vAlign="center">
      <Box
        styles={{
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
        }}
      >
        {children}
      </Box>
      <Button as={Link} content="See more" text to={url} />
    </Flex>
  );
};

export default Fader;
