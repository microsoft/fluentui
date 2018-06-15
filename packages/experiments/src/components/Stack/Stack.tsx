import * as React from 'react';
import { IStyle } from '../../Styling';
import { createComponent, IStyleProps, IViewProps, IPropsWithStyles } from '../Text/createComponent';
import StackItem, { IStackAreaProps, IStackAreaStyles } from './StackItem';

// Styles for the component
export interface IStackStyles {
  root: IStyle;
  spacer: IStyle;
}

const nameMap: any = {
  start: 'flex-start',
  end: 'flex-end'
};

// Inputs to the component
export interface IStackProps {
  renderAs?: string | React.ReactType<IStackProps>;
  children?: React.ReactNode;
  className?: string;

  fill?: boolean;

  inline?: boolean;
  vertical?: boolean;
  grow?: boolean;
  wrap?: boolean;

  gap?: number;
  align?: 'auto' | 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  maxWidth?: number | string;
  padding?: number | string;
  margin?: number | string;
}

const view = (props: IViewProps<IStackProps, IStackStyles>) => {
  const { renderAs: RootType = 'div', classNames, gap, vertical } = props;

  const children: React.ReactChild[] = [];
  const spacerStyle = {
    [vertical ? 'height' : 'width']: gap
  };

  React.Children.forEach(props.children, (child, index: number) => {
    if (index > 0 && gap) {
      children.push(<span className={classNames.spacer} style={spacerStyle} />);
    }
    children.push(child);
  });

  return <RootType className={classNames.root}>{children}</RootType>;
};

const styles = (props: IStyleProps<IStackProps, IStackStyles>): IStackStyles => {
  const { fill, align, justify, maxWidth, vertical, grow, margin, padding } = props;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: nameMap[align!] || align,
        justifyContent: nameMap[justify!] || justify,
        flexWrap: 'nowrap',
        width: fill && !vertical ? '100%' : 'auto',
        height: fill && vertical ? '100%' : 'auto',
        maxWidth,
        margin,
        padding
      },
      grow && {
        flexGrow: 1,
        overflow: 'hidden'
      },
      props.className
    ],
    spacer: {
      flexShrink: 0,
      alignSelf: 'stretch'
    }
  };
};

export const Stack: React.StatelessComponent<
  IStackProps & {
    styles?:
      | Partial<IStackStyles>
      | ((props: IPropsWithStyles<IStackProps, IStackStyles>) => Partial<IStackStyles>)
      | undefined;
  }
> & {
  Item: React.StatelessComponent<
    IStackAreaProps & {
      styles?:
        | Partial<IStackAreaStyles>
        | ((props: IPropsWithStyles<IStackAreaProps, IStackAreaStyles>) => Partial<IStackAreaStyles>)
        | undefined;
    }
  >;
} = createComponent({
  displayName: 'Stack',
  styles,
  view,
  statics: {
    Item: StackItem,
    defaultProps: {}
  }
});

export default Stack;
