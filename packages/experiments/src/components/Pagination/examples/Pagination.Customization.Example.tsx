import * as React from 'react';
import { Pagination } from '../Pagination';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}
export class PaginationCustomizaionExample extends React.Component<{}, IPaginationBasicExampleState> {
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
        marginPagesDisplayed={2}
        pageAriaLabel={'page'}
        onPageChange={this.onPageChange}
        styles={{
          pageNumber: {
            fontWeight: 'bold',
            selectors: {
              ':hover': { backgroundColor: '#c8c8c8' }
            }
          },
          selectedPageNumber: {
            color: 'red',
            textDecoration: 'underline'
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
