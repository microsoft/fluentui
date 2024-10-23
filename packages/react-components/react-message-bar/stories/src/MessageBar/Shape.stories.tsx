import * as React from 'react';
import { makeStyles, MessageBar, MessageBarTitle, MessageBarBody } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Shape = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <MessageBar shape="rounded">
        <MessageBarBody>
          <MessageBarTitle>Rounded shape</MessageBarTitle>
          This message has rounded shape.
        </MessageBarBody>
      </MessageBar>
      <MessageBar shape="square">
        <MessageBarBody>
          <MessageBarTitle>Square shape</MessageBarTitle>
          This message has square shape.
        </MessageBarBody>
      </MessageBar>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar can have either rounded or square corners, please follow the usage guidance for these shapes:',
        '- **_rounded_** used for component level message bars',
        '- **_square_** used for page/app level message bars',
      ].join('\n'),
    },
  },
};
