export type RosterVisuals =
  | 'zoe.jpg'
  | 'veronika.jpg'
  | 'tom.jpg'
  | 'stevie.jpg'
  | 'rachel.png'
  | 'nom.jpg'
  | 'nan.jpg'
  | 'molly.png'
  | 'matthew.png'
  | 'matt.jpg'
  | 'mark.png'
  | 'lindsay.png'
  | 'lena.png'
  | 'laura.jpg'
  | 'justen.jpg'
  | 'joe.jpg'
  | 'jenny.jpg'
  | 'helen.jpg'
  | 'elliot.jpg'
  | 'daniel.jpg'
  | 'christian.jpg'
  | 'chris.jpg'
  | 'ade.jpg';

export interface RosterData {
  presenters: Map<string, RosterItemData>;
  attendees: Map<string, RosterItemData>;
  suggestions: Map<string, RosterItemData>;
}

export interface RosterItemData {
  visuals: RosterVisuals;
  userId: string;
  displayName: string;
  isMuted: boolean;
}

export type RosterSectionType = 'presenters' | 'attendees' | 'suggestions';
