import * as React from 'react';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from '../Pivot/Pivot.types';
import {
  warnDeprecations,
  KeyCodes,
  getId,
  getNativeProps,
  divProperties,
  classNamesFunction,
  warn,
} from '@uifabric/utilities';
import { CommandButton, Icon, FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';
import { IPivotItemProps } from '../Pivot/PivotItem.types';
import { PivotItem } from '../PivotPivotItem';
import { PivotLinkFormat } from '../PivotPivot.types';
import { PivotLinkSize } from '../PivotPivot.types';

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>();
const PivotName = 'Pivot';

export interface IPivotState {
  selectedKey: string | undefined;
}

type PivotLinkCollection = {
  links: IPivotItemProps[];
  keyToIndexMapping: { [key: string]: number };
  keyToTabIdMapping: { [key: string]: string };
};

// How it Works

/**
 * Get the set of PivotLinks as array of IPivotItemProps
 * The set of Links is determined by child components of type PivotItem
 */

/**
 * Generate the Id for the tab button.
 */

/**
 * Check if the key exists in the pivot items.
 */

/**
 * Handle the onClick event on PivotLinks
 */

/**
 * Handle the onKeyPress event on the PivotLinks
 */

/**
 * Updates the state with the new selected index
 */

/**
 *  Usage:
 *
 *     <Pivot>
 *       <PivotItem headerText="Foo">
 *         <Label>Pivot #1</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bar">
 *         <Label>Pivot #2</Label>
 *       </PivotItem>
 *       <PivotItem headerText="Bas">
 *         <Label>Pivot #3</Label>
 *       </PivotItem>
 *     </Pivot>
 */

export const PivotBase = (props: IPivotProps) => {
  // hook would go here.
  let pivotId = React.useState(() => getId(PivotName));
  const focusZone = React.useRef<FocusZone>();
  // const _classNames: { [key in keyof IPivotStyles]: string };

  const { classes = {} } = props;
  const nativeProps = getNativeProps(props, divProperties);

  if (process.env.NODE_ENV !== 'production') {
    warnDeprecations(PivotName, props, {
      initialSelectedKey: 'defaultSelectedKey',
      initialSelectedIndex: 'defaultSelectedIndex',
    });
  }

  pivotId = getId(PivotName);

  const { defaultSelectedKey = props.initialSelectedKey, defaultSelectedIndex = props.initialSelectedIndex } = props;

  let selectedKey: string | undefined;

  if (defaultSelectedKey) {
    selectedKey = defaultSelectedKey;
  } else if (typeof defaultSelectedIndex === 'number') {
    selectedKey = links[defaultSelectedIndex].itemKey!;
  } else if (links.length) {
    selectedKey = links[0].itemKey!;
  }

  /**
   * Gets the set of PivotLinks as array of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */

  return (
    <div {...nativeProps} className={classes.root}>
      i am a pivot
    </div>
  );
};
