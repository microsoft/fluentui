import * as React from 'react';
import { render } from '@testing-library/react';
import { Progress } from './Progress';
import { isConformant } from '../../common/isConformant';

describe('Progress', () => {
  isConformant({
    Component: Progress,
    displayName: 'Progress',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
          },
        },
      ],
    },
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });
});
