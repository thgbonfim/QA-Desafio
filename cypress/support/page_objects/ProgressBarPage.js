class ProgressBarPage {
    clickProgressBar() {
      cy.contains('Progress Bar').click();
    }
  
    clickStartButton() {
      cy.get('#startStopButton').click();
    }
  
    stopBefore25Percent() {
      // Continuously check the value of the progress bar until it's just above 25%
      cy.get('#progressBar').invoke('attr', 'aria-valuenow').then((value) => {
        const progressValue = parseInt(value);
        if (progressValue < 25) {
          cy.wait(100); // Small delay to prevent excessive checks
          this.stopBefore25Percent(); // Recursive call to keep checking
        } else {
          cy.get('#startStopButton').click(); // Stop the progress bar
        }
      });
    }
  
    validateProgressLessOrEqual25Percent() {
      cy.get('#progressBar').invoke('attr', 'aria-valuenow').should('be.lte', 25);
    }
  
    waitForCompletion() {
      cy.get('#progressBar').invoke('attr', 'aria-valuenow').should('eq', '100');
    }
  
    resetProgressBar() {
      cy.get('#resetButton').click();
    }
  }
  
  export default new ProgressBarPage();
  