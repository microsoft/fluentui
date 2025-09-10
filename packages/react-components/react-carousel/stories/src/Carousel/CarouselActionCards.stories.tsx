import {
  Button,
  makeStyles,
  tokens,
  Image,
  Persona,
  Dropdown,
  Option,
  Switch,
  Field,
  CarouselSlider,
} from '@fluentui/react-components';
import { MoreHorizontalRegular, DocumentLinkRegular } from '@fluentui/react-icons';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselProps,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows: 'auto 1fr',
    boxShadow: tokens.shadow16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    padding: '10px',
    minHeight: '100px',
  },
  carousel: {
    flex: 1,
    padding: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderBottom: 'none',
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    padding: '10px',
  },
  field: {
    flex: 1,
    gridTemplateColumns: 'minmax(100px, max-content) 1fr',
  },
  dropdown: {
    minWidth: '100px',
    width: '1fr',
  },
});

const useCardClasses = makeStyles({
  actionCard: {
    borderRadius: tokens.borderRadiusLarge,
    overflow: 'hidden',
    textAlign: 'center',
    maxWidth: '350px',
    margin: '0px 6px',
    boxShadow: tokens.shadow16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    maxHeight: '200px',
  },
  imageButton: {
    position: 'absolute',
    left: '12px',
    bottom: '12px',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    padding: '12px',
    width: 'auto',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

type Post = {
  avatarUrl: string;
  name: string;
  text: string;
  description: string;
};

const POSTS: Post[] = [
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    name: 'Allan Munger',
    text: 'Meeting notes',
    description: '2 days ago by Kathryn Murphy',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg',
    name: 'Amanda Brady',
    text: 'FY24 Hiring Budget',
    description: 'Wed at 3:38pm',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AshleyMcCarthy.jpg',
    name: 'Ashley McCarthy',
    text: 'Test edited this',
    description: 'Thu at 4:38pm',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    name: 'Cameron Evans',
    text: 'Review 1:1 Recap',
    description: 'You recently opened this',
  },
  {
    avatarUrl: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg',
    name: 'Carlos Slattery',
    text: 'FY24 Hiring Test',
    description: '2 days ago by Cecil Folk',
  },
];

const ActionCard: React.FC<Post & { index: number }> = props => {
  const { avatarUrl, description, name, text, index } = props;
  const classes = useCardClasses();

  return (
    <CarouselCard className={classes.actionCard} aria-label={`Card ${index + 1} of ${POSTS.length}`}>
      <div className={classes.imageContainer}>
        <Image className={classes.image} fit="cover" src={swapImage} role="presentation" />
        <Button className={classes.imageButton} icon={<DocumentLinkRegular />} aria-label="Go to document" />
      </div>
      <div className={classes.info}>
        <Persona
          textPosition="after"
          avatar={{ name, image: { src: avatarUrl } }}
          name={text}
          presence={{ status: 'available' }}
          secondaryText={description}
        />
        <Button icon={<MoreHorizontalRegular />} aria-label="More options" />
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const AlignmentAndWhitespace = (): JSXElement => {
  const classes = useClasses();

  const [alignment, setAlignment] = React.useState<CarouselProps['align']>('center');
  const [whitespace, setWhitespace] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field label="Alignment" orientation="horizontal" className={classes.field}>
          <Dropdown
            className={classes.dropdown}
            placeholder="Select an alignment"
            onOptionSelect={(_, option) => {
              setAlignment(option.optionText as CarouselProps['align']);
            }}
            value={alignment}
          >
            {['start', 'center', 'end'].map(option => (
              <Option key={option}>{option}</Option>
            ))}
          </Dropdown>
        </Field>

        <Field label="Whitespace" orientation="horizontal" className={classes.field}>
          <Switch checked={whitespace} onChange={() => setWhitespace(!whitespace)} />
        </Field>
      </div>

      <div className={classes.card}>
        <Carousel align={alignment} className={classes.carousel} whitespace={whitespace} announcement={getAnnouncement}>
          <CarouselViewport>
            <CarouselSlider cardFocus aria-label="Use the left and right arrow keys to navigate focused carousel card">
              {POSTS.map((post, index) => (
                <ActionCard {...post} key={post.name} index={index} />
              ))}
            </CarouselSlider>
          </CarouselViewport>
          <CarouselNavContainer
            layout="inline"
            next={{ 'aria-label': 'go to next' }}
            prev={{ 'aria-label': 'go to prev' }}
          >
            <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
          </CarouselNavContainer>
        </Carousel>
      </div>
    </div>
  );
};

AlignmentAndWhitespace.parameters = {
  docs: {
    description: {
      story:
        'Carousel can have slides aligned relative to the carousel viewport, use the `align` prop to set the alignment. Note, the `whitespace` prop could be used to clear leading and trailing empty space that causes excessive scrolling.',
    },
  },
};
