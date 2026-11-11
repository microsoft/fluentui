import { getClassNameRows, getDataAttributeRows, resolveStylingMetadata } from './stylingMetadata';

describe('stylingMetadata', () => {
  describe('resolveStylingMetadata', () => {
    const generated = {
      dataAttributes: { attributes: { root: { open: 'data-open' as const } } },
      classNames: { classNames: { root: 'fui-Generated' } },
    };

    it('uses generated metadata by default', () => {
      expect(resolveStylingMetadata({ __generatedStylingMetadata: generated })).toEqual(generated);
    });

    it('prefers authored sections per section', () => {
      const classNames = { classNames: { root: 'fui-Authored' } };

      expect(
        resolveStylingMetadata({
          __generatedStylingMetadata: generated,
          reactStorybookAddon: { docs: { classNames } },
        }),
      ).toEqual({ dataAttributes: generated.dataAttributes, classNames });
    });

    it('returns nothing when docs are disabled', () => {
      expect(
        resolveStylingMetadata({ __generatedStylingMetadata: generated, reactStorybookAddon: { docs: false } }),
      ).toEqual({});
    });

    it('handles missing parameters', () => {
      expect(resolveStylingMetadata(undefined)).toEqual({ dataAttributes: undefined, classNames: undefined });
    });
  });

  describe('getDataAttributeRows', () => {
    it('maps slot attributes to rows with slot values, DOM-name values or presence', () => {
      expect(
        getDataAttributeRows({
          attributes: {
            root: { disabled: 'data-disabled', size: 'data-size', position: 'data-position' },
            icon: { label: 'data-label' },
          },
          values: {
            root: { size: ['small', 'large'], position: null },
            'data-label': [],
          },
        }),
      ).toEqual([
        { component: undefined, slot: 'root', attribute: 'data-disabled', values: undefined },
        { component: undefined, slot: 'root', attribute: 'data-size', values: ['small', 'large'] },
        { component: undefined, slot: 'root', attribute: 'data-position', values: null },
        { component: undefined, slot: 'icon', attribute: 'data-label', values: [] },
      ]);
    });

    it('keeps family order', () => {
      expect(
        getDataAttributeRows({
          components: {
            Accordion: { attributes: { root: { multiple: 'data-multiple' } } },
            AccordionItem: { attributes: { root: { open: 'data-open' } } },
          },
        }).map(row => `${row.component}.${row.attribute}`),
      ).toEqual(['Accordion.data-multiple', 'AccordionItem.data-open']);
    });
  });

  describe('getClassNameRows', () => {
    it('supports definitions and bare slot maps in families', () => {
      expect(
        getClassNameRows({
          components: {
            Button: { classNames: { root: 'fui-Button', icon: 'fui-Button__icon' } },
            Link: { root: 'fui-Link' },
          },
        }),
      ).toEqual([
        { component: 'Button', slot: 'root', className: 'fui-Button' },
        { component: 'Button', slot: 'icon', className: 'fui-Button__icon' },
        { component: 'Link', slot: 'root', className: 'fui-Link' },
      ]);
    });

    it('returns no rows without config', () => {
      expect(getClassNameRows(undefined)).toEqual([]);
    });
  });
});
