import * as React from 'react';
import { Pagination } from '@uifabric/experiments/lib/Pagination';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}
export class PaginationBasicExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = { selectedPageIndex: 0 };
  }

  public render(): JSX.Element {
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={15}
        previousLabel={'previous'}
        previousAriaLabel={'previous page'}
        nextLabel={'next'}
        nextAriaLabel={'next page'}
        pageAriaLabel={'page'}
        omittedPagesAriaLabel={'more pages'}
        onPageChange={this.onPageChange}
      />
    );
  }

  private onPageChange = (index: number): void => {
    this.setState({
      selectedPageIndex: index
    });
  };
}
