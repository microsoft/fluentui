import { getId } from '@fluentui/react/lib/Utilities';

export interface IExample {
  key: string;
  title: string;
  onRender?: () => JSX.Element;
}

export class ExampleGroup {
  private _title: string;
  private _examples: IExample[];

  constructor(title: string) {
    this._title = title;
    this._examples = [];
  }

  public get title(): string {
    return this._title;
  }

  public get examples(): IExample[] {
    return this._examples;
  }

  public add(title: string, onRender: () => JSX.Element): ExampleGroup {
    this._examples.push({
      key: getId(),
      title,
      onRender,
    });

    return this;
  }
}

export function examplesOf(title: string): ExampleGroup {
  return new ExampleGroup(title);
}
