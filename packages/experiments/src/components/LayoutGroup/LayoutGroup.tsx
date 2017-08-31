
import * as React from 'react';
import { ILayoutGroupProps } from './LayoutGroup.props';
import { mergeStyles } from '@uifabric/styling';

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

    let justifyValue: string;

    switch (justify) {
      case 'end':
        justifyValue = 'flex-end';
        break;
      case 'center':
        justifyValue = 'center';
        break;
      default:
        justifyValue = 'flex-start'
    };

    const group = React.Children.map(children, (child: React.ReactChild, i: number) => {
      const numberOfChildren = React.Children.count(children);
      return (
        <div
          className={
            mergeStyles(
              'ms-LayoutGroup-item',
              direction === 'horizontal' && i < numberOfChildren - 1 && {
                marginRight: gap + 'px'
              },
              direction === 'vertical' && i < numberOfChildren - 1 && {
                marginBottom: gap + 'px'
              },
              justify === 'fill' && {
                flexBasis: 0,
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
              justifyContent: justifyValue
            }
          ) as string
        }
      >
        { group }
      </div>
    );
  }
}
