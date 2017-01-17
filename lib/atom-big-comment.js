'use babel';

import AtomBigCommentView from './atom-big-comment-view';
import { CompositeDisposable } from 'atom';

export default {

  atomBigCommentView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomBigCommentView = new AtomBigCommentView(state.atomBigCommentViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomBigCommentView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-big-comment:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomBigCommentView.destroy();
  },

  serialize() {
    return {
      atomBigCommentViewState: this.atomBigCommentView.serialize()
    };
  },

  toggle() {
    console.log('AtomBigComment was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
