import * as React from 'react';
import './BlogItem.scss';

export interface IBlogItem {
  title: string;
  author: string;
  id: number;
  previewDescription: string;
  monthPublished: string;
  dayPublished: number;
  yearPublished: number;
}

export class BlogItem extends React.Component<IBlogItem, {}> {
  public render(): JSX.Element {
    return (
      <div className="BlogItem">
        <div className="BlogItem-dateColumn">
          <div className="BlogItem-date">
            <div className="BlogItem-monthPublished">{this.props.monthPublished}</div>
            <div className="BlogItem-dayPublished">{this.props.dayPublished}</div>
            <div className="BlogItem-year">{this.props.yearPublished}</div>
          </div>
        </div>
        <div className="BlogItem-contentColumn">
          <h2 className="BlogItem-title">{this.props.title}</h2>
          <p className="BlogItem-author">Posted by {this.props.author}</p>
          <p className="BlogItem-previewDescription">{this.props.previewDescription}</p>
          <p className="BlogItem-readFullArticle">
            <a href={'?id=' + this.props.id + '#/blog/blog-post'}>Read full article</a>
          </p>
        </div>
      </div>
    );
  }
}
