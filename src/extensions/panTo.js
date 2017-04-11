import { manipulatorExtensionGenerator } from '../generators/manipulationExtension';
import {
  commaDelimitedStringToArray,
  commaDelimitedStringToArrayLikeString,
} from '../../utils/parseCommaDelimitedString';
import {generateObjectString} from '../../utils/generateObjectString';

export const panTo = manipulatorExtensionGenerator(
  'panTo',
  [
    {
      function: commaDelimitedStringToArrayLikeString,
      optional: false,
    },
    {
      function: input => {
        const arr = commaDelimitedStringToArray(input);
        if (arr.length === 0) return ''; // Just stick with defaults if no resets
        const toReturn = {};
        if (arr.indexOf('highlighted') > -1) {
          toReturn.highlighted = true;
        }
        if (arr.indexOf('hidden') > -1) {
          toReturn.hidden = true;
        }
        if (arr.indexOf('panZoom') > -1) {
          toReturn.panZoom = true;
        }
        return generateObjectString(toReturn);
      },
      optional: true,
    },
  ]
);
