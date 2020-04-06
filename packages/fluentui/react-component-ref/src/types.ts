import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface RefProps {
  children: React.ReactElement<any>;

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param node - Referred node.
   */
  innerRef: React.Ref<HTMLElement>;
}

/** A checker that matches the React.Ref type. */
export const refPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.object]) as PropTypes.Requireable<
  React.Ref<any>
>;
