import * as React from 'react';
import { isConformant } from '@fluentui/react-conformance';
import { mount } from 'enzyme';
import { Primitive } from './Primitive';

// eslint-disable-next-line
xdescribe('Primitive', () => {
  isConformant({
    Component: Primitive,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Primitive',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it.each`
    children           | dir
    ${'hi'}            | ${'auto'}
    ${(<div>hi</div>)} | ${undefined}
  `(`uses 'dir=auto' only when children is plain text`, ({ children, dir }) => {
    const wrapper = mount(<Primitive>{children}</Primitive>);
    expect(wrapper.childAt(0).prop('dir')).toBe(dir);
  });
});
