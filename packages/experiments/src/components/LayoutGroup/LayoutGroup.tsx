
import * as React from 'react';
import { ILayoutGroupProps } from './LayoutGroup.props';
import { IExtendedRawStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class LayoutGroup extends React.Component<ILayoutGroupProps, {}> {

  public static defaultProps: ILayoutGroupProps = {
    gap: 8,
    direction: 'vertical',
    justify: 'start'
  };

  public render(): JSX.Element | null {
    const {
      children,
      direction,
      gap,
      justify
    } = this.props;

    const numberOfChildren = React.Children.count(children);

    const group = React.Children.map(children, (child: React.ReactChild, i: number) => {
      const isLastChild = i === numberOfChildren - 1;

      return (
        <div
          className={
            mergeStyles(
              'ms-LayoutGroup-item',
              direction === 'horizontal' && !isLastChild && {
                marginRight: gap + 'px'
              },
              direction === 'vertical' && !isLastChild && {
                marginBottom: gap + 'px'
              },
              justify === 'fill' && {
                flexBasis: '0',
                flexGrow: 1
              }

            ) as string
          }
        >
          { child }
        </div>
      );
    });

    return (
      <div
        className={
          mergeStyles(
            'ms-LayoutGroup',
            {
              display: 'flex',
              flexDirection: direction === 'horizontal' ? 'row' : 'column',
              justifyContent: this._getJustify(justify)
            } as IExtendedRawStyle
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
