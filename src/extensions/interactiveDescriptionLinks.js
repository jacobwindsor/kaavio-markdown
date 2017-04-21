// Captures something like K[some text](action)
// The 'some text' is the first capturing group and the 'action' is the second
const mainRe = new RegExp('K\\[((?:\\[[^\\]]*|[^\\[\\]])*)\\]\\([ \\t]*(.*)[ \\t]*\\)', 'g');

// Array of all the regexes to peform on the 'action' capturing group of the mainRe
let actionRegexes = [
  {
    // Matches zoomOn('aword') or zoomOn(['aword','a word'])
    // The only capture group is what's inside the brackets
    name: 'zoomOn',
    regexStr: '(?:zoomOn\\((?:((?:\'\\w+\')|(?:\\[[\\w \\t\',]+\\])))[ \\t]*\\))',
  },
  {
    // hide('aword')
    // One capture group
    name: 'hide',
    regexStr: '(?:hide\\((?:((?:\'\\w+\')))[ \\t]*\\))',
  },
  {
    // highlightOn('aword1', 'aword2')
    // Two capture groups
    name: 'highlightOn',
    regexStr: '(?:highlightOn\\((?:((?:\'\\w+\')))[ \\t]*,[ \\t]*(?:((?:\'\\w+\')))[ \\t]*\\))',
  },
];

// Many of the regexes are similiar except for the action name.
// Just replace the corresponding part and push it onto the array.
actionRegexes = actionRegexes.concat([
  {
    name: 'panTo',
    regexStr: actionRegexes.find(re => re.name === 'zoomOn').regexStr.replace('zoomOn', 'panTo'),
  },
  {
    name: 'show',
    regexStr: actionRegexes.find(re => re.name === 'hide').regexStr.replace('hide', 'show'),
  },
  {
    name: 'highlightOff',
    regexStr: actionRegexes.find(re => re.name === 'hide').regexStr.replace('hide', 'highlightOff'),
  },
  {
    name: 'toggleHighlight',
    regexStr: actionRegexes.find(re => re.name === 'highlightOn')
      .regexStr.replace('highlightOn', 'toggleHighlight'),
  },
]).map(elem => {
  const name = elem.name;
  return {
    name,
    regex: new RegExp(elem.regexStr, 'g'),
  };
});

export const interactiveDescriptionLinks = {
  type: 'lang',
  filter: text =>
    // Pass through the mainRe to extract the text and the action
    text.replace(mainRe, (mainMatch, innerText, action) => {
      // First process the actions of those with two capture groups
      // Returns e.g. [`highlightOn('node1','red')`,...]
      const twoGroups = actionRegexes
        .filter(elem => ['toggleHighlight', 'highlightOn'].indexOf(elem.name) > -1)
        .filter(elem => action.match(elem.regex))
        .map(elem => action.replace(elem.regex, (match, p1, p2) => `${elem.name}(${p1},${p2})`));

      // Now do those with one capture group
      // Returns e.g. [`zoomOn('node1')`,...]
      const oneGroup = actionRegexes
        .filter(elem => ['zoomOn', 'panTo', 'hide', 'show', 'highlightOff'].indexOf(elem.name) > -1)
        .filter(elem => action.match(elem.regex))
        .map(elem => action.replace(elem.regex, (match, p1) => `${elem.name}(${p1})`));

      // Gives e.g. `toggleHighlight('node1','red').zoomOn('node')`
      const fullAction = twoGroups.concat(oneGroup).join('.');

      // Render the full interactive Kaavio link
      // Reset Kaavio before so each link is "self describing"
      return `<a onclick="diagram.manipulator.reset().${fullAction}">${innerText}</a>`;
    }),
};
