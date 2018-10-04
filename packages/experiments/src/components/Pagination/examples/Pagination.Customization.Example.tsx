import * as React from 'react';
import { Pagination } from '@uifabric/experiments/lib/Pagination';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}
export class PaginationCustomizationExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = { selectedPageIndex: 15 };
  }

  public render(): JSX.Element {
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={50}
        previousLabel={'<<'}
        nextLabel={'>>'}
        omissionLabel={'......'}
        marginPages={2}
        pageAriaLabel={'page'}
        onPageChange={this.onPageChange}
        styles={{
          pageNumber: {
            fontWeight: 'bold',
            selectors: {
              ':hover': { backgroundColor: '#c8c8c8' },
              '&:aria-selected=true': {
                color: 'red',
                fontWeight: 'bold',
                textDecoration: 'underline'
              },
              '&[aria-selected=true]': {
                color: 'red',
                fontWeight: 'bold',
                textDecoration: 'underline'
              }
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
