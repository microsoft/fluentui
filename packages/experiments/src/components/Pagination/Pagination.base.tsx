import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { PageNumber } from './PageNumber';
import { IPaginationProps, IPaginationStyleProps, IPaginationStyles } from './Pagination.types';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';

const getClassNames = classNamesFunction<IPaginationStyleProps, IPaginationStyles>();

export class PaginationBase extends BaseComponent<IPaginationProps, {}> {
  public static defaultProps: Partial<IPaginationProps> = {
    nextLabel: '>>',
    previousLabel: '<<',
    selectedPageIndex: 0,
    pageRange: 2,
    marginPagesDisplayed: 1,
    omissionLabel: '...'
  };

  private _classNames: { [key in keyof IPaginationStyles]: string };

  constructor(props: IPaginationProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { styles, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!
    });

    const canPrevious = this.props.selectedPageIndex! > 0;
    const canNext = this.props.selectedPageIndex! + 1 < this.props.pageCount;

    // FocusZone handles A11Y requirement such as:
    // Dynamically set tabindex (0 or -1) to the correct item
    // Refocus to the active item when component re-renders
    // Handles all key strokes, e.g., left/right, space, enter
    return (
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <ul className={this._classNames.root} role="tablist">
          <li key="previousPage">
            <button
              className={this._classNames.previousNextPage}
              onClick={this.handlePreviousPage}
              disabled={!canPrevious}
              role="tab"
              aria-label={this.props.previousAriaLabel}
            >
              {this.props.previousLabel}
            </button>
          </li>
          {this._pageList(this._classNames)}
          <li key="nextPage">
            <button
              className={this._classNames.previousNextPage}
              onClick={this.handleNextPage}
              disabled={!canNext}
              role="tab"
              aria-label={this.props.nextAriaLabel}
            >
              {this.props.nextLabel}
            </button>
          </li>
        </ul>
      </FocusZone>
    );
  }

  private handleSelectedPage = (selected: number) => {
    if (selected === this.props.selectedPageIndex) {
      return; // same page, no action
    }
    if (this.props.onPageChange) {
      this.props.onPageChange(selected);
    }
  };

  private handlePreviousPage = () => {
    this.handleSelectedPage(this.props.selectedPageIndex! - 1);
  };

  private handleNextPage = () => {
    this.handleSelectedPage(this.props.selectedPageIndex! + 1);
  };

  private _pageElement(index: number): JSX.Element {
    return (
      <PageNumber
        key={index + 1}
        page={index + 1}
        pageAriaLabel={this.props.pageAriaLabel}
        selected={index === this.props.selectedPageIndex}
        applyPage={this.handleSelectedPage}
        className={this._classNames.pageNumber}
      />
    );
  }

  private _pageList(classNames: { [key in keyof IPaginationStyles]: string }): JSX.Element[] {
    const element = [];
    if (this.props.pageCount <= this.props.pageRange!) {
      for (let index = 0; index < this.props.pageCount; index++) {
        element.push(this._pageElement(index));
      }
    } else {
      const leftHalfCount = this.props.pageRange! / 2;
      const rightHalfCount = this.props.pageRange! - leftHalfCount;

      let leftSide = leftHalfCount;
      let rightSide = rightHalfCount;

      if (this.props.selectedPageIndex! > this.props.pageCount - 1 - leftHalfCount) {
        rightSide = this.props.pageCount - 1 - this.props.selectedPageIndex!;
        leftSide = this.props.pageRange! - rightSide;
      } else if (this.props.selectedPageIndex! < leftHalfCount) {
        leftSide = this.props.selectedPageIndex!;
        rightSide = this.props.pageRange! - leftSide;
      }

      let previousIndexIsOmitted = false;
      for (let index = 0; index < this.props.pageCount; index++) {
        const page = index + 1;
        if (
          page <= this.props.marginPagesDisplayed! ||
          page > this.props.pageCount - this.props.marginPagesDisplayed! ||
          (index >= this.props.selectedPageIndex! - leftSide && index <= this.props.selectedPageIndex! + rightSide)
        ) {
          element.push(this._pageElement(index));
          previousIndexIsOmitted = false;
          continue;
        }

        if (previousIndexIsOmitted === false) {
          const listKey = 'ellipsis' + index.toString();
          element.push(
            <li key={listKey} className={this._classNames.omission} aria-label={this.props.omittedPagesAriaLabel}>
              {this.props.omissionLabel}
            </li>
          );
          previousIndexIsOmitted = true;
        }
      }
    }

    return element;
  }
}
