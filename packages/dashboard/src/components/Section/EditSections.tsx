import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './EditSections.styles';
import { IEditSectionsProps, IEditSectionsStyles } from './Section.types';
import { EditSectionsBase } from './EditSections.base';

export const EditSections: (props: IEditSectionsProps) => JSX.Element = styled<IEditSectionsProps, {}, IEditSectionsStyles>(
  EditSectionsBase,
  getStyles,
  undefined,
  { scope: 'EditSections' }
);
