import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import * as styles from './svgIcons.module.scss';

export interface ISVGIconProps {
  className?: string;
  iconGroupClassName?: string;
  iconHeight?: number;
  iconWidth?: number;
  iconSize?: number;
  iconColor?: string;
}

export const AndroidLogo = (props?: ISVGIconProps) => {
  props = props || {};
  const { className = styles.icon, iconGroupClassName = styles.androidLogo, iconColor, iconWidth, iconHeight, iconSize = 16 } = props;
  return (
    <svg
      className={css(className)}
      style={{ color: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14.34 16"
    >
      <g className={css(iconGroupClassName)} style={{ fill: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}>
        {/* tslint:disable-next-line max-line-length */}
        <path d="M2.51 5.72v6.22a1 1 0 0 0 1 1h.9v2.17a1 1 0 0 0 1 .94 1 1 0 0 0 1-.94v-2.22h1.4v2.17a1 1 0 0 0 1 .94 1 1 0 0 0 1-.94v-2.17h.87a1 1 0 0 0 1.05-1V5.72zm2.07-2.47a.45.45 0 0 0 .89 0 .45.45 0 0 0-.89 0zm4.29 0a.45.45 0 0 0 .89 0 .45.45 0 0 0-.89 0zm-6.4 2.11v-.15a4 4 0 0 1 .11-.92 4.29 4.29 0 0 1 2.23-2.71L4.09.25A.18.18 0 0 1 4.16 0a.18.18 0 0 1 .23.07l.73 1.35A5.16 5.16 0 0 1 7.18 1a5.32 5.32 0 0 1 2.05.41L10 .09a.18.18 0 0 1 .18-.09.16.16 0 0 1 .07.23l-.72 1.35a4.25 4.25 0 0 1 2.28 2.85c0 .14 0 .28.07.43v.5zm11.87 1.22a1 1 0 0 0-2.09 0V11a1 1 0 0 0 2.09 0zm-12.26 0V11A1 1 0 0 1 0 11V6.58a1 1 0 0 1 2.08 0" />
      </g>
    </svg>
  );
};

export const AppleLogo = (props?: ISVGIconProps) => {
  props = props || {};
  const { className = styles.icon, iconGroupClassName = styles.appleLogo, iconColor, iconWidth, iconHeight, iconSize = 16 } = props;
  return (
    <svg
      className={css(className)}
      style={{ color: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13.48 16"
    >
      <g className={css(iconGroupClassName)} style={{ fill: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}>
        {/* tslint:disable-next-line max-line-length */}
        <path d="M13.19 12.47a8.32 8.32 0 0 1-.86 1.53 7.77 7.77 0 0 1-1.1 1.33A2.15 2.15 0 0 1 9.8 16a3.55 3.55 0 0 1-1.31-.31 3.83 3.83 0 0 0-1.42-.32 3.94 3.94 0 0 0-1.46.32 3.86 3.86 0 0 1-1.25.31 2 2 0 0 1-1.46-.65A7.77 7.77 0 0 1 1.74 14a9.46 9.46 0 0 1-1.23-2.47A8.91 8.91 0 0 1 0 8.63a5.26 5.26 0 0 1 .7-2.77 4.09 4.09 0 0 1 1.45-1.47 3.94 3.94 0 0 1 2-.56 4.75 4.75 0 0 1 1.53.35 4.79 4.79 0 0 0 1.21.36 7.25 7.25 0 0 0 1.31-.42A4.39 4.39 0 0 1 10 3.8a3.91 3.91 0 0 1 3 1.59 3.37 3.37 0 0 0-1.79 3.07A3.35 3.35 0 0 0 12.37 11a3.69 3.69 0 0 0 1.11.73c-.09.25-.19.5-.29.74zM10.11.32a3.38 3.38 0 0 1-.88 2.24 3 3 0 0 1-2.47 1.22 1.46 1.46 0 0 1 0-.3 3.46 3.46 0 0 1 .93-2.26A3.4 3.4 0 0 1 8.8.37 3.17 3.17 0 0 1 10.09 0v.32z" />
      </g>
    </svg>
  );
};
