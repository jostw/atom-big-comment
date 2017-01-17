'use babel';

import AtomBigComment from '../lib/atom-big-comment';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomBigComment', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-big-comment');
  });

  describe('when the atom-big-comment:toggle event is triggered', () => {
    it('should add some test', () => {
      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-big-comment:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {});
    });
  });
});
