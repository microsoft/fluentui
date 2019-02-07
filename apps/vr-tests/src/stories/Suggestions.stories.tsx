/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Suggestions, ISuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

type Color = {
  name: string;
  hex: string;
};

/**
 * Sourced from
 * https://en.wikipedia.org/wiki/List_of_colors:_A%E2%80%93F
 */
const colorData: Color[] = [
  {
    name:
      'A Color With A Really Really Really Long Name. So long it is almost guaranteed to force an overflow',
    hex: '#C0FFEE'
  },
  { name: 'Absolute Zero', hex: '#0048BA' },
  { name: 'Beau blue', hex: '#BCD4E6' },
  { name: 'Beaver', hex: '#9F8170' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: "B'dazzled blue", hex: '#2E5894' },
  { name: 'Big dip o’ruby', hex: '#9C2542' },
  { name: 'Big Foot Feet', hex: '#D99A6C' },
  { name: 'Bisque', hex: '#FFE4C4' },
  { name: 'Bistre', hex: '#3D2B1F' },
  { name: 'Bistre brown', hex: '#967117' },
  { name: 'Bitter lemon', hex: '#CAE00D' },
  { name: 'Bitter lime', hex: '#BFFF00' },
  { name: 'Bittersweet', hex: '#FE6F5E' },
  { name: 'Bittersweet shimmer', hex: '#BF4F51' },
  { name: 'Black', hex: '#000000' },
  { name: 'Black bean', hex: '#3D0C02' },
  { name: 'Black chocolate', hex: '#1B1811' },
  { name: 'Black coffee', hex: '#3B2F2F' },
  { name: 'Black coral', hex: '#54626F' },
  { name: 'Black olive', hex: '#3B3C36' },
  { name: 'Black Shadows', hex: '#BFAFB2' },
  { name: 'Blanched almond', hex: '#FFEBCD' },
  { name: 'Blast-off bronze', hex: '#A57164' },
  { name: 'Bleu de France', hex: '#318CE7' },
  { name: 'Blizzard blue', hex: '#ACE5EE' },
  { name: 'Blond', hex: '#FAF0BE' },
  { name: 'Blood red', hex: '#660000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Blue (Crayola)', hex: '#1F75FE' },
  { name: 'Blue (Munsell)', hex: '#0093AF' },
  { name: 'Blue (NCS)', hex: '#0087BD' },
  { name: 'Blue (Pantone)', hex: '#0018A8' },
  { name: 'Blue (pigment)', hex: '#333399' },
  { name: 'Blue (RYB)', hex: '#0247FE' },
  { name: 'Blue bell', hex: '#A2A2D0' },
  { name: 'Blue-gray', hex: '#6699CC' },
  { name: 'Blue-green', hex: '#0D98BA' },
  { name: 'Blue-green (color wheel)', hex: '#064E40' },
  { name: 'Blue jeans', hex: '#5DADEC' },
  { name: 'Blue sapphire', hex: '#126180' },
  { name: 'Blue-violet', hex: '#8A2BE2' },
  { name: 'Blue-violet (Crayola)', hex: '#7366BD' },
  { name: 'Blue-violet (color wheel)', hex: '#4D1A7F' },
  { name: 'Blue yonder', hex: '#5072A7' },
  { name: 'Bluetiful', hex: '#3C69E7' },
  { name: 'Blush', hex: '#DE5D83' },
  { name: 'Bole', hex: '#79443B' },
  { name: 'Bondi blue', hex: '#0095B6' },
  { name: 'Bone', hex: '#E3DAC9' },
  { name: 'Bottle green', hex: '#006A4E' },
  { name: 'Brandy', hex: '#87413F' },
  { name: 'Brick red', hex: '#CB4154' },
  { name: 'Bright green', hex: '#66FF00' },
  { name: 'Bright lilac', hex: '#D891EF' },
  { name: 'Bright maroon', hex: '#C32148' },
  { name: 'Bright navy blue', hex: '#1974D2' },
  { name: 'Bright yellow (Crayola)', hex: '#FFAA1D' },
  { name: 'Brilliant rose', hex: '#FF55A3' },
  { name: 'Brink pink', hex: '#FB607F' },
  { name: 'British racing green', hex: '#004225' },
  { name: 'Bronze', hex: '#CD7F32' },
  { name: 'Brown', hex: '#88540B' },
  { name: 'Brown sugar', hex: '#AF6E4D' },
  { name: 'Brunswick green', hex: '#1B4D3E' },
  { name: 'Bubbles', hex: '#E7FEFF' },
  { name: 'Bud green', hex: '#7BB661' },
  { name: 'Buff', hex: '#F0DC82' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Burlywood', hex: '#DEB887' },
  { name: 'Burnished brown', hex: '#A17A74' },
  { name: 'Burnt orange', hex: '#CC5500' },
  { name: 'Burnt sienna', hex: '#E97451' },
  { name: 'Burnt umber', hex: '#8A3324' },
  { name: 'Byzantine', hex: '#BD33A4' },
  { name: 'Byzantium', hex: '#702963' },
  { name: 'Cadet', hex: '#536872' },
  { name: 'Cadet blue', hex: '#5F9EA0' },
  { name: 'Cadet blue (Crayola)', hex: '#A9B2C3' },
  { name: 'Cadet grey', hex: '#91A3B0' },
  { name: 'Cadmium green', hex: '#006B3C' },
  { name: 'Cadmium orange', hex: '#ED872D' },
  { name: 'Cadmium red', hex: '#E30022' },
  { name: 'Cadmium yellow', hex: '#FFF600' },
  { name: 'Café au lait', hex: '#A67B5B' },
  { name: 'Café noir', hex: '#4B3621' },
  { name: 'Cambridge blue', hex: '#A3C1AD' },
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Cameo pink', hex: '#EFBBCC' },
  { name: 'Canary', hex: '#FFFF99' },
  { name: 'Canary yellow', hex: '#FFEF00' },
  { name: 'Candy apple red', hex: '#FF0800' },
  { name: 'Candy pink', hex: '#E4717A' },
  { name: 'Capri', hex: '#00BFFF' },
  { name: 'Caput mortuum', hex: '#592720' },
  { name: 'Cardinal', hex: '#C41E3A' },
  { name: 'Caribbean green', hex: '#00CC99' },
  { name: 'Carmine', hex: '#960018' },
  { name: 'Carmine (M&P)', hex: '#D70040' },
  { name: 'Carnation pink', hex: '#FFA6C9' },
  { name: 'Carnelian', hex: '#B31B1B' },
  { name: 'Carolina blue', hex: '#56A0D3' },
  { name: 'Carrot orange', hex: '#ED9121' },
  { name: 'Castleton green', hex: '#00563F' },
  { name: 'Catawba', hex: '#703642' },
  { name: 'Cedar Chest', hex: '#C95A49' },
  { name: 'Celadon', hex: '#ACE1AF' },
  { name: 'Celadon blue', hex: '#007BA7' },
  { name: 'Celadon green', hex: '#2F847C' },
  { name: 'Celeste', hex: '#B2FFFF' },
  { name: 'Celtic blue', hex: '#246BCE' },
  { name: 'Cerise', hex: '#DE3163' },
  { name: 'Cerulean', hex: '#007BA7' },
  { name: 'Cerulean blue', hex: '#2A52BE' },
  { name: 'Cerulean frost', hex: '#6D9BC3' },
  { name: 'Cerulean (Crayola)', hex: '#1DACD6' },
  { name: 'CG blue', hex: '#007AA5' },
  { name: 'CG red', hex: '#E03C31' },
  { name: 'Champagne', hex: '#F7E7CE' },
  { name: 'Champagne pink', hex: '#F1DDCF' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Charleston green', hex: '#232B2B' },
  { name: 'Charm pink', hex: '#E68FAC' },
  { name: 'Chartreuse (traditional)', hex: '#DFFF00' },
  { name: 'Chartreuse (web)', hex: '#7FFF00' },
  { name: 'Cherry blossom pink', hex: '#FFB7C5' },
  { name: 'Chestnut', hex: '#954535' },
  { name: 'China pink', hex: '#DE6FA1' },
  { name: 'China rose', hex: '#A8516E' },
  { name: 'Chinese red', hex: '#AA381E' },
  { name: 'Chinese violet', hex: '#856088' },
  { name: 'Chinese yellow', hex: '#FFB200' },
  { name: 'Chocolate (traditional)', hex: '#7B3F00' },
  { name: 'Chocolate (web)', hex: '#D2691E' },
  { name: 'Chrome yellow', hex: '#FFA700' },
  { name: 'Cinereous', hex: '#98817B' },
  { name: 'Cinnabar', hex: '#E34234' },
  { name: 'Cinnamon Satin', hex: '#CD607E' },
  { name: 'Citrine', hex: '#E4D00A' },
  { name: 'Citron', hex: '#9FA91F' },
  { name: 'Claret', hex: '#7F1734' },
  { name: 'Cobalt blue', hex: '#0047AB' },
  { name: 'Cocoa brown', hex: '#D2691E' },
  { name: 'Coffee', hex: '#6F4E37' },
  { name: 'Columbia Blue', hex: '#B9D9EB' },
  { name: 'Congo pink', hex: '#F88379' },
  { name: 'Cool grey', hex: '#8C92AC' },
  { name: 'Copper', hex: '#B87333' },
  { name: 'Copper (Crayola)', hex: '#DA8A67' },
  { name: 'Copper penny', hex: '#AD6F69' },
  { name: 'Copper red', hex: '#CB6D51' },
  { name: 'Copper rose', hex: '#996666' },
  { name: 'Coquelicot', hex: '#FF3800' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Coral pink', hex: '#F88379' },
  { name: 'Cordovan', hex: '#893F45' },
  { name: 'Corn', hex: '#FBEC5D' },
  { name: 'Cornflower blue', hex: '#6495ED' },
  { name: 'Cornsilk', hex: '#FFF8DC' },
  { name: 'Cosmic cobalt', hex: '#2E2D88' },
  { name: 'Cosmic latte', hex: '#FFF8E7' },
  { name: 'Cosmos pink', hex: '#FEBCFF' },
  { name: 'Coyote brown', hex: '#81613C' },
  { name: 'Cotton candy', hex: '#FFBCD9' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Crimson (UA)', hex: '#9E1B32' },
  { name: 'Cultured', hex: '#F5F5F5' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Cyan (process)', hex: '#00B7EB' },
  { name: 'Cyber grape', hex: '#58427C' },
  { name: 'Cyber yellow', hex: '#FFD300' },
  { name: 'Cyclamen', hex: '#F56FA1' },
  { name: 'Dark blue-gray', hex: '#666699' },
  { name: 'Dark brown', hex: '#654321' },
  { name: 'Dark byzantium', hex: '#5D3954' },
  { name: 'Dark cornflower blue', hex: '#26428B' },
  { name: 'Dark cyan', hex: '#008B8B' },
  { name: 'Dark electric blue', hex: '#536878' },
  { name: 'Dark goldenrod', hex: '#B8860B' },
  { name: 'Dark green', hex: '#013220' },
  { name: 'Dark green (X11)', hex: '#006400' },
  { name: 'Dark jungle green', hex: '#1A2421' },
  { name: 'Dark khaki', hex: '#BDB76B' },
  { name: 'Dark lava', hex: '#483C32' },
  { name: 'Dark liver', hex: '#534B4F' },
  { name: 'Dark liver (horses)', hex: '#543D37' },
  { name: 'Dark magenta', hex: '#8B008B' },
  { name: 'Dark moss green', hex: '#4A5D23' },
  { name: 'Dark olive green', hex: '#556B2F' },
  { name: 'Dark orange', hex: '#FF8C00' },
  { name: 'Dark orchid', hex: '#9932CC' },
  { name: 'Dark pastel green', hex: '#03C03C' },
  { name: 'Dark purple', hex: '#301934' },
  { name: 'Dark red', hex: '#8B0000' },
  { name: 'Dark salmon', hex: '#E9967A' },
  { name: 'Dark sea green', hex: '#8FBC8F' },
  { name: 'Dark sienna', hex: '#3C1414' },
  { name: 'Dark sky blue', hex: '#8CBED6' },
  { name: 'Dark slate blue', hex: '#483D8B' },
  { name: 'Dark slate gray', hex: '#2F4F4F' },
  { name: 'Dark spring green', hex: '#177245' },
  { name: 'Dark turquoise', hex: '#00CED1' },
  { name: 'Dark violet', hex: '#9400D3' },
  { name: 'Dartmouth green', hex: '#00703C' },
  { name: "Davy's grey", hex: '#555555' },
  { name: 'Deep cerise', hex: '#DA3287' },
  { name: 'Deep champagne', hex: '#FAD6A5' },
  { name: 'Deep chestnut', hex: '#B94E48' },
  { name: 'Deep jungle green', hex: '#004B49' },
  { name: 'Deep pink', hex: '#FF1493' },
  { name: 'Deep saffron', hex: '#FF9933' },
  { name: 'Deep sky blue', hex: '#00BFFF' },
  { name: 'Deep Space Sparkle', hex: '#4A646C' },
  { name: 'Deep taupe', hex: '#7E5E60' },
  { name: 'Denim', hex: '#1560BD' },
  { name: 'Denim blue', hex: '#2243B6' },
  { name: 'Desert', hex: '#C19A6B' },
  { name: 'Desert sand', hex: '#EDC9AF' },
  { name: 'Dim gray', hex: '#696969' },
  { name: 'Dingy Dungeon', hex: '#C53151' },
  { name: 'Dodger blue', hex: '#1E90FF' },
  { name: 'Dogwood rose', hex: '#D71868' },
  { name: 'Drab', hex: '#967117' },
  { name: 'Duke blue', hex: '#00009C' },
  { name: 'Dutch white', hex: '#EFDFBB' },
  { name: 'Earth yellow', hex: '#E1A95F' },
  { name: 'Ebony', hex: '#555D50' },
  { name: 'Ecru', hex: '#C2B280' },
  { name: 'Eerie black', hex: '#1B1B1B' },
  { name: 'Eggplant', hex: '#614051' },
  { name: 'Eggshell', hex: '#F0EAD6' },
  { name: 'Egyptian blue', hex: '#1034A6' },
  { name: 'Electric blue', hex: '#7DF9FF' },
  { name: 'Electric green', hex: '#00FF00' },
  { name: 'Electric indigo', hex: '#6F00FF' },
  { name: 'Electric lime', hex: '#CCFF00' },
  { name: 'Electric purple', hex: '#BF00FF' },
  { name: 'Electric violet', hex: '#8F00FF' },
  { name: 'Emerald', hex: '#50C878' },
  { name: 'Eminence', hex: '#6C3082' },
  { name: 'English green', hex: '#1B4D3E' },
  { name: 'English lavender', hex: '#B48395' },
  { name: 'English red', hex: '#AB4B52' },
  { name: 'English vermillion', hex: '#CC474B' },
  { name: 'English violet', hex: '#563C5C' },
  { name: 'Erin', hex: '#00FF40' },
  { name: 'Eton blue', hex: '#96C8A2' },
  { name: 'Fallow', hex: '#C19A6B' },
  { name: 'Falu red', hex: '#801818' },
  { name: 'Fandango', hex: '#B53389' },
  { name: 'Fandango pink', hex: '#DE5285' },
  { name: 'Fashion fuchsia', hex: '#F400A1' },
  { name: 'Fawn', hex: '#E5AA70' },
  { name: 'Feldgrau', hex: '#4D5D53' },
  { name: 'Fern green', hex: '#4F7942' },
  { name: 'Field drab', hex: '#6C541E' },
  { name: 'Fiery rose', hex: '#FF5470' },
  { name: 'Firebrick', hex: '#B22222' },
  { name: 'Fire engine red', hex: '#CE2029' },
  { name: 'Fire opal', hex: '#E95C4B' },
  { name: 'Flame', hex: '#E25822' },
  { name: 'Flax', hex: '#EEDC82' },
  { name: 'Flesh', hex: '#FFE9D1' },
  { name: 'Flickr Blue', hex: '#0063dc' },
  { name: 'Flickr Pink', hex: '#FB0081' },
  { name: 'Flirt', hex: '#A2006D' },
  { name: 'Floral white', hex: '#FFFAF0' },
  { name: 'Fluorescent blue', hex: '#15F4EE' },
  { name: 'Forest green (Crayola)', hex: '#5FA777' },
  { name: 'Forest green (traditional)', hex: '#014421' },
  { name: 'Forest green (web)', hex: '#228B22' },
  { name: 'French beige', hex: '#A67B5B' },
  { name: 'French bistre', hex: '#856D4D' },
  { name: 'French blue', hex: '#0072BB' },
  { name: 'French fuchsia', hex: '#FD3F92' },
  { name: 'French lilac', hex: '#86608E' },
  { name: 'French lime', hex: '#9EFD38' },
  { name: 'French mauve', hex: '#D473D4' },
  { name: 'French pink', hex: '#FD6C9E' },
  { name: 'French raspberry', hex: '#C72C48' },
  { name: 'French rose', hex: '#F64A8A' },
  { name: 'French sky blue', hex: '#77B5FE' },
  { name: 'French violet', hex: '#8806CE' },
  { name: 'Frostbite', hex: '#E936A7' },
  { name: 'Fuchsia', hex: '#FF00FF' },
  { name: 'Fuchsia (Crayola)', hex: '#C154C1' },
  { name: 'Fuchsia purple', hex: '#CC397B' },
  { name: 'Fuchsia rose', hex: '#C74375' },
  { name: 'Fulvous', hex: '#E48400' },
  { name: 'Fuzzy Wuzzy', hex: '#CC6666' }
];

type ColorsMap = { [key: string]: Color };

const getColorsMap = () => {
  const colorsObj: ColorsMap = {};
  colorData.forEach(color => {
    colorsObj[color.hex] = color;
  });
  return colorsObj;
};

const makeColorIntoSuggestion = (color: Color) => ({
  item: color,
  selected: false,
  ariaLabel: color.name
});

const ColorSuggestionItem = ({ name, hex }: Color) => (
  <div
    id={`color-${hex.substring(1)}`}
    style={{
      display: 'flex',
      minWidth: 0
    }}
    data-is-focusable={true}
  >
    <div
      style={{
        backgroundColor: hex,
        borderRadius: '50%',
        height: '2em',
        width: '2em',
        flexShrink: 0
      }}
    />
    <div
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {name}
    </div>
  </div>
);
const NoResultFound = () => <div>No Result Found ¯\_(ツ)_/¯</div>;

export class SimpleSuggestionsExample extends React.Component<{}, { colors: ColorsMap }> {
  ColorSuggestions: new (props: ISuggestionsProps<Color>) => Suggestions<Color> = Suggestions;

  constructor(props: {}) {
    super(props);
    this.state = {
      colors: getColorsMap()
    };
  }

  private removeColor(removedColor: Color) {
    this.setState(() => {
      delete this.state.colors[removedColor.hex];
      return { colors: this.state.colors };
    });
  }

  public render(): JSX.Element {
    return (
      <div
        className="testRoot"
        style={{
          height: '80vh',
          position: 'relative',
          maxHeight: 'inherit',
          width: '400px'
        }}
      >
        <Fabric>
          <this.ColorSuggestions
            showRemoveButtons={true}
            suggestions={Object.keys(this.state.colors).map(key =>
              makeColorIntoSuggestion(this.state.colors[key])
            )}
            onSuggestionClick={(_: any, color: Color) => {
              alert(`clicked ${color.name}`);
            }}
            onRenderNoResultFound={NoResultFound}
            onRenderSuggestion={ColorSuggestionItem}
            // TODO (ajective-object) update this once I fix the Suggestions
            // typedef for onSuggestionRemove.
            onSuggestionRemove={(_ev?: any, removedColor?: any, _index?: any) =>
              removedColor && this.removeColor(removedColor as Color)
            }
          />
        </Fabric>
      </div>
    );
  }
}

storiesOf('Suggestions', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testRoot' })
        .hover('#color-C0FFEE')
        .snapshot('Hovering over a wide suggestion element', { cropTo: '.testRoot' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Suggestions', () => <SimpleSuggestionsExample />);
