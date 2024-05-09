import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPicker } from './TagPicker';

describe('TagPicker', () => {
  isConformant({
    Component: TagPicker,
    displayName: 'TagPicker',
    requiredProps: { children: <></> },
    disabledTests: [
      // TagPicker does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // TagPicker does not have own styles
      'make-styles-overrides-win',
    ],
  });

  it('renders a default state', () => {
    const result = render(
      <TagPicker>
        <>Default Picker</>
        <>Default Picker</>
      </TagPicker>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
