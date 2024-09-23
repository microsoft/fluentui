import * as React from 'react';
import { isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
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
    const { container } = render(<Primitive>{children}</Primitive>);
    expect(container.firstChild).toHaveAttribute('dir', dir);
  });
});
