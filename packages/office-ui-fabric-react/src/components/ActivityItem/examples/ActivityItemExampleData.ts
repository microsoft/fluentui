import { IActivityItemProps, IActivityType } from '../ActivityItem.Props';
import { TestImages } from '../../../common/TestImages';

export const activityItemExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 0,
    activityType: IActivityType.commented,
    people: [
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson',
      }
    ],
    commentString: 'this is the text of the comment!',
    timeString: 'Just now'
  },

  {
    key: 1,
    activityType: IActivityType.edited,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist',
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson',
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa',
      }
    ],
    timeString: '1 hour ago'
  },

  {
    key: 2,
    activityType: IActivityType.moved,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa',
      }
    ],
    timeString: '8:25am'
  }
];