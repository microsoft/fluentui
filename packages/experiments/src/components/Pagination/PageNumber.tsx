import * as React from 'react';
import { IPageNumberProps } from './Pagination.types';

export class PageNumber extends React.Component<IPageNumberProps, {}> {
  constructor(props: IPageNumberProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { pageAriaLabel, page } = this.props;
    const ariaLabel = pageAriaLabel && `${pageAriaLabel} ${page}`;

    return (
      <li key={this.props.page}>
        <button
          className={this.props.className}
          onClick={this.onClick}
          aria-selected={this.props.selected}
          aria-label={ariaLabel}
          data-page-number={this.props.page}
          role={'tab'}
        >
          {this.props.page}
        </button>
      </li>
    );
  }

  private onClick = () => {
    this.props.applyPage(this.props.page - 1);
  };
}
