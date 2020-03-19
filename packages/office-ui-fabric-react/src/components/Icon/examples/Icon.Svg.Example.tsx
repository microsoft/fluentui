// tslint:disable:jsx-wrap-multiline max-line-length
import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles, registerIcons } from 'office-ui-fabric-react/lib/Styling';

// Use the registerIcons api from the styling package to register custom svg icons so that they
// can be used by the Icon component (or in anything that renders Icons, like Buttons).
registerIcons({
  icons: {
    'onedrive-svg': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,2048,2048">
        <g fill="#1B559B">
          <path d="M 1860 1196 q 53 10 94 37 q 18 12 35 29 q 16 16 30 40 q 13 23 21 53 q 8 30 8 68 q 0 37 -10 75 q -11 38 -34 69 q -23 31 -58 51 q -36 20 -86 20 h -1079 q -78 0 -131 -24 q -54 -25 -87 -65 q -34 -40 -49 -91 q -15 -52 -15 -107 q 0 -46 12 -81 q 11 -35 31 -61 q 19 -27 43 -45 q 24 -19 50 -31 q 60 -29 136 -35 q 0 -1 4 -26 q 3 -25 16 -61 q 12 -37 36 -80 q 24 -43 64 -79 q 39 -37 98 -61 q 59 -25 141 -25 q 57 0 103 15 q 45 15 81 38 q 35 23 62 52 q 26 28 44 55 q 18 -10 42 -18 q 20 -7 48 -12 q 27 -6 60 -6 q 40 0 91 15 q 50 14 94 48 q 44 33 75 88 q 30 55 30 136 m -1463 174 q 0 53 10 99 q 10 46 29 86 h -170 q -52 0 -100 -23 q -48 -23 -85 -61 q -37 -38 -59 -87 q -22 -50 -22 -104 q 0 -49 11 -87 q 10 -38 27 -66 q 17 -29 39 -49 q 21 -21 44 -35 q 53 -33 121 -41 q -1 -9 -1 -18 q -1 -9 -1 -17 q 0 -72 27 -134 q 27 -63 73 -110 q 45 -47 106 -74 q 60 -27 127 -27 q 36 0 66 7 q 29 6 51 14 q 25 10 45 21 q 27 -48 65 -89 q 37 -41 84 -71 q 46 -30 101 -47 q 55 -17 115 -17 q 39 0 80 8 q 41 7 83 24 q 72 28 121 71 q 49 42 81 90 q 32 47 49 94 q 16 46 22 82 q -23 2 -43 5 q -21 3 -40 8 q -66 -69 -148 -104 q -82 -36 -177 -36 q -76 0 -136 17 q -60 17 -106 45 q -47 28 -81 64 q -34 36 -58 75 q -24 38 -39 76 q -15 37 -23 67 q -51 12 -102 38 q -52 26 -93 68 q -42 42 -67 101 q -26 59 -26 137" />
        </g>
      </svg>
    ),

    'yammer-svg': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,2048,2048">
        <g className="thing">
          <path d="M 1887 888 q 33 8 54 34 q 21 26 21 61 q 0 35 -22 62 q -23 26 -57 31 q -57 0 -121 -2 q -64 -3 -128 -7 q -64 -5 -122 -11 q -59 -7 -104 -16 q -45 -9 -72 -20 q -27 -12 -27 -26 q 0 -13 37 -26 q 37 -13 94 -24 q 57 -12 126 -22 q 68 -11 131 -18 q 63 -8 112 -12 q 48 -4 66 -4 m -163 549 q 17 14 26 34 q 9 20 9 41 q 0 21 -8 39 q -8 17 -21 30 q -14 13 -31 20 q -17 7 -36 7 q -10 0 -18 -2 q -8 -2 -19 -8 q -15 -8 -54 -34 q -39 -26 -88 -61 q -50 -35 -104 -76 q -54 -41 -98 -78 q -45 -37 -74 -67 q -29 -30 -29 -44 q 0 -8 9 -10 q 8 -3 19 -3 q 22 0 57 9 q 34 9 77 25 q 42 15 91 36 q 48 20 98 44 q 50 23 100 49 q 49 25 94 49 m 0 -901 q -67 37 -144 75 q -77 38 -149 69 q -73 30 -132 50 q -60 19 -93 19 q -11 0 -19 -2 q -8 -3 -8 -10 q 0 -14 29 -44 q 29 -30 74 -67 q 44 -38 98 -78 q 54 -41 104 -76 q 49 -36 88 -62 q 39 -26 54 -34 q 11 -6 20 -8 q 8 -2 18 -2 q 18 0 36 8 q 17 7 30 20 q 13 12 21 30 q 8 17 8 38 q 0 21 -9 41 q -9 19 -26 33 m -1191 823 l -430 -1051 q -6 -16 -6 -33 q 0 -20 8 -38 q 7 -19 21 -33 q 13 -15 33 -24 q 19 -9 42 -9 q 30 0 56 16 q 26 16 40 44 l 343 866 h 4 l 326 -860 q 11 -29 37 -46 q 25 -18 56 -18 q 22 0 40 9 q 18 8 31 22 q 13 13 21 31 q 7 17 7 36 q 0 14 -5 31 l -462 1154 q -30 74 -62 136 q -32 62 -76 107 q -44 44 -105 69 q -62 24 -151 24 q -28 0 -57 -2 q -30 -3 -54 -12 q -24 -10 -39 -28 q -16 -19 -16 -52 q 0 -21 8 -38 q 8 -17 21 -29 q 13 -12 30 -18 q 17 -6 35 -6 q 1 0 9 1 q 7 0 17 1 q 10 0 19 1 q 9 0 14 0 q 48 0 84 -15 q 36 -15 65 -46 q 28 -31 51 -78 q 22 -48 45 -112" />
        </g>
      </svg>
    ),
    'borderblinds-svg': (
      <svg viewBox="0 0 40 40" style={{ marginLeft: 'calc(50% - 0.5em)' }}>
        <g transform="scale(0.03125 0.03125)">
          <path className="borderblinds-part1" d="M0 192l320-128v768l-320 128z" />
          <path className="borderblinds-part2" d="M384 32l320 192v736l-320-160z" />
          <path className="borderblinds-part3" d="M768 224l256-192v768l-256 192z" />
        </g>
      </svg>
    ),
  },
});

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});

const BorderBlindsIcon: React.FunctionComponent<{ color1?: string; color2?: string; color3?: string }> = props => {
  const { color1 = 'red', color2 = 'green', color3 = 'blue' } = props;

  // FontIcon is an optimized variant of standard Icon.
  // You could also use the standard Icon here.
  return (
    <FontIcon
      iconName="borderblinds-svg"
      className={mergeStyles(iconClass, {
        width: 50,
        height: 50,
        selectors: {
          '.borderblinds-part1': {
            fill: color1,
          },
          '.borderblinds-part2': {
            fill: color2,
          },
          '.borderblinds-part3': {
            fill: color3,
          },
        },
      })}
    />
  );
};

export const IconSvgExample: React.FunctionComponent = () => {
  // FontIcon is an optimized variant of standard Icon.
  // You could also use the standard Icon here.
  return (
    <div>
      <FontIcon iconName="onedrive-svg" className={iconClass} />
      <FontIcon
        iconName="yammer-svg"
        className={mergeStyles(iconClass, {
          fill: 'red',
          selectors: {
            '.thing': {
              fill: 'green',
            },
          },
        })}
      />
      <BorderBlindsIcon color3="pink" />
    </div>
  );
};
