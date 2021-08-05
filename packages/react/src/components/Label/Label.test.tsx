import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import { Label } from './Label';

describe('Label', () => {
  it('renders a label', () => {
    const label = mount(<Label>test</Label>);
    expect(label.text()).toEqual('test');
  });

  it('renders label correctly', () => {
    const component = renderer.create(<Label>test</Label>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Label,
    displayName: 'Label',
    skipAsPropTests: false,
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
