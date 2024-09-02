class ProgressBarPage {
  clickProgressBar() {
    cy.get('.category-cards > :nth-child(4)').click();
    cy.get(':nth-child(4) > .element-list > .menu-list > #item-4').click();
  }

  clickStartButton() {
    cy.get('#startStopButton').click();
  }

  stopAt25Percent() {
    const checkProgress = () => {
      cy.get('.progress-bar')
        .invoke('attr', 'aria-valuenow')
        .then((value) => {
          const progressValue = parseInt(value, 10);

          if (isNaN(progressValue)) {
            throw new Error(`Invalid progress value: ${value}`);
          }

          // Para imediatamente quando atinge ou ultrapassa 23%
          if (progressValue >= 24) {
            cy.get('#startStopButton').click();
          } else {
            // Continua verificando em intervalos curtos
            cy.wait(50).then(checkProgress); // Intervalo mais curto para verificações mais precisas
          }
        });
    };

    checkProgress();
  }

  validateProgressLessOrEqual25Percent() {
    cy.get('.progress-bar').invoke('attr', 'aria-valuenow').should((value) => {
      const progressValue = parseInt(value, 10);

      if (isNaN(progressValue)) {
        throw new Error(`Invalid progress value: ${value}`);
      }

      // Verifica se o valor é menor ou igual a 25
      expect(progressValue).to.be.lte(25); // <= 25 para garantir que não passe
    });
  }

  waitForCompletion() {
    const waitForProgressCompletion = () => {
      cy.get('.progress-bar')
        .invoke('attr', 'aria-valuenow')
        .then((value) => {
          const progressValue = parseInt(value, 10);

          if (isNaN(progressValue)) {
            throw new Error(`Invalid progress value: ${value}`);
          }

          if (progressValue < 100) {
            cy.wait(50).then(waitForProgressCompletion); // Espera 50ms antes de verificar novamente
          }
        });
    };

    cy.get('.progress-bar').should('be.visible'); // Verifica se está visível
    waitForProgressCompletion();
  }

  resetProgressBar() {
    cy.get('#resetButton').click();
  }
}

export default new ProgressBarPage();
