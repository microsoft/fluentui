const PersonaProps = [
  { name: 'primaryText', type: 'string', defaultValue: '', description: 'Primary text to display, usually the name of the person.' },
  { name: 'size', type: 'PersonaSize enum', defaultValue: 'regular', description: 'Decides the size of the control. { tiny, extraSmall, small, regular, large, extraLarge }' },
  { name: 'imageUrl', type: 'string', defaultValue: '', description: 'Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.' },
  { name: 'imageInitials', type: 'string', defaultValue: '', description: `The user's initials to display in the image area when there is no image.` },
  { name: 'presence', type: 'PersonaPresence enum', defaultValue: 'offline', description: 'Presence of the person to display. { offline, online, away, dnd, blocked }' },
  { name: 'secondaryText', type: 'string', defaultValue: '', description: 'Secondary text to display, usually the role of the user. (e.g. Actor)' },
  { name: 'tertiaryText', type: 'string', defaultValue: '', description: 'Tertiary text to display, usually the status of the user. (e.g. In a meeting)' },
  { name: 'optionalText', type: 'string', defaultValue: '', description: 'Optiona text to display, usually a custom message set. (e.g. Will be back at 4pm.)' }
];

export default PersonaProps;