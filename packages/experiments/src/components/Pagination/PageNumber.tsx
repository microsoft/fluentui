import * as React from 'react';
import { IPageNumberProps } from './PageNumber.types';

export class PageNumber extends React.Component<IPageNumberProps, {}> {
  constructor(props: IPageNumberProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { className, pageAriaLabel, page, selected } = this.props;
    const ariaLabel = pageAriaLabel && `${pageAriaLabel} ${page}`;

    return (
      <li key={page}>
        <button
          className={className}
          onClick={this.onClick}
          aria-selected={selected}
          aria-label={ariaLabel}
          data-page-number={page}
          role={'tab'}
        >
          {page}
        </button>
      </li>
    );
  }

  private onClick = () => {
    this.props.applyPage(this.props.page - 1);
  };
}
