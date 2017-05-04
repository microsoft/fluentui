import { css } from 'glamor';

export type IClassNames<T> = {
  [P in keyof T]?: string;
};

export function getClassNames<T>(styles: T): IClassNames<T> {
  return Object
    .keys(styles)
    .reduce((classNames: IClassNames<T>, className: string) => {
      // tslint:disable-next-line:no-any
      classNames[className] = css((<any>styles)[className]).toString();
      return classNames;
    }, {});
}
