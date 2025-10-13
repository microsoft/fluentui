import * as React from 'react';
import { render } from '@testing-library/react';

import { resetIds } from '../../Utilities';
import { Pagination } from './index';

describe('Pagination', () => {
  beforeEach(() => {
    resetIds();
  });

  it('render buttons Pagination correctly', () => {
    const { container } = render(
      <Pagination
        pageCount={10}
        itemsPerPage={10}
        totalItemCount={268}
        format={'buttons'}
        previousPageAriaLabel={'previous page'}
        nextPageAriaLabel={'next page'}
        firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'}
        pageAriaLabel={'page'}
        selectedAriaLabel={'selected'}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('render comboBox Pagination correctly', () => {
    const { container } = render(
      <Pagination
        pageCount={10}
        format={'comboBox'}
        previousPageAriaLabel={'previous page'}
        nextPageAriaLabel={'next page'}
        firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'}
        pageAriaLabel={'page'}
        selectedAriaLabel={'selected'}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
