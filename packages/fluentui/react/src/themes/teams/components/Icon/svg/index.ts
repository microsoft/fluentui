import svgIconsAndStyles from './icons';
import { SvgIconSpecWithStyles, TeamsSvgIconSpec } from './types';

export const getStyle = partName => {
  return args => {
    const { props } = args;

    const maybeIconSpec = svgIconsAndStyles[props.name];
    const maybeIconStyles = maybeIconSpec && (maybeIconSpec as SvgIconSpecWithStyles).styles;

    if (maybeIconStyles && maybeIconStyles[partName]) {
      return maybeIconStyles[partName](args);
    }

    return undefined;
  };
};

export * from './teamsIconClassNames';

export default svgIconsAndStyles as { [iconName: string]: TeamsSvgIconSpec };
