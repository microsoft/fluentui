import * as _ from 'lodash';
import * as React from 'react';
import { link } from '../../../utils/helpers';

const ComponentPropsOutline: any = (props: ComponentPropsOutlineProps) => {
  const { displayNames } = props;
  if (displayNames.length < 2) return null;

  return (
    <ul>
      {_.map(displayNames, item => (
        <li key={item}>{link(item, `#${_.kebabCase(item)}`)}</li>
      ))}
    </ul>
  );
};

export interface ComponentPropsOutlineProps {
  displayNames: string[];
}

export default ComponentPropsOutline;
