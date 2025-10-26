import * as React from 'react';
import { Pagination } from '@fluentui/react-experiments/lib/Pagination';
import type { JSXElement } from '@fluentui/utilities';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}

export class PaginationComboBoxExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedPageIndex: 0 };
  }

  public render(): JSXElement {
    const pageCount = 28;
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={pageCount}
        onPageChange={this._onPageChange}
        format={'comboBox'}
        comboBoxAriaLabel={`${pageCount} pages available`}
        previousPageAriaLabel={'previous page'}
        nextPageAriaLabel={'next page'}
        firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'}
        pageAriaLabel={'page'}
        firstPageIconProps={{ iconName: 'DoubleChevronLeft' }}
        previousPageIconProps={{ iconName: 'ChevronLeft' }}
        nextPageIconProps={{ iconName: 'ChevronRight' }}
        lastPageIconProps={{ iconName: 'DoubleChevronRight' }}
      />
    );
  }

  private _onPageChange = (index: number): void => {
    this.setState({
      selectedPageIndex: index,
    });
  };
}
