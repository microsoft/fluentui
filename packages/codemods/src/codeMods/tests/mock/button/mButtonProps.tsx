/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Button } from 'office-ui-fabric-react/lib/Button';

export const RenderButton = (props: any) => {
  return (
    <div>
      <Button toggled={true} />
      <Button> toggled={false} </Button>
    </div>
  );
};
