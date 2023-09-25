import * as React from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { getNativeProps, divProperties } from '@fluentui/react/lib/Utilities';
import type { ILayoutGroupProps } from './LayoutGroup.types';
import type { IRawStyle } from '@fluentui/react/lib/Styling';

export class LayoutGroup extends React.Component<ILayoutGroupProps, {}> {
  public static defaultProps: ILayoutGroupProps = {
    layoutGap: 8,
    direction: 'vertical',
    justify: 'start',
  };

  public render(): JSX.Element | null {
    const { children, direction, layoutGap, justify } = this.props;

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    const numberOfChildren = React.Children.count(children);

    const group = React.Children.map(children, (child: React.ReactChild, i: number) => {
      const isLastChild = i === numberOfChildren - 1;

      // Render individual item
      return (
        <div
          className={mergeStyles(
            'ms-LayoutGroup-item',
            direction === 'horizontal' &&
              !isLastChild && {
                marginRight: layoutGap + 'px',
              },
            direction === 'vertical' &&
              !isLastChild && {
                marginBottom: layoutGap + 'px',
              },
            justify === 'fill' && {
              flexBasis: '0',
              flexGrow: 1,
            },
          )}
        >
          {child}
        </div>
      );
    });

    // Render all items
    return (
      <div
        {...divProps}
        className={mergeStyles(
          'ms-LayoutGroup',
          {
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            justifyContent: this._getJustify(justify),
          } as IRawStyle,
          divProps.className,
        )}
      >
        {group}
      </div>
    );
  }

  private _getJustify = (justify: string | undefined): string => {
    if (justify === 'end') {
      return 'flex-end';
    } else if (justify === 'center') {
      return 'center';
    } else {
      return 'flex-start';
    }
  };
}
