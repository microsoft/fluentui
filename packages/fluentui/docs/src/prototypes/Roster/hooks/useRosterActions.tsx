import * as React from 'react';
import { IActionsContext } from '../actionsContext';

export const useRosterActions = (rosterData, setRosterData: React.Dispatch<React.SetStateAction<any>>) => {
  return React.useMemo<IActionsContext>(
    () => ({
      togglePromote: (id, type) => {
        setRosterData(_rosterData => {
          const newData = [..._rosterData];
          const inverseMap = {
            attendees: 'presenters',
            presenters: 'attendees',
          };
          const groupToRemoveIdx = newData.findIndex(group => group.id === type);
          const groupToAddIdx = newData.findIndex(group => group.id === inverseMap[type]);
          const toBePromoted = newData[groupToRemoveIdx].items.find(item => item.title.userId === id);
          toBePromoted.title.type = inverseMap[type];
          newData[groupToAddIdx].items.push(toBePromoted);
          newData[groupToRemoveIdx].items = newData[groupToRemoveIdx].items.filter(item => item.title.userId !== id);
          return newData;
        });
      },
      toggleMute: (id, type) => {
        setRosterData(_rosterData => {
          const newData = [..._rosterData];
          // We can change it to work with normalized data to avoid this .find chain
          const item = newData.find(group => group.id === type).items.find(item => item.title.userId === id);
          item.title.isMuted = !item.title.isMuted;
          return newData;
        });
      },
      toggleSelect: (id: string, type: string) => {
        setRosterData(_rosterData => {
          const newData = [..._rosterData];
          // We can change it to work with normalized data to avoid this .find chain
          const item = newData.find(group => group.id === type).items.find(item => item.title.userId === id);
          item.title.selected = !item.title.selected;
          return newData;
        });
      },
    }),
    [rosterData, setRosterData],
  );
};
