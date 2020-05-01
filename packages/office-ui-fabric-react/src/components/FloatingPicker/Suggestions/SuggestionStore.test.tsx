import { SuggestionsStore } from './SuggestionsStore';

type IMockSuggestion = {
  customName: string;
  name?: string;
  primaryText?: string;
};

const getCustomName = (d: IMockSuggestion): string => d.customName + ' label';

describe('SuggestionsStore', () => {
  describe('when getting the aria-label', () => {
    it('uses getAriaLabel for item text when it is set', () => {
      const store = new SuggestionsStore<IMockSuggestion>({
        getAriaLabel: getCustomName,
      });
      store.updateSuggestions([
        {
          customName: 'me',
        },
      ]);

      expect(store.getSuggestionAtIndex(0)).toEqual({
        item: {
          customName: 'me',
        },
        selected: false,
        ariaLabel: 'me label',
      });
    });

    it('prioritizes getAriaLabel over name', () => {
      const store = new SuggestionsStore<IMockSuggestion>({
        getAriaLabel: getCustomName,
      });
      store.updateSuggestions([
        {
          customName: 'u',
          name: 'name',
        },
      ]);

      expect(store.getSuggestionAtIndex(0)).toEqual({
        item: {
          customName: 'u',
          name: 'name',
        },
        selected: false,
        ariaLabel: 'u label',
      });
    });

    it('prioritizes getAriaLabel over primaryText', () => {
      const store = new SuggestionsStore<IMockSuggestion>({
        getAriaLabel: getCustomName,
      });
      store.updateSuggestions([
        {
          customName: 'us',
          primaryText: 'primaryText',
        },
      ]);

      expect(store.getSuggestionAtIndex(0)).toEqual({
        item: {
          customName: 'us',
          primaryText: 'primaryText',
        },
        selected: false,
        ariaLabel: 'us label',
      });
    });

    it('prioritizes name over primaryText if getAriaLabel is unset', () => {
      const store = new SuggestionsStore<IMockSuggestion>();
      store.updateSuggestions([
        {
          customName: 'us',
          primaryText: 'primaryText',
          name: 'name',
        },
      ]);

      expect(store.getSuggestionAtIndex(0)).toEqual({
        item: {
          customName: 'us',
          primaryText: 'primaryText',
          name: 'name',
        },
        selected: false,
        ariaLabel: 'name',
      });
    });
  });
});
