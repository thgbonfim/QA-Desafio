class HomePageTable {
    visit() {
      cy.visit('https://demoqa.com/');
    }
  
    navigateToWidgets() {
      cy.contains('Widgets').click();
    }
  }
  
  export default new HomePageTable();
  