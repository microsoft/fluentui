import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Listbox } from '../Listbox/Listbox';
import { Option } from './Option';

const ListboxWrapper = ({ children }: React.PropsWithChildren): React.ReactElement => (
  <Listbox aria-label="Options">{children}</Listbox>
);

describe('Option', () => {
  isConformant({
    Component: Option,
    displayName: 'Option',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Option' },
    renderOptions: { wrapper: ListboxWrapper },
    getTargetElement: result => result.getByRole('option'),
  });

  it('maps selection state and preserves a custom class name', () => {
    const { getByRole } = render(
      <Listbox aria-label="Options" selectedOptions={['value']}>
        <Option className="custom-class" value="value">
          Option
        </Option>
      </Listbox>,
    );

    expect(getByRole('option')).toHaveAttribute('data-selected');
    expect(getByRole('option')).toHaveClass('fui-Option', 'custom-class');
  });
});
