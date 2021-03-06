const smartReplace = require('../lib/smartReplace');
const helpers = require('../lib/helpers');
// create links, bold, italic in html
const doSentence = function(sentence, options = {} ) {
  let text = sentence.plaintext();
  //turn links back into links
  if (sentence.links && options.links === true) {
    sentence.links().forEach((link) => {
      let href = '';
      if (link.site) {
        //use an external link
        href = link.site;
      } else {
        //otherwise, make it a relative internal link
        href = helpers.capitalise(link.page);
        href = './' + href.replace(/ /g, '_');
      }
      let str = link.text || link.page;
      let tag = '\\href{' + href + '}{' + str + '}';
      text = smartReplace(text, str, tag);
    });
  }
  if (sentence.data.fmt) {
    if (sentence.data.fmt.bold) {
      sentence.data.fmt.bold.forEach((str) => {
        let tag = '\\textbf{' + str + '}';
        text = smartReplace(text, str, tag);
      });
    }
    if (sentence.data.fmt.italic) {
      sentence.data.fmt.italic.forEach((str) => {
        let tag = '\\textit{' + str + '}';
        text = smartReplace(text, str, tag);
      });
    }
  }
  return text;
};
module.exports = doSentence;
