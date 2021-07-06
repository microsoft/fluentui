import * as React from 'react';
// @ts-ignore
import { Button } from 'office-ui-fabric-react/lib/Button';

export const RenderButton = (props: any) => {
  return (
    <div>
      <Button toggled={true} />
      <Button> toggled={false} </Button>
    </div>
  );
};
