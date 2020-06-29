import React from 'react';
import cx from 'classnames';
import { mergeSlotProps, IStateProps } from '@fluentui/react-theming';
import { ILinkProps } from './Link.types';

export interface ILinkState {
  onKeyDown: (ev: KeyboardEvent) => void;
  rootRef: React.Ref<Element>;
}

const useLinkState = (userProps: IStateProps<ILinkProps>): ILinkState => {
  const { componentRef, disabled } = userProps;

  const rootRef = React.useRef<HTMLElement>(null);

  React.useImperativeHandle(componentRef, () => ({
    focus: () => {
      rootRef.current && rootRef.current.focus();
    },
  }));

  const onKeyDown = (ev: KeyboardEvent) => {
    // If the Link is disabled we need to prevent navigation via 'Enter' key presses.
    if (disabled) {
      ev.preventDefault();
    }
  };

  return {
    onKeyDown,
    rootRef,
  };
};

export const useLink = (props: IStateProps<ILinkProps>) => {
  const { classes = {}, disabled, href } = props;
  const { rootDisabled } = classes;

  const state = useLinkState(props);
  const { onKeyDown, rootRef } = state;

  const slotProps = mergeSlotProps(props, {
    root: {
      'aria-disabled': disabled,
      className: cx(disabled && rootDisabled),
      href,
      onKeyDown,
      ref: rootRef,
      role: 'link',
      tabIndex: 0,
      type: 'link',
    },
  });

  return {
    slotProps,
    state,
  };
};
