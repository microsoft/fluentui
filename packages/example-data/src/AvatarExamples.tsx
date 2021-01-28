const imageRoot = 'http://fabricweb.azureedge.net/fabric-website/assets/images/avatar';

/** Sample names and images for use in Avatar examples */
const nameAndImage = [
  { name: 'Katri Athokas', image: `${imageRoot}/KatriAthokas.jpg` },
  { name: 'Elvia Atkins', image: `${imageRoot}/ElviaAtkins.jpg` },
  { name: 'Mauricio August', image: `${imageRoot}/MauricioAugust.jpg` },
  { name: 'Colin Ballinger', image: `${imageRoot}/ColinBallinger.jpg` },
  { name: 'Lydia Bauer', image: `${imageRoot}/LydiaBauer.jpg` },
  { name: 'Amanda Brady', image: `${imageRoot}/AmandaBrady.jpg` },
  { name: 'Henry Brill', image: `${imageRoot}/HenryBrill.jpg` },
  { name: 'Celeste Burton', image: `${imageRoot}/CelesteBurton.jpg` },
  { name: 'Robin Counts', image: `${imageRoot}/RobinCounts.jpg` },
  { name: 'Tim Deboer', image: `${imageRoot}/TimDeboer.jpg` },
  { name: 'Cameron Evans', image: `${imageRoot}/CameronEvans.jpg` },
  { name: 'Isaac Fielder', image: `${imageRoot}/IsaacFielder.jpg` },
  { name: 'Cecil Folk', image: `${imageRoot}/CecilFolk.jpg` },
  { name: 'Miguel Garcia', image: `${imageRoot}/MiguelGarcia.jpg` },
  { name: 'Wanda Howard', image: `${imageRoot}/WandaHoward.jpg` },
  { name: 'Mona Kane', image: `${imageRoot}/MonaKane.jpg` },
  { name: 'Kat Larsson', image: `${imageRoot}/KatLarsson.jpg` },
  { name: 'Ashley McCarthy', image: `${imageRoot}/AshleyMcCarthy.jpg` },
  { name: 'Johnie McConnell', image: `${imageRoot}/JohnieMcConnell.jpg` },
  { name: 'Allan Munger', image: `${imageRoot}/AllanMunger.jpg` },
  { name: 'Erik Nason', image: `${imageRoot}/ErikNason.jpg` },
  { name: 'Kristin Patterson', image: `${imageRoot}/KristinPatterson.jpg` },
  { name: 'Daisy Phillips', image: `${imageRoot}/DaisyPhillips.jpg` },
  { name: 'Carole Poland', image: `${imageRoot}/CarolePoland.jpg` },
  { name: 'Carlos Slattery', image: `${imageRoot}/CarlosSlattery.jpg` },
  { name: 'Robert Tolbert', image: `${imageRoot}/RobertTolbert.jpg` },
  { name: 'Kevin Sturgis', image: `${imageRoot}/KevinSturgis.jpg` },
  { name: 'Charlotte Waltson', image: `${imageRoot}/CharlotteWaltson.jpg` },
  { name: 'Elliot Woodward', image: `${imageRoot}/ElliotWoodward.jpg` },
];

/** Arrays of example values for each Avatar prop */
export const AvatarExamples = {
  nameAndImage: nameAndImage,
  name: nameAndImage.map(p => p.name),
  image: nameAndImage.map(p => p.image),
  activeDisplay: ['ring', 'ring-shadow', 'ring-glow', 'shadow', 'glow'],
  colorVariant: ['neutral', 'brand'],
  /** A SVG hexagon data URL used by the CustomShape example */
  hexagon:
    'data:image/svg+xml;utf8,' +
    '<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill="rgb(232,232,232)" d="M0.407926 17.528C-0.135976 16.5859 -0.135975 15.4141 0.407926 14.472' +
    'L7.91541 1.46793C8.44076 0.557947 9.39444 0 10.4245 0H25.5755C26.6056 0 27.5592 0.557951 28.0846 1.46793' +
    'L35.5921 14.472C36.136 15.4141 36.136 16.5859 35.5921 17.528L28.0846 30.5321' +
    'C27.5592 31.4421 26.6056 32 25.5755 32H10.4245C9.39443 32 8.44076 31.4421 7.91541 30.5321L0.407926 17.528Z"/>' +
    '</svg>',
} as const;
