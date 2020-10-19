import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { IPageNumberProps } from './PageNumber.types';

export class PageNumber extends React.Component<IPageNumberProps, {}> {
  constructor(props: IPageNumberProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { ariaLabel, page, selected, className } = this.props;

    return (
      <DefaultButton
        key={page}
        onClick={this._onClick}
        aria-selected={selected}
        aria-label={ariaLabel}
        styles={{ root: className }}
      >
        {page}
      </DefaultButton>
    );
  }

  private _onClick = () => {
    this.props.onClick(this.props.page - 1);
  };
}
