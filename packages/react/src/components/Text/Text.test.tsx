import * as React from 'react';
import { render } from '@testing-library/react';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

import { Text } from './Text';

describe('Text', () => {
  it('renders default Text correctly', () => {
    const { container } = render(<Text>I'm default text</Text>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Text with {0} as its children correctly', () => {
    const { container } = render(<Text>{0}</Text>);
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: Text,
    displayName: 'Text',
    requiredProps: { children: 'content' },
    componentPath: path.join(__dirname, 'Text.ts'),
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });
});
