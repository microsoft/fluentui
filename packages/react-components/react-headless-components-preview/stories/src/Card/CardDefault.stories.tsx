import * as React from 'react';
import { Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-headless-components-preview';
import { MoreHorizontalRegular, ShareRegular, ArrowReplyRegular } from '@fluentui/react-icons';

const classes = {
  card:
    'flex flex-col gap-3 w-80 p-3 bg-white rounded-lg border border-gray-200 shadow-sm ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
  preview: 'flex items-center justify-center bg-gray-100 rounded-md overflow-hidden -mx-3 -mt-3',
  previewImage: 'block w-full h-40 object-cover',
  header: 'flex items-center gap-3',
  headerImage: 'flex h-10 w-10 rounded-md overflow-hidden bg-gray-100',
  headerImg: 'h-full w-full object-cover',
  headerTitle: 'text-sm font-semibold text-gray-900 leading-tight',
  headerDescription: 'text-xs text-gray-500 leading-tight',
  headerAction: 'ml-auto flex items-center',
  iconButton:
    'inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
  body: 'text-sm text-gray-700 leading-snug',
  footer: 'flex items-center gap-2 pt-1',
  footerButton:
    'inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm text-gray-700 border border-gray-200 ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
};

export const Default = (): React.ReactNode => (
  <Card className={classes.card}>
    <CardPreview className={classes.preview}>
      <img
        className={classes.previewImage}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
        alt="Preview"
      />
    </CardPreview>

    <CardHeader
      className={classes.header}
      image={
        <div className={classes.headerImage}>
          <img
            className={classes.headerImg}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png"
            alt=""
          />
        </div>
      }
      header={<div className={classes.headerTitle}>App Name</div>}
      description={<div className={classes.headerDescription}>Developer</div>}
      action={
        <div className={classes.headerAction}>
          <button type="button" aria-label="More options" className={classes.iconButton}>
            <MoreHorizontalRegular />
          </button>
        </div>
      }
    />

    <div className={classes.body}>
      Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
    </div>

    <CardFooter className={classes.footer}>
      <button type="button" className={classes.footerButton}>
        <ArrowReplyRegular aria-hidden />
        Reply
      </button>
      <button type="button" className={classes.footerButton}>
        <ShareRegular aria-hidden />
        Share
      </button>
    </CardFooter>
  </Card>
);
