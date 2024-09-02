class HomePageTable {
    visit() {
      cy.visit('https://demoqa.com/');
    }
  
    navigateToElements() {
      cy.contains('Elements').click();
    }
  }
  
  export default new HomePageTable();
  