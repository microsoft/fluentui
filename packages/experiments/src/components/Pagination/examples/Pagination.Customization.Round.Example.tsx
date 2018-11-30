import * as React from 'react';
import { Pagination } from '@uifabric/experiments/lib/Pagination';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}

export class PaginationCustomizationRoundExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedPageIndex: 0 };
  }

  public render(): JSX.Element {
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={27}
        itemsPerPage={10}
        totalItemCount={268}
        previousPageAriaLabel={'previous page'}
        nextPageAriaLabel={'next page'}
        firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'}
        pageAriaLabel={'page'}
        selectedAriaLabel={'selected'}
        onPageChange={this.onPageChange}
        styles={{
          previousNextPage: {
            color: '#0078d4'
          },
          pageNumber: {
            width: '32px',
            height: '32px',
            textAlign: 'center',
            selectors: {
              ':hover': {
                borderRadius: '16px'
              },
              '&:aria-selected=true': {
                backgroundColor: '#0078d4',
                fontWeight: 'bold',
                borderRadius: '16px',
                color: 'white'
              },
              '&[aria-selected=true]': {
                backgroundColor: '#0078d4',
                fontWeight: 'bold',
                borderRadius: '16px',
                color: 'white'
              },
              '&:hover:aria-selected=true': { color: 'white' },
              '&:hover[aria-selected=true]': { color: 'white' }
            }
          }
        }}
      />
    );
  }

  private onPageChange = (index: number): void => {
    this.setState({
      selectedPageIndex: index
    });
  };
}
