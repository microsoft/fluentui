import { pxToRem } from '../../../../utils';
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ListItemStylesProps, listItemSlotClassNames } from '../../../../components/List/ListItem';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import { ListItemVariables } from './listItemVariables';

const truncateStyle: ICSSInJSStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const selectableHoverStyle = (p: ListItemStylesProps, v): ICSSInJSStyle => ({
  background: v.selectableFocusHoverBackgroundColor,
  color: v.selectableFocusHoverColor,
  cursor: 'pointer',

  [`& .${listItemSlotClassNames.header}`]: { color: 'inherit' },
  [`& .${listItemSlotClassNames.content}`]: { color: 'inherit' },

  // hide the header media and content media on hover
  [`& .${listItemSlotClassNames.headerMedia}`]: {
    ...screenReaderContainerStyles,
    color: 'inherit',
  },
  [`& .${listItemSlotClassNames.contentMedia}`]: { display: 'none', color: 'inherit' },

  // show the end media on hover
  [`& .${listItemSlotClassNames.endMedia}`]: { display: 'block', color: 'inherit' },
});

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
});

const listItemStyles: ComponentSlotStylesPrepared<ListItemStylesProps, ListItemVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): any => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });

    return {
      display: { __specialFlag: true, css: 'display:flex', declaration: 'display:flex' },
      alignItems: { __specialFlag: true, css: 'align-items:center', declaration: 'align-items:center' },

      minHeight: { __specialFlag: true, css: 'min-height:' + v.minHeight, declaration: 'min-height:' + v.minHeight },
      padding: v.rootPadding, // TODO: Hm, this thing should be expanded

      ...((p.selectable || p.navigable) && {
        position: { __specialFlag: true, css: 'position:relative', declaration: 'position:relative' },

        // hide the end media by default
        [`& .${listItemSlotClassNames.endMedia}`]: { display: 'none' },

        '&:hover': selectableHoverStyle(p, v),
        ':focus': borderFocusStyles[':focus'],
        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          zIndex: v.zIndex,
        },

        ...(p.selected && selectedStyle(v)),
      }),
      ...(p.important && {
        fontWeight: 'bold',
      }),
    };
  },

  media: ({ props: p }): ICSSInJSStyle => ({
    ...(p.important && {
      '::before': {
        content: '""',
        position: 'absolute',
        left: pxToRem(8),
        width: pxToRem(2),
        height: pxToRem(2),
        background: '#000',
      },
    }),
    ...((p.hasHeader || p.hasContent) && {
      marginRight: pxToRem(8),
    }),
  }),

  header: ({ props: p, variables: v }) => ({
    flexGrow: 1,
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,

    ...(p.truncateHeader && truncateStyle),
    ...((!p.hasContent || p.hasHeaderMedia) && {
      marginRight: pxToRem(8),
    }),
  }),

  headerMedia: ({ variables: v }): ICSSInJSStyle => ({
    alignSelf: 'flex-end',

    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
  }),

  content: ({ props: p, variables: v }): any => ({
    flexGrow: { __specialFlag: true, css: 'flex-grow:1', declaration: 'flex-grow:1' },
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,

    ...(p.truncateContent && truncateStyle),
    ...((!p.hasHeader || p.hasContentMedia) && {
      marginRight: pxToRem(8),
    }),
  }),

  contentMedia: ({ variables: v }) => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),

  endMedia: ({ props: p }): any => ({
    flexShrink: { __specialFlag: true, css: 'flex-shrink:0', declaration: 'flex-shrink:0' },

    ...((p.selectable || p.navigable) && { __specialFlag: true, css: 'display:none', declaration: 'display:none' }),
  }),

  headerWrapper: (): any => ({
    display: { __specialFlag: true, css: 'display:flex', declaration: 'display:flex' },
  }),

  contentWrapper: (): any => ({
    display: { __specialFlag: true, css: 'display:flex', declaration: 'display:flex' },
  }),

  main: (): any => ({
    display: { __specialFlag: true, css: 'display:flex', declaration: 'display:flex' },
    flexDirection: { __specialFlag: true, css: 'flex-direction:column', declaration: 'flex-direction:column' },
    flexGrow: { __specialFlag: true, css: 'flex-grow:1', declaration: 'flex-grow:1' },
    minWidth: { __specialFlag: true, css: 'min-width:0', declaration: 'min-width:0' }, // needed for the truncate styles to work
  }),
};

export default listItemStyles;
