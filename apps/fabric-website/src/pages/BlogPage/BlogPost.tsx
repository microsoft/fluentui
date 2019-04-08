import * as React from 'react';
import './BlogPost.scss';
import { getParameterByName } from '../../utilities/location';

const blogData = require('../../data/blog-posts.json');

export class BlogPost extends React.Component<{}, {}> {
  private _postId: string;

  constructor(props: {}) {
    super(props);
    this._postId = getParameterByName('id');
  }

  public render(): JSX.Element {
    return (
      <div className="BlogPost">
        <div className="BlogPost-pageTitle">Blog</div>
        <h1 className="BlogPost-title">{blogData[this._postId].title}</h1>
        <p className="BlogPost-meta">
          {blogData[this._postId].fullPublishedDate} | Posted by {blogData[this._postId].author}
        </p>
        <div className="BlogPost-content" dangerouslySetInnerHTML={{ __html: blogData[this._postId].content }} />
      </div>
    );
  }
}
