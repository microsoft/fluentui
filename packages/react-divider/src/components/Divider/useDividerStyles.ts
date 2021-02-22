import { makeStyles, ax } from '@fluentui/react-make-styles';
import { DividerState, DividerTokens } from './Divider.types';

//#region Helper objects and functions

//#endregion

/**
 * Styles for the root slot
 */
export const useRootStyles = (state: DividerState): string => {
  const result = makeStyles<DividerState>([
    /* ROOT */
    [
      null,
      tokens => ({
        /* CSS Vars */
        '--divider-contentColor': 'black',
        '--divider-flexDirection': 'row',
        '--divider-fontFamily': 'Segoe UI',
        '--divider-fontWeight': 'initial',
        '--divider-fontColor': tokens.global.palette.grey[26],
        '--divider-fontSize': '12px',
        '--divider-lineHeight': '17px',
        '--divider-borderMargin': '12px',

        alignItems: 'center',
        color: 'var(--divider-fontColor)',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'var(--divider-flexDirection)',
        fontFamily: 'var(--divider-fontFamily)',
        fontSize: 'var(--divider-fontSize)',
        fontWeight: 'var(--divider-fontWeight)',
        position: 'relative',
        boxSizing: 'border-box',
        lineHeight: 'var(--divider-lineHeight)',
        ':before': {
          display: 'flex',
          flexGrow: 1,
          boxSizing: 'border-box',
          '--divider-color': tokens.global.palette.grey[88],
        },

        ':after': {
          display: 'flex',
          flexGrow: 1,
          boxSizing: 'border-box',
          '--divider-color': tokens.global.palette.grey[88],
        },
      }),
    ],
    /* Border color override */
    [
      s => s.color !== undefined,
      { ':before': { '--divider-color': state.color }, ':after': { '--divider-color': state.color } },
    ],
    /* Appearance */
    [
      s => s.appearance === 'subtle',
      tokens => ({
        ':before': { '--divider-color': tokens.global.palette.grey[94] },
        ':after': { '--divider-color': tokens.global.palette.grey[94] },
      }),
    ],
    [
      s => s.appearance === 'brand',
      tokens => ({
        '--divider-fontColor': tokens.global.palette.brand.primary,
        ':before': { '--divider-color': tokens.global.palette.brand.primary },
        ':after': { '--divider-color': tokens.global.palette.brand.primary },
      }),
    ],
    [
      s => s.appearance === 'strong',
      tokens => ({
        ':before': { '--divider-color': tokens.global.palette.grey[82] },
        ':after': { '--divider-color': tokens.global.palette.grey[82] },
      }),
    ],
    /* Horizontal Divider overrides */
    [
      s => !s.vertical,
      {
        width: '100%',
        ':before': {
          borderTopColor: 'var(--divider-color)',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
        },
        ':after': {
          borderTopColor: 'var(--divider-color)',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
        },
        '&>:only-child': {
          display: 'flex',
          textAlign: 'center',
        },
      },
    ],
    /* Vertical Divider overrides */
    [
      s => s.vertical,
      tokens => ({
        //alignSelf: 'stretch',
        minHeight: '20px',
        flexDirection: 'column',
        ':before': {
          borderRightColor: 'var(--divider-color)',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
        },
        ':after': {
          borderRightColor: 'var(--divider-color)',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
        },
        '&>:only-child': {
          display: 'flex',
          textAlign: 'center',
        },
      }),
    ],
    [
      s => s.vertical && s.children,
      {
        minHeight: '84px',
      },
    ],

    /* alignContent Start */
    [
      s => s.alignContent === 'start',
      {
        ':after': {
          content: '""',
        },
      },
    ],
    /* alignContent End */
    [
      s => s.alignContent === 'end',
      {
        ':before': {
          content: '""',
        },
      },
    ],
    /* alignContent Center or Default with content Vertical */
    [
      s => {
        return (s.alignContent === 'center' || !s.alignContent) && s.children && s.vertical;
      },
      {
        ':before': {
          content: '""',
        },
        ':after': {
          content: '""',
        },
      },
    ],
    /* alignContent Center or Default with content Horizontal*/
    [
      s => {
        return (s.alignContent === 'center' || !s.alignContent) && s.children && !s.vertical;
      },
      {
        ':before': {
          content: '""',
        },
        ':after': {
          content: '""',
        },
      },
    ],
    /* alignContent Center or Default without content*/
    [
      s => {
        return (s.alignContent === 'center' || !s.alignContent) && !s.children;
      },
      {
        ':before': {
          content: '""',
        },
      },
    ],
    /* Vertical alignContent start*/
    [
      s => s.vertical && s.alignContent === 'start',
      {
        ':before': {
          content: '""',
          maxHeight: '8px',
          marginBottom: 'var(--divider-borderMargin)',
        },

        ':after': {
          marginTop: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Vertical alignContent end*/
    [
      s => s.vertical && s.alignContent === 'end',
      {
        ':before': {
          marginBottom: 'var(--divider-borderMargin)',
        },
        ':after': {
          content: '""',
          maxHeight: '8px',
          marginTop: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Vertical alignContent center*/
    [
      s => s.vertical && (s.alignContent === 'center' || !s.alignContent),
      {
        ':before': {
          marginBottom: 'var(--divider-borderMargin)',
        },
        ':after': {
          marginTop: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Horizontal alignContent start*/
    [
      s => !s.vertical && s.alignContent === 'start',
      {
        ':before': {
          marginRight: 'var(--divider-borderMargin)',
          maxWidth: '8px',
          content: '""',
        },
        ':after': {
          marginLeft: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Horizontal alignContent end*/
    [
      s => !s.vertical && s.alignContent === 'end',
      {
        ':before': {
          marginRight: 'var(--divider-borderMargin)',
        },
        ':after': {
          maxWidth: '8px',
          content: '""',
          marginLeft: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Horizontal alignContent center*/
    [
      s => !s.vertical && (s.alignContent === 'center' || !s.alignContent),
      {
        ':before': {
          marginRight: 'var(--divider-borderMargin)',
        },
        ':after': {
          marginLeft: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Important */
    [
      s => {
        return s.important;
      },
      {
        '--divider-fontWeight': `600`,
      },
    ],
    /* Fitted */
    [
      s => {
        return s.important;
      },
      {
        margin: 0,
      },
    ],
    /* Border Color Vertical */
    [
      s => {
        return s.color !== undefined && s.vertical;
      },
      {
        ':before': {
          borderRightColor: 'var(--divider-color)',
        },
        ':after': {
          borderRightColor: 'var(--divider-color)',
        },
      },
    ],
    /* Border Color Horizontal */
    [
      s => {
        return s.color !== undefined && !s.vertical;
      },
      {
        ':before': {
          borderTopColor: 'var(--divider-color)',
        },
        ':after': {
          borderTopColor: 'var(--divider-color)',
        },
      },
    ],

    [
      s => {
        return !s.children && s.vertical;
      },
      {
        ':before': {
          marginBottom: 0,
        },
      },
    ],
    [
      s => s.height !== undefined,
      {
        height: state.height,
      },
    ],

    [
      s => s.inset && !s.vertical,
      {
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    ],
    [
      s => s.inset && s.vertical,
      {
        marginTop: '12px',
        marginBottom: '12px',
      },
    ],
  ]);
  return result(state);
};

/** Applies style classnames to slots */
export const useDividerStyles = (state: DividerState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);

  return state;
};
