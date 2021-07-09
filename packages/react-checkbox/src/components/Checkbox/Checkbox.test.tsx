import * as React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { mount } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Checkbox', () => {
  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Checkbox>Default Checkbox</Checkbox>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders unchecked correctly', () => {
    const result = render(<Checkbox>Default Checkbox</Checkbox>);
    expect(result).toMatchSnapshot();
  });

  it('renders checked correctly', () => {
    const result = render(<Checkbox checked>Default Checkbox</Checkbox>);
    expect(result).toMatchSnapshot();
  });

  it('renders mixed correctly', () => {
    const result = render(<Checkbox checked="mixed">Default Checkbox</Checkbox>);
    expect(result).toMatchSnapshot();
  });

  it('respects id prop', () => {
    const result = mount(
      <Checkbox aria-describedby="descriptionID" id="checkbox">
        Default Checkbox
      </Checkbox>,
    );
    expect(result.find('input').prop('id')).toEqual('checkbox');
  });

  it('defaults to unchecked non-mixed', () => {
    const result = mount(<Checkbox>Default Checkbox</Checkbox>);

    const input = result.find('input');
    expect(input.prop('checked')).toBe(false);
    expect(input.prop('aria-checked')).toBe(false);
  });

  // it('respects defaultChecked prop', () => {
  //   const checkedCbx = mount(<Checkbox defaultChecked />);
  //   const mixedCbx = mount(<Checkbox defaultChecked="mixed" />);

  //   const input = component.find('input');
  // });

  // it('ignores defaulChecked updated', () => {});

  // it('respects checked prop', () => {});

  // it('respects checked updates', () => {});

  // it('automatically updates on change when uncontrolled', () => {});

  // it('does not automatically update on change when controlled', () => {});

  // it('removes uncontrolled mixed state', () => {});

  // it('renders with mixed when controlled', () => {});

  // it('removes controlled mixed', () => {});

  // it("doesn't remove controlled mixed when no onChange provided", () => {});
});
