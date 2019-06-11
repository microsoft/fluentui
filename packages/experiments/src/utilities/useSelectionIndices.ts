import * as React from 'react';
import { Selection, SELECTION_CHANGE } from 'office-ui-fabric-react/lib/Selection';
import { EventGroup } from '@uifabric/utilities/lib/EventGroup';

/**
 * Uses selection indices as a hook
 * @param selection the selection to get the indices of as state.
 */
export const useSelectionIndices = (selection: Selection | undefined): number[] => {
  const [selectedIndices, setSelectedIndices] = React.useState(selection ? selection.getSelectedIndices() : []);

  React.useEffect(() => {
    if (!selection) {
      return;
    }
    const eventGroup = new EventGroup(null);
    eventGroup.on(selection, SELECTION_CHANGE, () => {
      setSelectedIndices(selection.getSelectedIndices());
    });

    // Update state in effect only if the old selected indices and the new
    // selected indices don't match (e.g. we were fed a new selection)
    if (selection.getSelectedIndices() !== selectedIndices) {
      setSelectedIndices(selection.getSelectedIndices());
    }

    // cleanup
    return () => {
      eventGroup.dispose();
    };
  }, [selection]);

  return selectedIndices;
};
