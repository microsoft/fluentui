import * as React from 'react';
import { render } from '@testing-library/react';
import { Select } from './Select';
import { isConformant } from '../../common/isConformant';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    disabledTests: ['component-has-static-classname-exported'],
    primarySlot: 'select',
  });

  // Note for Select tests: avoid using getByRole;
  // The accessibility role mapping for <select> differs between Windows and macOS

  it('renders the default state', () => {
    const result = render(<Select />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders a custom icon slot', () => {
    const result = render(<Select icon="x" />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders option children', () => {
    const result = render(
      <Select>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Select>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('handles the disabled attribute', () => {
    const { getByTestId } = render(<Select data-testid="select" disabled />);
    expect((getByTestId('select') as HTMLSelectElement).disabled).toBeTruthy();
  });

  it('forwards ref to the select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    const { getByTestId } = render(<Select ref={ref} data-testid="select" />);
    expect(getByTestId('select')).toEqual(ref.current);
  });

  it('forwards id and aria-* to the select element', () => {
    const { getByTestId } = render(<Select id="select" aria-label="test" data-testid="select" />);
    const select = getByTestId('select');

    expect(select.id).toEqual('select');
    expect(select.getAttribute('aria-label')).toEqual('test');
  });
});
