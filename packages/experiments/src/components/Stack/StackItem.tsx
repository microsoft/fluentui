import * as React from 'react';
import { IStyle } from '../../Styling';
import { createComponent, IStyleProps, IViewProps, IPropsWithStyles } from '../Text/createComponent';

// Styles for the component
export interface IStackAreaStyles {
  root: IStyle;
}

const alignMap: any = {
  start: 'flex-start',
  end: 'flex-end'
};
const justifyMap: any = {};

// Inputs to the component
export interface IStackAreaProps {
  renderAs?: string | React.ReactType<IStackAreaProps>;
  children?: React.ReactNode;

  gap?: number;
  grow?: boolean;
  align?: 'auto' | 'center' | 'start' | 'baseline' | 'stretch' | 'end';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

const view = (props: IViewProps<IStackAreaProps, IStackAreaStyles>) => {
  const {
    // renderAs: RootType = 'span',
    classNames
  } = props;

  const child = React.Children.only(props.children);

  return React.cloneElement(child, {
    className: [classNames.root, child.props.classNames].join(' '),
    ...child.props
  });

  // return (
  //   <RootType className={classNames.root}>
  //     {props.children}
  //   </RootType>
  // );
};

const styles = (props: IStyleProps<IStackAreaProps, IStackAreaStyles>): IStackAreaStyles => {
  const { grow, align, justify } = props;

  return {
    root: [
      grow && { flexGrow: 1 },
      !grow && { flexShrink: 0 },
      align && {
        alignSelf: alignMap[align] || align,
        justifyContent: justifyMap[justify!] || justify
      },
      {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ]
  };
};

export const FlexArea: React.StatelessComponent<IStackAreaProps> & {
  styles?:
  | Partial<IStackAreaStyles>
  | ((props: IPropsWithStyles<IStackAreaProps, IStackAreaStyles>) => Partial<IStackAreaStyles>)
  | undefined;
} = createComponent<IStackAreaProps, IStackAreaStyles>({
  displayName: 'StackArea',
  styles,
  view
});

export default FlexArea;
