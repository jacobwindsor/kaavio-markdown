import { manipulatorExtensionGenerator } from '../generators/manipulationExtension';
import { parseCommaDelimitedString } from '../../utils/parseCommaDelimitedString';

export const hide = manipulatorExtensionGenerator(
  'hide',
  [
    {
      function: parseCommaDelimitedString,
      optional: false,
    },
  ]
);
