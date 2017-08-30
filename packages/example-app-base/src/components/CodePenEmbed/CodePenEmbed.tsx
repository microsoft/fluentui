import * as React from 'react';
import {
  css,
  getDocument
} from 'office-ui-fabric-react/lib/Utilities';

import { ICodePenEmbedProps } from './CodePenEmbed.props';

export interface ICodePenEmbedProps {

}

export class CodePenEmbed extends React.Component<ICodePenEmbedProps, {}> {

  public static defaultProps = {
    height: '450px',
    width: '100%',
    tab: 'js,result',
    theme: '0'
  }

  public render(): JSX.Element {
    let {
      height,
      width,
      tab,
      theme,
      user,
      hash
    } = this.props;

    const src = `//codepen.io/${this.props.user}/embed/${hash}/?height=${height}&theme-id=${theme}&default-tab=${tab}&embed-version=2`;
    const penUser = `http://codepen.io/${user}`;
    const pen = `${user}/pen/${this.props.hash}/`;

    return (
      <iframe height={ height } width={ width } scrolling='no' src={ src }>
        <a href={ pen }>See this pen</a> by { user } (<a href={ penUser }>@{ user }</a>) on <a href='http://codepen.io'>CodePen</a>.
      </iframe>
    );

  }


}
