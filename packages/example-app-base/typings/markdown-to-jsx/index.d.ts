// tslint:disable

declare module 'markdown-to-jsx' {
  import * as React from 'react';
  export interface IMarkdownSettings {
    overrides: {
      [key: string]: {
        component: string | React.ComponentClass<any> | React.StatelessComponent<any>;
        props?: any;
      }
    };
  }

  export interface IMarkdownProps {
    options?: IMarkdownSettings;
    children?: string | React.ComponentClass<any> | React.StatelessComponent<any>;
  }

  export default class Markdown extends React.Component<IMarkdownProps> { }
}
