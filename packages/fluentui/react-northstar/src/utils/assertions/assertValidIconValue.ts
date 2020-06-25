import { ShorthandValue } from '../../types';
import inconsistentIconNames from './inconsistentIconNames';
import { BoxProps } from '../../components/Box/Box';

const assertValidIconValue = (iconShorthand: ShorthandValue<BoxProps>, propName = 'icon') => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof iconShorthand === 'string' || (typeof iconShorthand === 'object' && !!(iconShorthand as any).name)) {
      const name = typeof iconShorthand === 'string' ? iconShorthand : (iconShorthand as any).name;
      const wrongUsage =
        typeof iconShorthand === 'string'
          ? `${propName}="${iconShorthand}"`
          : `${propName}="{${JSON.stringify(iconShorthand)}}`;
      const correctUsage = inconsistentIconNames[name]
        ? `<${inconsistentIconNames[name]} />`
        : name.length > 0
        ? `<${name[0].toUpperCase() + name.slice(1)}Icon />`
        : 'some icon component';
      console.warn(
        `FluentUI - you are using the icon shorthand in a wrong way. Please replace ${wrongUsage} with ${correctUsage} and move all properties except the name on the new component.`,
      );
    }
  }
};

export default assertValidIconValue;
