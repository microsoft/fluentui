import * as React from 'react';
import './BlogPost.scss';

const blogData = require('../../data/blog-posts.json');

export class BlogPost extends React.Component<{}, {}> {
  private _postId: string;

  constructor() {
    super();
    this._postId = this._getParameterByName('id');
  }

  public render() {
    return (
      <div className='BlogPost'>
        <div className='BlogPost-pageTitle'>
          Blog
        </div>
        <h1 className='BlogPost-title'>
          { blogData[this._postId].title }
        </h1>
        <p className='BlogPost-meta'>
          { blogData[this._postId].fullPublishedDate } | Posted by { blogData[this._postId].author }
        </p>
        <div
          className='BlogPost-content'
          dangerouslySetInnerHTML={ { __html: blogData[this._postId].content } }
        />
      </div>
    );
  }

  private _getParameterByName(name: string, url?: string) {
    if (!url) {
      url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}