import { IBreadcrumbStyleProps, IBreadcrumbStyles } from './Breadcrumb.types';

export const getStyles = (props: IBreadcrumbStyleProps): IBreadcrumbStyles => ({
  root: [
    'ms-Breadcrumb',
    {
      margin: '0 -4px',
      padding: 0,
      display: 'flex',
      alignItems: 'stretch',
    },
    props.className
  ]
});
