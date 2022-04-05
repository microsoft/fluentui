import * as React from 'react';
import { Pagination } from '@fluentui/react-experiments/lib/Pagination';

export interface IPaginationBasicExampleState {
  selectedPageIndex: number;
}

export class PaginationButtonsCustomizationExample extends React.Component<{}, IPaginationBasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedPageIndex: 15 };
  }

  public render(): JSX.Element {
    return (
      <Pagination
        selectedPageIndex={this.state.selectedPageIndex}
        pageCount={50}
        numberOfPageButton={8}
        format={'buttons'}
        previousPageAriaLabel={'previous page'}
        nextPageAriaLabel={'next page'}
        firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'}
        pageAriaLabel={'page'}
        selectedAriaLabel={'selected'}
        onPageChange={this._onPageChange}
        firstPageIconProps={{ iconName: 'ChevronLeftEnd6' }}
        previousPageIconProps={{ iconName: 'ChevronLeftSmall' }}
        nextPageIconProps={{ iconName: 'ChevronRightSmall' }}
        lastPageIconProps={{ iconName: 'ChevronRightEnd6' }}
        styles={{
          previousNextPage: { color: 'black' },
          pageNumber: {
            fontWeight: 'bold',
            selectors: {
              ':hover': { backgroundColor: '#c8c8c8', borderRadius: '16px' },
              '&[aria-selected=true]': {
                fontWeight: 'bold',
              },
            },
          },
        }}
      />
    );
  }

  private _onPageChange = (index: number): void => {
    this.setState({
      selectedPageIndex: index,
    });
  };
}
