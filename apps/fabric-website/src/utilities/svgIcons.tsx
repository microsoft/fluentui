import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import * as styles from './svgIcons.module.scss';

export interface ISVGIconProps {
  className?: string;
  iconGroupClassName?: string;
  iconHeight?: number | string;
  iconWidth?: number | string;
  iconSize?: number | string;
  iconColor?: string;
}

export const AndroidLogo = (props?: ISVGIconProps) => {
  props = props || {};
  const { className = styles.icon, iconColor, iconWidth, iconHeight, iconSize } = props;
  return (
    <svg
      className={css(className)}
      style={{ stroke: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 65V41C1 23.3267 15.3267 9 33 9C50.6733 9 65 23.3267 65 41V65" strokeWidth="2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 25C21 27.2093 19.2093 29 17 29C14.7907 29 13 27.2093 13 25C13 22.7907 14.7907 21 17 21C19.2093 21 21 22.7907 21 25Z"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 25C53 27.2093 51.2093 29 49 29C46.7907 29 45 27.2093 45 25C45 22.7907 46.7907 21 49 21C51.2093 21 53 22.7907 53 25Z"
        strokeWidth="2"
      />
      <path d="M17 13L9 1" strokeWidth="2" />
      <path d="M49 13L57 1" strokeWidth="2" />
      <path d="M1 41H65" strokeWidth="2" />
    </svg>
  );
};

export const AppleLogo = (props?: ISVGIconProps) => {
  props = props || {};
  const { className = styles.icon, iconColor, iconWidth, iconHeight, iconSize } = props;
  return (
    <svg
      className={css(className)}
      style={{ stroke: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.0022 65H16.9978C8.16222 65 1 57.8373 1 49.0022V16.9978C1 8.16267 8.16222 1 16.9978 1H49.0022C57.8378 1 65 8.16267 65 16.9978V49.0022C65 57.8373 57.8378 65 49.0022 65Z"
        strokeWidth="2"
      />
      <path d="M57 25C57 20.5782 53.4218 17 49 17" strokeWidth="2" />
      <path d="M41 25C41 20.5782 44.5782 17 49 17" strokeWidth="2" />
      <path d="M41 25C41 29.4218 44.5782 33 49 33" strokeWidth="2" />
      <path d="M57 41C57 36.5782 53.4218 33 49 33" strokeWidth="2" />
      <path d="M57 41C57 45.4218 53.4218 49 49 49" strokeWidth="2" />
      <path d="M41 41C41 45.4218 44.5782 49 49 49" strokeWidth="2" />
      <path d="M33 25C33 20.5782 29.4218 17 25 17" strokeWidth="2" />
      <path d="M17 25C17 20.5782 20.5782 17 25 17" strokeWidth="2" />
      <path d="M33 41C33 45.4218 29.4218 49 25 49" strokeWidth="2" />
      <path d="M17 41C17 45.4218 20.5782 49 25 49" strokeWidth="2" />
      <path d="M17.0001 25V41" strokeWidth="2" />
      <path d="M33.0001 25V41" strokeWidth="2" />
      <path d="M9.00005 29V49" strokeWidth="2" />
      <path d="M9.00005 17V21" strokeWidth="2" />
    </svg>
  );
};

export const WebLogo = (props?: ISVGIconProps) => {
  props = props || {};
  const { className = styles.icon, iconColor, iconWidth, iconHeight, iconSize } = props;
  return (
    <svg
      className={css(className)}
      style={{ stroke: iconColor, width: iconWidth || iconSize, height: iconHeight || iconSize }}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65 33C65 50.6733 50.6733 65 33 65C15.3267 65 1 50.6733 1 33C1 15.3267 15.3267 1 33 1C50.6733 1 65 15.3267 65 33Z"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49 33C49 50.6733 41.8364 65 33 65C24.1636 65 17 50.6733 17 33C17 15.3267 24.1636 1 33 1C41.8364 1 49 15.3267 49 33Z"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path d="M5 16.9998H61" strokeWidth="2" />
      <path d="M5 48.9998H61" strokeWidth="2" />
    </svg>
  );
};
