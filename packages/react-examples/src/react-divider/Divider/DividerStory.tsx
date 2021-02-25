import * as React from 'react';
import { ax } from '@fluentui/react-make-styles';
import * as classes from '../react-divider.stories.scss';

export interface DividerStoryProps {
  label?: string;
  children?: any;
  className?: string;
}
export const DividerStory = (props?: DividerStoryProps) => {
  return (
    <div className={ax(classes.item, props?.className)}>
      <label>{props?.label}</label>
      {props?.children}
    </div>
  );
};
