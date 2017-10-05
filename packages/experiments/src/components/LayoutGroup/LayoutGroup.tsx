
import * as React from 'react';
import { ILayoutGroupProps } from './LayoutGroup.props';
import { IRawStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import {
  autobind,
  getNativeProps,
  divProperties
} from 'office-ui-fabric-react/lib/Utilities';

export class LayoutGroup extends React.Component<ILayoutGroupProps, {}> {

  public static defaultProps: ILayoutGroupProps = {
    layoutGap: 8,
    direction: 'vertical',
    justify: 'start'
  };

  public render(): JSX.Element | null {
    const {
      children,
      direction,
      layoutGap,
      justify,
    } = this.props;

    let divProps = getNativeProps(this.props, divProperties);

    const numberOfChildren = React.Children.count(children);

    const group = React.Children.map(children, (child: React.ReactChild, i: number) => {
      const isLastChild = i === numberOfChildren - 1;

      // Render individual item
      return (
        <div
          className={
            mergeStyles(
              'ms-LayoutGroup-item',
              direction === 'horizontal' && !isLastChild && {
                marginRight: layoutGap + 'px'
              },
              direction === 'vertical' && !isLastChild && {
                marginBottom: layoutGap + 'px'
              },
              justify === 'fill' && {
                flexBasis: '0',
                flexGrow: 1
              }

            )
          }
        >
          { child }
        </div>
      );
    });

    // Render all items
    return (
      <div
        { ...divProps }
        className={
          mergeStyles(
            'ms-LayoutGroup',
            {
              display: 'flex',
              flexDirection: direction === 'horizontal' ? 'row' : 'column',
              justifyContent: this._getJustify(justify)
            } as IRawStyle
          )
        }
      >
        { group }
      </div>
    );
  }

  @autobind
  private _getJustify(justify: string | undefined): string {
    if (justify === 'end') {
      return 'flex-end';
    } else if (justify === 'center') {
      return 'center';
    } else {
      return 'flex-start';
    }
  }
}
