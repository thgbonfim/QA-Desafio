class HomePage {
    visit() {
      cy.visit('https://demoqa.com/');
    }
  
    navigateToAlertsFrameWindows() {
      cy.contains('Alerts, Frame & Windows').click();
    }
  }
  
  export default new HomePage();
  