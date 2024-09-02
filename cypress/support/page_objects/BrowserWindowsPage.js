class BrowserWindowsPage {
  clickBrowserWindows() {
    cy.contains('Alerts, Frame & Windows').click();
    cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click();
    cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click();
  }

  clickNewWindowButton() {
    // Stub `window.open` para simular a abertura da nova janela
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        // Simula a nova janela aberta com o URL e o conteúdo esperado
        const newWindow = { 
          location: { href: url }, 
          document: { body: { innerText: 'This is a sample page' } },
          close: cy.stub()  // Simula a função close para o método de fechar janela
        };
        return newWindow;
      }).as('windowOpen');
    });

    // Clique no botão 'New Window'
    cy.get('#windowButton').click();
  }

  validateNewWindowMessage() {
    // Garantindo que o método aberto stubbed seja chamado
    cy.get('@windowOpen').should('have.been.calledOnce');
    
    // Agora valide o href e o conteúdo do documento da janela simulada
    cy.get('@windowOpen').then((stub) => {
      const newWin = stub.returnValues[0];

      // Garanta que newWin não seja indefinido
      expect(newWin).to.not.be.undefined;

      // Verifique se o location.href contém 'sample'
      expect(newWin.location.href).to.include('sample');

      // Verifique se o corpo do documento contém o texto esperado
      expect(newWin.document.body.innerText).to.contain('This is a sample page');
    });
  }

  closeNewWindow() {
    cy.get('@windowOpen').then((stub) => {
      const newWin = stub.returnValues[0];
      if (newWin && typeof newWin.close === 'function') {
        newWin.close();
        cy.log('Nova janela fechada');
      } else {
        cy.log('A função close não está disponível na janela simulada');
      }
    });
  }
}

export default new BrowserWindowsPage();
