import { css } from 'glamor';

export type IClassNames<T> = {
  [P in keyof T]?: string;
};

export function getClassNames<T>(styles: T): IClassNames<T> {
  return Object
    .keys(styles)
    .reduce((classNames: IClassNames<T>, className: string) => {
      classNames[className] = css(styles[className]).toString();
      return classNames;
    }, {});
}
