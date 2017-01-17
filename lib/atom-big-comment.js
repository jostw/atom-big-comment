'use babel';

import { CompositeDisposable } from 'atom';
import shape from './atom-big-comment-shape';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-big-comment:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    const editor = atom.workspace.getActiveTextEditor();

    if (editor) {
      const selection = editor.getSelectedText().toLowerCase();

      if (selection) {
        let comments = [];

        selection.split('\n').forEach(line => {
          let commentLines = [];

          line.split('').map(this.convert).forEach(commentLine => {
            commentLine.forEach((comment, index) => {
              commentLines[index] = commentLines[index] ?
                `${commentLines[index]} ${comment}` : comment;
            });
          });

          comments = [...comments, '', ...commentLines];
        });

        editor.insertText([...comments, ''].join('\n'));
      }
    }
  },

  convert(char) {
    const charShapeLines = shape[char];

    if (!charShapeLines) {
      return [];
    }

    return charShapeLines.map(charShapeLine => {
      let commentLine = '';

      charShapeLine.forEach((charShape, index) => {
        for (let i = 0; i < charShape; i++) {
          if (index % 2 === 1) {
            commentLine += '#';
          } else {
            commentLine += ' ';
          }
        }
      });

      return commentLine;
    });
  }

};
