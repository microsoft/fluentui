import React from 'react';
import { Skeleton, Box, Button } from '@fluentui/react-northstar';

const SkeletonsExampleDefault: React.FC<any> = props => {
  const [displayed, setDisplayed] = React.useState(false);

  return (
    <Box styles={{ 'background-color': 'white', height: '400px' }}>
      <Button content="only to set focus" />
      <Button content="show skeleton" onClick={() => setDisplayed(!displayed)} />
      {displayed && (
        <>
          <Skeleton aria-label="loading messages">
            <Skeleton.Shape />
            <Skeleton.Line />
            <Skeleton.Line width="70%" />
            <Skeleton.Line width="50%" />
          </Skeleton>
          <Skeleton aria-label="loading user cards">
            <Skeleton.Shape />
            <Skeleton.Line />
            <Skeleton.Line width="70%" />
            <Skeleton.Line width="50%" />
          </Skeleton>
        </>
      )}
    </Box>
  );
};

export default SkeletonsExampleDefault;
