import * as React from 'react';
import * as ReactIs from 'react-is';

export function getChildElement(children: React.ReactElement) {
  try {
    const child = React.Children.only(children) as React.ReactElement & { ref: React.Ref<HTMLElement> };

    if (typeof child.type === 'string' || ReactIs.isForwardRef(child)) {
      return child as React.ReactElement & { ref: React.Ref<HTMLElement> };
    }

    // We don't need to do anything here: we catch the exception from React to throw a more meaningful error
    // eslint-disable-next-line no-empty
  } catch {}

  throw new Error(
    [
      '@fluentui/react-motion: Invalid child element.',
      '\n',
      'Motion factories require a single child element to be passed. ',
      'That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef().',
    ].join(''),
  );
}
