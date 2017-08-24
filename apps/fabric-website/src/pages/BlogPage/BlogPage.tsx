import * as React from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { BlogItem } from './BlogItem';
import * as stylesImport from './BlogPage.module.scss';
const styles: any = stylesImport;

const blogData = require('../../data/blog-posts.json');

export class BlogPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader pageTitle='Blog' backgroundColor='#73aa24' />
        <div className={ styles.angle }></div>
        { this._getBlogItems() }
      </div>
    );
  }

  private _getBlogItems(): Array<JSX.Element> {
    let array: Array<JSX.Element> = [];

    for (let i = 0; i < blogData.length; i++) {
      array.push(
        <BlogItem
          title={ blogData[i].title }
          author={ blogData[i].author }
          previewDescription={ blogData[i].previewDescription }
          monthPublished={ blogData[i].monthPublished }
          dayPublished={ blogData[i].dayPublished }
          yearPublished={ blogData[i].yearPublished }
          id={ i } />
      );
    }
    return array;
  }
}
