import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RenderDropdown = (props: any) => {
  return (
    <div>
      <Dropdown options={[]} isDisabled={true} />
      <Dropdown options={[]} isDisabled={false}>
        {' '}
        Woo Hoo!{' '}
      </Dropdown>
    </div>
  );
};
