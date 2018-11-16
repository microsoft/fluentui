import * as React from 'react';
import { IPageNumberProps } from './PageNumber.types';

import { buttonProperties, getNativeProps } from '../../Utilities';

export class PageNumber extends React.Component<IPageNumberProps, {}> {
  constructor(props: IPageNumberProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { ariaLabel, page, selected } = this.props;

    return (
      <button
        {...getNativeProps(this.props, buttonProperties)}
        key={page}
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
