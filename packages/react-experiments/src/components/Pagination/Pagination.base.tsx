import * as React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeComponentRef, classNamesFunction } from '../../Utilities';
import { PageNumber } from './PageNumber';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import type { IPaginationProps, IPaginationString, IPaginationStyleProps, IPaginationStyles } from './Pagination.types';
import type { IComboBoxOption, IComboBox } from '@fluentui/react/lib/ComboBox';
import type { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IPaginationStyleProps, IPaginationStyles>();

const DEFAULT_STRINGS: IPaginationString = {
  of: 'of',
  divider: '-',
};

export class PaginationBase extends React.Component<IPaginationProps> {
  public static defaultProps: Partial<IPaginationProps> = {
    selectedPageIndex: 0,
    format: 'comboBox',
    numberOfPageButton: 5,
    previousPageIconProps: { iconName: 'CaretSolidLeft' },
    nextPageIconProps: { iconName: 'CaretSolidRight' },
    firstPageIconProps: { iconName: 'Previous' },
    lastPageIconProps: { iconName: 'Next' },
    strings: DEFAULT_STRINGS,
  };

  private _classNames: IProcessedStyleSet<IPaginationStyles>;

  constructor(props: IPaginationProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const {
      comboBoxAriaLabel,
      firstPageAriaLabel,
      previousPageAriaLabel,
      nextPageAriaLabel,
      lastPageAriaLabel,
      firstPageIconProps,
      previousPageIconProps,
      nextPageIconProps,
      lastPageIconProps,
      pageAriaLabel,
      pageCount,
      selectedPageIndex,
      onRenderVisibleItemLabel = this._renderVisibleItemLabel,
      format,
      styles,
      theme,
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      format: format,
    });

    const canPrevious = selectedPageIndex! > 0;
    const canNext = selectedPageIndex! + 1 < pageCount;
    const canFirst = selectedPageIndex !== 0;
    const canLast = selectedPageIndex !== pageCount - 1;

    if (format === 'comboBox') {
      const scaleOptions: IComboBoxOption[] = [];

      for (let i = 0; i < this.props.pageCount; i++) {
        scaleOptions.push({
          key: `${i}`,
          text: `${i + 1}`,
        });
      }

      return (
        <div className={this._classNames.root}>
          <IconButton
            iconProps={firstPageIconProps}
            onClick={this._handleFirstPage}
            disabled={!canFirst}
            aria-label={firstPageAriaLabel}
          />
          <IconButton
            iconProps={previousPageIconProps}
            onClick={this._handlePreviousPage}
            disabled={!canPrevious}
            aria-label={previousPageAriaLabel}
          />
          <ComboBox
            ariaLabel={comboBoxAriaLabel}
            selectedKey={`${selectedPageIndex}`}
            options={scaleOptions}
            onChange={this._onComboBoxChange}
            styles={{
              container: this._classNames.comboBox,
            }}
          />
          <IconButton
            iconProps={nextPageIconProps}
            onClick={this._handleNextPage}
            disabled={!canNext}
            aria-label={nextPageAriaLabel}
          />
          <IconButton
            iconProps={lastPageIconProps}
            onClick={this._handleLastPage}
            disabled={!canLast}
            aria-label={lastPageAriaLabel}
          />
        </div>
      );
    }

    return (
      <div className={this._classNames.root}>
        <div role="radiogroup">
          <TooltipHost content={firstPageAriaLabel} directionalHint={DirectionalHint.bottomCenter}>
            <IconButton
              iconProps={this.props.firstPageIconProps}
              onClick={this._handleFirstPage}
              disabled={!canFirst}
              aria-label={firstPageAriaLabel}
              styles={{
                icon: this._classNames.previousNextPage,
                rootDisabled: this._classNames.previousNextPageDisabled,
              }}
            />
          </TooltipHost>
          <TooltipHost content={previousPageAriaLabel} directionalHint={DirectionalHint.bottomCenter}>
            <IconButton
              iconProps={this.props.previousPageIconProps}
              onClick={this._handlePreviousPage}
              disabled={!canPrevious}
              aria-label={previousPageAriaLabel}
              styles={{
                icon: this._classNames.previousNextPage,
                rootDisabled: this._classNames.previousNextPageDisabled,
              }}
            />
          </TooltipHost>
          {this._pageList()}
          <TooltipHost content={nextPageAriaLabel} directionalHint={DirectionalHint.bottomCenter}>
            <IconButton
              iconProps={this.props.nextPageIconProps}
              onClick={this._handleNextPage}
              disabled={!canNext}
              aria-label={nextPageAriaLabel}
              styles={{
                icon: this._classNames.previousNextPage,
                rootDisabled: this._classNames.previousNextPageDisabled,
              }}
            />
          </TooltipHost>
          <TooltipHost
            content={`${pageAriaLabel ? pageAriaLabel + ' ' : ''}${pageCount}`}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <IconButton
              iconProps={this.props.lastPageIconProps}
              onClick={this._handleLastPage}
              disabled={!canLast}
              aria-label={lastPageAriaLabel}
              styles={{
                icon: this._classNames.previousNextPage,
                rootDisabled: this._classNames.previousNextPageDisabled,
              }}
            />
          </TooltipHost>
        </div>
        {onRenderVisibleItemLabel(this.props, this._renderVisibleItemLabel)}
      </div>
    );
  }

  private _handleFirstPage = () => {
    this._handleSelectedPage(0);
  };

  private _handleLastPage = () => {
    this._handleSelectedPage(this.props.pageCount - 1);
  };

  private _onComboBoxChange = (event: React.FormEvent<IComboBox>, option: IComboBoxOption, index: number) => {
    if (option !== undefined) {
      this._handleSelectedPage(index);
    }
  };

  private _handleSelectedPage = (selected: number) => {
    const { selectedPageIndex, onPageChange } = this.props;
    if (selected === selectedPageIndex) {
      return; // same page, no action
    }
    if (onPageChange) {
      onPageChange(selected);
    }
  };

  private _handlePreviousPage = () => {
    this._handleSelectedPage(this.props.selectedPageIndex! - 1);
  };

  private _handleNextPage = () => {
    this._handleSelectedPage(this.props.selectedPageIndex! + 1);
  };

  private _pageElement(index: number): JSX.Element {
    const { pageAriaLabel, pageCount, selectedPageIndex, selectedAriaLabel, strings } = this.props;
    const isSelected = index === selectedPageIndex;
    let ariaLabel = pageAriaLabel && `${pageAriaLabel} ${index + 1} ${strings!.of} ${pageCount}`;

    if (isSelected) {
      ariaLabel = ariaLabel + ' ' + selectedAriaLabel;
    }

    return (
      <PageNumber
        key={index + 1}
        page={index + 1}
        ariaLabel={ariaLabel}
        selected={isSelected}
        onClick={this._handleSelectedPage}
        className={this._classNames.pageNumber}
      />
    );
  }

  private _pageList(): JSX.Element[] {
    const { numberOfPageButton, pageCount, selectedPageIndex } = this.props;
    const pageList = [];
    if (pageCount <= numberOfPageButton!) {
      for (let index = 0; index < pageCount; index++) {
        pageList.push(this._pageElement(index));
      }
    } else {
      const leftHalfCount = Math.floor((numberOfPageButton! - 1) / 2);
      const rightHalfCount = numberOfPageButton! - 1 - leftHalfCount;
      let leftSide = selectedPageIndex! - leftHalfCount;
      let rightSide = selectedPageIndex! + rightHalfCount;
      if (rightSide > pageCount - 1) {
        rightSide = pageCount - 1;
        leftSide = rightSide - numberOfPageButton! + 1;
      } else if (leftSide < 0) {
        leftSide = 0;
        rightSide = numberOfPageButton! - 1;
      }
      for (let index = leftSide; index <= rightSide; index++) {
        pageList.push(this._pageElement(index));
      }
    }

    return pageList;
  }

  private _renderVisibleItemLabel = (props: IPaginationProps): JSX.Element | null => {
    if (props.onRenderVisibleItemLabel) {
      return <div className={this._classNames.visibleItemLabel}>{props.onRenderVisibleItemLabel(props)}</div>;
    }

    if (props.itemsPerPage && props.totalItemCount) {
      const leftItemIndex = props.selectedPageIndex! * props.itemsPerPage + 1;
      const rightItemsIndex = Math.min((props.selectedPageIndex! + 1) * props.itemsPerPage, props.totalItemCount);
      const visibleItemLabel = `${leftItemIndex} ${props.strings!.divider} ${rightItemsIndex} ${props.strings!.of} ${
        props.totalItemCount
      }`;
      return (
        <div className={this._classNames.visibleItemLabel} aria-label={visibleItemLabel}>
          {visibleItemLabel}
        </div>
      );
    }

    return null;
  };
}
