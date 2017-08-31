
import * as React from 'react';
import { ILayoutGroupProps } from './LayoutGroup.props';
import { mergeStyles } from '@uifabric/styling';
// import { css } from 'office-ui-fabric-react/lib/Utilities';

export interface ILayoutGroupState {
  // TODO Add animation support for drag/drop events.
}

export class LayoutGroup extends React.Component<ILayoutGroupProps, any> {

  public static defaultProps: ILayoutGroupProps = {
    gap: 8,
    direction: 'vertical'
  }

  public render(): JSX.Element | null {
    const {
      children,
      direction,
      gap
    } = this.props;

    const group = React.Children.map(children, (child: React.ReactChild, i: number) => {
      const numberOfChildren = React.Children.count(children);
      const marginDirection = direction === 'horizontal' ? 'right' : 'bottom';
      return (
        <div className={
          mergeStyles(
            'ms-LayoutGroup-item',
            direction === 'horizontal' && i < numberOfChildren - 1 && {
              marginRight: gap + 'px'
            },
            direction === 'vertical' && i < numberOfChildren - 1 && {
              marginBottom: gap + 'px'
            }
          ) as string
        }>
          { child }
        </div>
      );
    });

    return (
      <div className={
        mergeStyles(
          'ms-LayoutGroup',
          {
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column'
          }
        ) as string
      }>
        { group }
      </div>
    );
  }
}
