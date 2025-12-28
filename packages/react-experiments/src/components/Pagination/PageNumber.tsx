import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import type { IPageNumberProps } from './PageNumber.types';
import type { JSXElement } from '@fluentui/utilities';

export class PageNumber extends React.Component<IPageNumberProps, {}> {
  constructor(props: IPageNumberProps) {
    super(props);
  }

  public render(): JSXElement {
    const { ariaLabel, page, selected, className } = this.props;

    return (
      <DefaultButton
        key={page}
        onClick={this._onClick}
        aria-checked={selected}
        aria-label={ariaLabel}
        styles={{ root: className }}
        role="radio"
      >
        {page}
      </DefaultButton>
    );
  }

  private _onClick = () => {
    this.props.onClick(this.props.page - 1);
  };
}
