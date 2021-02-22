import * as React from 'react';
import * as classes from '../react-divider.stories.scss';

const combineClasses = (...args: any[]) => {
  return args.join(' ');
};

export interface DividerStoryProps {
  label?: string;
  children?: any;
  className?: string;
}
export const DividerStory = (props?: DividerStoryProps) => {
  return (
    <div className={combineClasses(classes.item, props?.className)}>
      <label>{props?.label}</label>
      {props?.children}
    </div>
  );
};
