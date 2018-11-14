import * as React from 'react';
import { IPageNumberProps } from './PageNumber.types';

export class PageNumber extends React.Component<IPageNumberProps, {}> {
  constructor(props: IPageNumberProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { className, ariaLabel, page, selected } = this.props;

    return (
      <button
        key={page}
        className={className}
        onClick={this.onClick}
        aria-selected={selected}
        aria-label={ariaLabel}
      >
        {page}
      </button>
    );
  }

  private onClick = () => {
    this.props.applyPage(this.props.page - 1);
  };
}
