import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Listbox } from '../Listbox/Listbox';
import { OptionGroup } from './OptionGroup';

const ListboxWrapper = ({ children }: React.PropsWithChildren): React.ReactElement => (
  <Listbox aria-label="Options">{children}</Listbox>
);

describe('OptionGroup', () => {
  isConformant({
    Component: OptionGroup,
    displayName: 'OptionGroup',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { label: 'Group', children: <div role="option">Option</div> },
    renderOptions: { wrapper: ListboxWrapper },
    getTargetElement: result => result.getByRole('group'),
  });

  it('applies stable slot class names', () => {
    const { getByRole, getByText } = render(
      <OptionGroup label="Group">
        <div role="option">Option</div>
      </OptionGroup>,
    );

    expect(getByRole('group')).toHaveClass('fui-OptionGroup');
    expect(getByText('Group')).toHaveClass('fui-OptionGroup__label');
  });
});
