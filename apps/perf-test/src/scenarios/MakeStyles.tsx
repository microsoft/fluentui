/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ax, makeStylesCompat, createDOMRenderer } from '@fluentui/make-styles';

const renderer = createDOMRenderer();

// const useViewStyles = makeStyles([
//   [
//     null,
//     {
//       alignItems: 'stretch',
//       borderWidth: 0,
//       borderStyle: 'solid',
//       boxSizing: 'border-box',
//       display: 'flex',
//       flexBasis: 'auto',
//       flexDirection: 'column',
//       flexShrink: 0,
//       margin: 0,
//       padding: 0,
//       position: 'relative',
//       // fix flexbox bugs
//       minHeight: 0,
//       minWidth: 0,
//     },
//   ],
// ]);

const staticViewStyles: any = [
  [
    null,
    null,
    {
      alignItems: [
        'a1q9h2pe',
        '.a1q9h2pe{-webkit-align-items:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;}',
      ],
      boxSizing: ['a1ewtqcl', '.a1ewtqcl{box-sizing:border-box;}'],
      display: ['a22iagw', '.a22iagw{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}'],
      flexBasis: ['a1rmlqtg', '.a1rmlqtg{-webkit-flex-basis:auto;-ms-flex-preferred-size:auto;flex-basis:auto;}'],
      flexDirection: [
        'a1vx9l62',
        '.a1vx9l62{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}',
      ],
      flexShrink: ['ai64zpg', '.ai64zpg{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;}'],
      position: ['a10pi13n', '.a10pi13n{position:relative;}'],
      minHeight: ['aprs0cq', '.aprs0cq{min-height:0;}'],
      minWidth: ['ay77jfu', '.ay77jfu{min-width:0;}'],
      borderTopWidth: ['are7gi1', '.are7gi1{border-top-width:0;}'],
      borderRightWidth: ['a1358rze', '.a1358rze{border-right-width:0;}', '.ra1358rze{border-left-width:0;}'],
      borderBottomWidth: ['aqdk4by', '.aqdk4by{border-bottom-width:0;}'],
      borderLeftWidth: ['a1rvrf73', '.a1rvrf73{border-left-width:0;}', '.ra1rvrf73{border-right-width:0;}'],
      borderTopStyle: ['azkkow9', '.azkkow9{border-top-style:solid;}'],
      borderRightStyle: ['acdblym', '.acdblym{border-right-style:solid;}', '.racdblym{border-left-style:solid;}'],
      borderBottomStyle: ['ag706s2', '.ag706s2{border-bottom-style:solid;}'],
      borderLeftStyle: ['ajik90z', '.ajik90z{border-left-style:solid;}', '.rajik90z{border-right-style:solid;}'],
      marginTop: ['a1hu3pq6', '.a1hu3pq6{margin-top:0;}'],
      marginRight: ['a11qmguv', '.a11qmguv{margin-right:0;}', '.ra11qmguv{margin-left:0;}'],
      marginBottom: ['a19f4twv', '.a19f4twv{margin-bottom:0;}'],
      marginLeft: ['a1tyq0we', '.a1tyq0we{margin-left:0;}', '.ra1tyq0we{margin-right:0;}'],
      paddingTop: ['a1g0x7ka', '.a1g0x7ka{padding-top:0;}'],
      paddingRight: ['ahxju0i', '.ahxju0i{padding-right:0;}', '.rahxju0i{padding-left:0;}'],
      paddingBottom: ['a1qch9an', '.a1qch9an{padding-bottom:0;}'],
      paddingLeft: ['a1cnd47f', '.a1cnd47f{padding-left:0;}', '.ra1cnd47f{padding-right:0;}'],
    },
  ],
];

const useStaticViewStyles = makeStylesCompat(staticViewStyles);
const View: React.FunctionComponent<{ className?: string }> = props => {
  const { className } = props;
  const classes = ax(useStaticViewStyles({}, { renderer, tokens: {} }), className);

  return <div className={classes} />;
};

// const useBoxStyles = makeStyles<any, {}>([
//   [s => s.outer, { alignSelf: 'flex-start', padding: '4px' }],
//   [s => s.row, { flexDirection: 'row' }],
//   [s => s.color0, { backgroundColor: '#14171A' }],
//   [s => s.color1, { backgroundColor: '#AAB8C2' }],
//   [s => s.color2, { backgroundColor: '#E6ECF0' }],
//   [s => s.color3, { backgroundColor: '#FFAD1F' }],
//   [s => s.color4, { backgroundColor: '#F45D22' }],
//   [s => s.color5, { backgroundColor: '#E0245E' }],
//   [s => s.fixed, { width: '6px', height: '6px' }],
// ]);

const staticBoxStyles: any = [
  [
    (s: any) => s.outer,
    null,
    {
      alignSelf: [
        'ajgzulp',
        '.ajgzulp{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;}',
      ],
      paddingTop: ['a10ra9hq', '.a10ra9hq{padding-top:4px;}'],
      paddingRight: ['a8wuabp', '.a8wuabp{padding-right:4px;}', '.ra8wuabp{padding-left:4px;}'],
      paddingBottom: ['a1y2xyjm', '.a1y2xyjm{padding-bottom:4px;}'],
      paddingLeft: ['aycuoez', '.aycuoez{padding-left:4px;}', '.raycuoez{padding-right:4px;}'],
    },
  ],
  [
    (s: any) => s.row,
    null,
    {
      flexDirection: ['a1063pyq', '.a1063pyq{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}'],
    },
  ],
  [(s: any) => s.color0, null, { backgroundColor: ['a1gi06js', '.a1gi06js{background-color:#14171A;}'] }],
  [(s: any) => s.color1, null, { backgroundColor: ['a1wndmql', '.a1wndmql{background-color:#AAB8C2;}'] }],
  [(s: any) => s.color2, null, { backgroundColor: ['afbku4w', '.afbku4w{background-color:#E6ECF0;}'] }],
  [(s: any) => s.color3, null, { backgroundColor: ['avif04f', '.avif04f{background-color:#FFAD1F;}'] }],
  [(s: any) => s.color4, null, { backgroundColor: ['a1vmrinc', '.a1vmrinc{background-color:#F45D22;}'] }],
  [(s: any) => s.color5, null, { backgroundColor: ['a1dqn7v7', '.a1dqn7v7{background-color:#E0245E;}'] }],
  [
    (s: any) => s.fixed,
    null,
    { width: ['a16dn6v3', '.a16dn6v3{width:6px;}'], height: ['a3mu39s', '.a3mu39s{height:6px;}'] },
  ],
];

const useStaticBoxStyles = makeStylesCompat(staticBoxStyles);

const Box: React.FunctionComponent<{}> = () => {
  const classes = useStaticBoxStyles(
    {
      color3: true,
      fixed: true,
      outer: true,
      row: true,
    },
    { renderer, tokens: {} },
  );

  return <View className={classes} />;
};

const Scenario = () => <Box />;

export default Scenario;
