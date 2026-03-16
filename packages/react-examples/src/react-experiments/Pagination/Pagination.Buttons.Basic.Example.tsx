import * as React from 'react';
import { Pagination } from '@fluentui/react-experiments/lib/Pagination';
import type { JSXElement } from '@fluentui/utilities';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}

export class PaginationButtonsBasicExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedPageIndex: 0 };
  }

  public render(): JSXElement {
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={27}
        itemsPerPage={10}
        totalItemCount={268}
        format={'buttons'}
        previousPageAriaLabel={'previous page'}
        nextPageAriaLabel={'next page'}
        firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'}
        pageAriaLabel={'page'}
        selectedAriaLabel={'selected'}
        onPageChange={this._onPageChange}
      />
    );
  }

  private _onPageChange = (index: number): void => {
    this.setState({
      selectedPageIndex: index,
    });
  };
}
