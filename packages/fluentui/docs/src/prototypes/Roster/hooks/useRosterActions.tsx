import * as React from 'react';
import { RosterData } from '../interface/roster.interface';
import { IActionsContext } from '../actionsContext';

export const useRosterActions = (
  rosterData: RosterData,
  setRosterData: React.Dispatch<React.SetStateAction<RosterData>>,
) => {
  return React.useMemo<IActionsContext>(
    () => ({
      promote: id => {
        setRosterData(_rosterData => {
          const toBePromoted = _rosterData.attendees.get(id);
          if (!toBePromoted) {
            return _rosterData;
          }
          // An attempt at immer-like immutability.
          const newData = { ..._rosterData };
          newData.attendees = new Map(_rosterData.attendees);
          newData.presenters = new Map(_rosterData.presenters);
          newData.attendees.delete(id);
          newData.presenters.set(id, { ...toBePromoted });
          return newData;
        });
      },
      demote: id => {
        setRosterData(_rosterData => {
          const toBeDemoted = _rosterData.presenters.get(id);
          if (!toBeDemoted) {
            return _rosterData;
          }
          const newData = { ..._rosterData };
          newData.attendees = new Map(_rosterData.attendees);
          newData.presenters = new Map(_rosterData.presenters);
          newData.presenters.delete(id);
          newData.attendees.set(id, { ...toBeDemoted });
          return newData;
        });
      },
      mute: id => {
        setRosterData(_rosterData => {
          const newData = { ...rosterData };
          if (newData.presenters.has(id)) {
            newData.presenters = new Map(rosterData.presenters);
            const toBeMuted = newData.presenters.get(id);
            newData.presenters.set(id, { ...toBeMuted, isMuted: true });
          } else if (newData.attendees.has(id)) {
            newData.attendees = new Map(rosterData.attendees);
            const toBeMuted = newData.attendees.get(id);
            newData.attendees.set(id, { ...toBeMuted, isMuted: true });
          }
          return newData;
        });
      },
      unmute: id => {
        setRosterData(_rosterData => {
          const newData = { ...rosterData };
          if (newData.presenters.has(id)) {
            newData.presenters = new Map(rosterData.presenters);
            const toBeMuted = newData.presenters.get(id);
            newData.presenters.set(id, { ...toBeMuted, isMuted: false });
          } else if (newData.attendees.has(id)) {
            newData.attendees = new Map(rosterData.attendees);
            const toBeMuted = newData.attendees.get(id);
            newData.attendees.set(id, { ...toBeMuted, isMuted: false });
          }
          return newData;
        });
      },
    }),
    [rosterData, setRosterData],
  );
};
