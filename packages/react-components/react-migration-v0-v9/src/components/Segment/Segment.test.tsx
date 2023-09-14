import '@testing-library/jest-dom';
import { isConformant } from '@fluentui/react-conformance';
import * as React from 'react';
import { render } from '@testing-library/react';

import { Segment } from './Segment';

// TODO[Jest] Investigate this. Possible out of memory. Job didn't finish the work in the pipeline
// eslint-disable-next-line
xdescribe('Segment', () => {
  isConformant({
    Component: Segment,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Segment',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const { getByText } = render(<Segment>Test</Segment>);
    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('DIV');
  });
});
