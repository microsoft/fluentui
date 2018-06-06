import { KeytipManager } from './KeytipManager';
import { arraysEqual, EventGroup } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { KeytipEvents } from '../../utilities/keytips/KeytipConstants';

let ktpMgr: KeytipManager;
const events = new EventGroup(this);

describe('KeytipManager', () => {
  beforeEach(() => {
    // Reset KeytipManager instance
    ktpMgr = new KeytipManager();
  });

  describe('register, update, and unregister tests', () => {
    // Sample keytip B
    const keytipSequenceB: string[] = ['b'];
    const keytipBProps: IKeytipProps = {
      keySequences: keytipSequenceB,
      content: 'B'
    };

    describe('registerKeytip', () => {
      it('adds the keytip to the array and raises a keytipAdded event', () => {
        let eventTriggered = false;
        events.on(ktpMgr, KeytipEvents.KEYTIP_ADDED, (eventArgs: any) => {
          eventTriggered = true;
        });
        ktpMgr.register(keytipBProps);
        const keytips = ktpMgr.getKeytips();
        expect(keytips).toHaveLength(1);
        expect(arraysEqual(keytips[0].keySequences, keytipSequenceB)).toEqual(true);
        expect(eventTriggered).toEqual(true);
      });

      it('adds a duplicate keytip because their unique IDs are different', () => {
        const uniqueID1 = ktpMgr.register(keytipBProps);
        const uniqueID2 = ktpMgr.register(keytipBProps);
        expect(uniqueID1).not.toEqual(uniqueID2);
        expect(ktpMgr.getKeytips()).toHaveLength(2);
      });
    });

    describe('updateKeytip', () => {
      it('updates the keytip if it has the same unique ID', () => {
        const uniqueID = ktpMgr.register(keytipBProps);
        // Update some props
        keytipBProps.disabled = true;
        keytipBProps.onExecute = jest.fn();
        ktpMgr.update(keytipBProps, uniqueID);
        const keytips = ktpMgr.getKeytips();
        expect(keytips).toHaveLength(1);
        expect(keytips[0].disabled).toEqual(true);
        expect(keytips[0].onExecute).toBeDefined();
      });

      it('raises a keytipUpdated event', () => {
        let eventTriggered = false;
        events.on(ktpMgr, KeytipEvents.KEYTIP_UPDATED, (eventArgs: any) => {
          eventTriggered = true;
        });
        const uniqueID = ktpMgr.register(keytipBProps);
        ktpMgr.update(keytipBProps, uniqueID);
        expect(eventTriggered).toEqual(true);
      });
    });

    describe('unregisterKeytip', () => {
      it('removes a keytip from the array and raises a keytipRemoved event', () => {
        let eventTriggered = false;
        events.on(ktpMgr, KeytipEvents.KEYTIP_REMOVED, (eventArgs: any) => {
          eventTriggered = true;
        });
        const uniqueID = ktpMgr.register(keytipBProps);
        ktpMgr.unregister(keytipBProps, uniqueID);
        expect(ktpMgr.getKeytips()).toHaveLength(0);
        expect(eventTriggered).toEqual(true);
      });
    });

    describe('registerPersistedKeytip', () => {
      it('adds the keytip to the array and raises a persistedKeytipAdded event', () => {
        let eventTriggered = false;
        events.on(ktpMgr, KeytipEvents.PERSISTED_KEYTIP_ADDED, (eventArgs: any) => {
          eventTriggered = true;
        });
        ktpMgr.register(keytipBProps, true);
        expect(ktpMgr.persistedKeytips).toHaveLength(1);
        expect(eventTriggered).toEqual(true);
      });
    });

    describe('unregisterPersistedKeytip', () => {
      it('removes a keytip to the array and raises a persistedKeytipRemoved event', () => {
        let eventTriggered = false;
        events.on(ktpMgr, KeytipEvents.PERSISTED_KEYTIP_REMOVED, (eventArgs: any) => {
          eventTriggered = true;
        });
        const uniqueID = ktpMgr.register(keytipBProps, true);
        ktpMgr.unregister(keytipBProps, uniqueID, true);
        expect(ktpMgr.persistedKeytips).toHaveLength(0);
        expect(eventTriggered).toEqual(true);
      });
    });

    describe('addParentOverflowSequence', () => {
      it('adds the overflowSetSequence if its parent has it', () => {
        // Keytip that is a child of B
        let keytipCProps: IKeytipProps = {
          keySequences: ['b', 'c'],
          content: 'C'
        };
        // Add overflowSetSequence to B
        keytipBProps.overflowSetSequence = ['x'];
        ktpMgr.register(keytipBProps);
        keytipCProps = ktpMgr.addParentOverflow(keytipCProps);
        expect(keytipCProps.overflowSetSequence).toHaveLength(1);
      });
    });

    describe('persistedKeytipExecute', () => {
      it('raises a persistedKeytipExecute event', () => {
        let eventTriggered = false;
        events.on(ktpMgr, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, (eventArgs: any) => {
          eventTriggered = true;
        });
        ktpMgr.menuExecute(['x'], ['y']);
        expect(eventTriggered).toEqual(true);
      });
    });
  });
});
