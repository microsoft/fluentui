import { setVirtualParent } from '@fluentui/react-utilities';
import * as React from 'react';

import { toMountNodeProps } from '../../utils/toMountNodeProps';
import { usePortalMountNode } from './usePortalMountNode';
import type { PortalProps, PortalState } from './Portal.types';

/**
 * Create the state required to render Portal.
 *
 * The returned state can be modified with hooks such as usePortalStyles, before being passed to renderPortal_unstable.
 *
 * @param props - props from this instance of Portal
 */
export const usePortal_unstable = (props: PortalProps): PortalState => {
  const { element, className } = toMountNodeProps(props.mountNode);

  const virtualParentRootRef = React.useRef<HTMLSpanElement>(null);
  const fallbackElement = usePortalMountNode({ disabled: !!element, className });

  const mountNode = element ?? fallbackElement;
  const state: PortalState = {
    children: props.children,
    mountNode,
    virtualParentRootRef,
  };

  React.useEffect(() => {
    if (!mountNode) {
      return;
    }

    const virtualParent = virtualParentRootRef.current;

    // By default, we create a mount node for portal on `document.body` (see usePortalMountNode()) and have following structure:
    //
    // <body>
    //   <!-- ⚛️ application root -->
    //   <div id="root">
    //     <!-- ⬇️ portal node rendered in a tree to anchor (virtual parent node) -->
    //     <span aria-hidden="true"></span>
    //   </div>
    //   <div id="portal-mount-node">
    //     <!-- 🧩portal content -->
    //   </div>
    // </body>
    //
    // To make sure that `.elementContains()` works correctly, we link a virtual parent to a portal node (a virtual parent node becomes a parent of mount node):
    //   virtual.contains(mountNode) === false
    //   (while we need ⬇️⬇️⬇️)
    //   elementsContains(virtualParent, mountNode) === true
    //   elementsContains(mountNode, virtualParent) === false
    //
    // For more details, check docs for virtual parent utils.
    //
    // However, if a user provides a custom mount node (via `props`) the structure could be different:
    //
    // <body>
    //   <!-- application root -->
    //   <div id="root">
    //     <div id="portal-mount-node">
    //       <!-- 🧩portal content -->
    //
    //       <span aria-hidden="true"></span>
    //     </div>
    //   </div>
    // </body>
    //
    // A mount node in this case contains portal's content and a virtual parent node. In this case nodes linking is redundant and the check below avoids it.
    //
    // Otherwise, there is a circular reference - both elements are parents of each other:
    //   elementsContains(mountNode, virtualParent) === true
    //   elementsContains(virtualParent, mountNode) === true
    const isVirtualParentInsideChild = mountNode.contains(virtualParent);

    if (virtualParent && !isVirtualParentInsideChild) {
      setVirtualParent(mountNode, virtualParent);

      return () => {
        setVirtualParent(mountNode, undefined);
      };
    }
  }, [virtualParentRootRef, mountNode]);

  return state;
};
