import type { ComponentStyleSpec } from '@fluentui/style-spec';

/**
 * Style spec for the Divider component. Transcribed from `@fluentui/react-divider` `useDividerStyles.styles.ts`.
 *
 * @public
 */
export const DividerSpec: ComponentStyleSpec = {
  $schema: 'https://fluentui.dev/schemas/component-style-spec/v1.json',
  name: 'Divider',
  version: 1,
  description: 'A divider visually separates two pieces of content.',
  slots: ['root', 'wrapper'],
  variants: {
    orientation: { values: ['horizontal', 'vertical'], default: 'horizontal' },
    alignContent: { values: ['start', 'center', 'end'], default: 'center' },
    appearance: { values: ['default', 'brand', 'subtle', 'strong'], default: 'default' },
  },
  states: {
    inset: { type: 'boolean', description: 'Adds padding to the beginning and end of the divider.' },
    hasChildren: { type: 'boolean', description: 'The divider renders content in the middle.' },
  },
  rules: [
    {
      slot: 'root',
      declarations: {
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        position: 'relative',
        fontFamily: { token: 'fontFamilyBase' },
        fontSize: { token: 'fontSizeBase200' },
        fontWeight: { token: 'fontWeightRegular' },
        lineHeight: { token: 'lineHeightBase200' },
        textAlign: 'center',
      },
    },
    {
      slot: 'root',
      when: { pseudo: '::before' },
      declarations: { boxSizing: 'border-box', display: 'flex', flexGrow: 1 },
    },
    {
      slot: 'root',
      when: { pseudo: '::after' },
      declarations: { boxSizing: 'border-box', display: 'flex', flexGrow: 1 },
    },
    { slot: 'root', when: { variants: { alignContent: 'start' }, pseudo: '::after' }, declarations: { content: '""' } },
    {
      slot: 'root',
      when: { variants: { alignContent: 'center' }, pseudo: '::before' },
      declarations: { content: '""' },
    },
    {
      slot: 'root',
      when: { variants: { alignContent: 'center' }, pseudo: '::after' },
      declarations: { content: '""' },
    },
    { slot: 'root', when: { variants: { alignContent: 'end' }, pseudo: '::before' }, declarations: { content: '""' } },
    {
      slot: 'root',
      when: { variants: { appearance: 'default' } },
      declarations: { color: { token: 'colorNeutralForeground2' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'default' }, pseudo: '::before' },
      declarations: { borderColor: { token: 'colorNeutralStroke2' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'default' }, pseudo: '::after' },
      declarations: { borderColor: { token: 'colorNeutralStroke2' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'brand' } },
      declarations: { color: { token: 'colorBrandForeground1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'brand' }, pseudo: '::before' },
      declarations: { borderColor: { token: 'colorBrandStroke1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'brand' }, pseudo: '::after' },
      declarations: { borderColor: { token: 'colorBrandStroke1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'subtle' } },
      declarations: { color: { token: 'colorNeutralForeground3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'subtle' }, pseudo: '::before' },
      declarations: { borderColor: { token: 'colorNeutralStroke3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'subtle' }, pseudo: '::after' },
      declarations: { borderColor: { token: 'colorNeutralStroke3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'strong' } },
      declarations: { color: { token: 'colorNeutralForeground1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'strong' }, pseudo: '::before' },
      declarations: { borderColor: { token: 'colorNeutralStroke1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'strong' }, pseudo: '::after' },
      declarations: { borderColor: { token: 'colorNeutralStroke1' } },
    },
    { slot: 'root', when: { variants: { orientation: 'horizontal' } }, declarations: { width: '100%' } },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal' }, pseudo: '::before' },
      declarations: { borderTopStyle: 'solid', borderTopWidth: { token: 'strokeWidthThin' }, minWidth: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal' }, pseudo: '::after' },
      declarations: { borderTopStyle: 'solid', borderTopWidth: { token: 'strokeWidthThin' }, minWidth: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'start' } },
      declarations: { textAlign: 'left' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'start' }, pseudo: '::before' },
      declarations: { content: '""', marginRight: '12px', maxWidth: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'start' }, pseudo: '::after' },
      declarations: { marginLeft: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'center' } },
      declarations: { textAlign: 'center' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'center' }, pseudo: '::before' },
      declarations: { marginRight: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'center' }, pseudo: '::after' },
      declarations: { marginLeft: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'end' } },
      declarations: { textAlign: 'right' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'end' }, pseudo: '::before' },
      declarations: { marginRight: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal', alignContent: 'end' }, pseudo: '::after' },
      declarations: { content: '""', marginLeft: '12px', maxWidth: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'horizontal' }, states: { inset: true } },
      declarations: { paddingLeft: '12px', paddingRight: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical' } },
      declarations: { flexDirection: 'column', minHeight: '20px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical' }, pseudo: '::before' },
      declarations: { borderRightStyle: 'solid', borderRightWidth: { token: 'strokeWidthThin' }, minHeight: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical' }, pseudo: '::after' },
      declarations: { borderRightStyle: 'solid', borderRightWidth: { token: 'strokeWidthThin' }, minHeight: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical', alignContent: 'start' }, pseudo: '::before' },
      declarations: { content: '""', marginBottom: '12px', maxHeight: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical', alignContent: 'start' }, pseudo: '::after' },
      declarations: { marginTop: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical', alignContent: 'center' }, pseudo: '::before' },
      declarations: { marginBottom: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical', alignContent: 'center' }, pseudo: '::after' },
      declarations: { marginTop: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical', alignContent: 'end' }, pseudo: '::before' },
      declarations: { marginBottom: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical', alignContent: 'end' }, pseudo: '::after' },
      declarations: { content: '""', marginTop: '12px', maxHeight: '8px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical' }, states: { inset: true } },
      declarations: { marginTop: '12px', marginBottom: '12px' },
    },
    {
      slot: 'root',
      when: { variants: { orientation: 'vertical' }, states: { hasChildren: true } },
      declarations: { minHeight: '84px' },
    },
    {
      slot: 'root',
      when: { states: { hasChildren: false }, pseudo: '::before' },
      declarations: { marginBottom: 0, marginRight: 0 },
    },
    {
      slot: 'root',
      when: { states: { hasChildren: false }, pseudo: '::after' },
      declarations: { marginLeft: 0, marginTop: 0 },
    },
  ],
};
