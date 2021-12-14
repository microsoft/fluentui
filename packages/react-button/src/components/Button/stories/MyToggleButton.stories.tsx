import * as React from 'react';
import { MyToggleButton, MyToggleButtonProps } from '../MyToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Toggle = (props: MyToggleButtonProps) => {
  return <MyToggleButton {...props}>Button</MyToggleButton>;
};
