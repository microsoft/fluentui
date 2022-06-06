import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Label } from './Label';

describe('Label', () => {
  it('renders a label', () => {
    const { container } = render(<Label>test</Label>);
    const label = container.querySelector('label');
    expect(label!.textContent).toEqual('test');
  });

  it('renders label correctly', () => {
    const { container } = render(<Label>test</Label>);
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: Label,
    displayName: 'Label',
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
