import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RenderDropdown = (props: any) => {
  return (
    <div>
      <Dropdown options={[]} dropdownWidth={0} placeHolder={'placeholder!'} isDisabled={true} />
      <Dropdown options={[]} dropdownWidth={5} placeHolder={'placeholder!'} isDisabled={false}>
        {' '}
        Woo Hoo!{' '}
      </Dropdown>
    </div>
  );
};
