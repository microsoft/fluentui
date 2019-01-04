import * as React from 'react';
import { Pagination } from '@uifabric/experiments/lib/Pagination';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}

export class PaginationComboBoxExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedPageIndex: 0 };
  }

  public render(): JSX.Element {
    const pageCount = 28;
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={pageCount}
        onPageChange={this.onPageChange}
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

  private onPageChange = (index: number): void => {
    this.setState({
      selectedPageIndex: index
    });
  };
}
