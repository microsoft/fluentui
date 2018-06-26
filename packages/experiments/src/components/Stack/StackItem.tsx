import * as React from 'react';
import { IStyle } from '../../Styling';
import { createComponent, IStyleProps, IViewProps, IPropsWithStyles } from '../Text/createComponent';

// Styles for the component
export interface IStackItemStyles {
  root: IStyle;
}

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};
const justifyMap: { [key: string]: string } = {};

// Inputs to the component
export interface IStackItemProps {
  renderAs?: string | React.ReactType<IStackItemProps>;
  children?: React.ReactNode;

  gap?: number;
  vertical?: boolean;
  index?: number;

  grow?: boolean;
  collapse?: boolean;

  align?: 'auto' | 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

const view = (props: IViewProps<IStackItemProps, IStackItemStyles>) => {
  const childNodes: React.ReactElement<{}>[] = React.Children.toArray(props.children) as React.ReactElement<{}>[];
  const first = childNodes[0];

  if (typeof first === 'string') {
    return <span className={props.classNames.root}>first</span>;
  }

  return React.cloneElement(first as React.ReactElement<{ className: string }>, {
    ...first.props,
    className: props.classNames.root
  });
};

const styles = (props: IStyleProps<IStackItemProps, IStackItemStyles>): IStackItemStyles => {
  const { grow, collapse, align, justify, gap, vertical } = props;

  return {
    root: [
      grow && { flexGrow: 1 },
      !grow && !collapse && { flexShrink: 0 },
      align && {
        alignSelf: alignMap[align] || align
      },
      justify && {
        justifyContent: justifyMap[justify!] || justify
      },
      {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      !!gap && {
        [vertical ? 'marginTop' : 'marginLeft']: gap
      }
    ]
  } as IStackItemStyles;
};

export const StackItem: React.StatelessComponent<IStackItemProps> & {
  styles?:
    | Partial<IStackItemStyles>
    | ((props: IPropsWithStyles<IStackItemProps, IStackItemStyles>) => Partial<IStackItemStyles>)
    | undefined;
} = createComponent<IStackItemProps, IStackItemStyles>({
  displayName: 'StackItem',
  styles,
  view
});

export default StackItem;
