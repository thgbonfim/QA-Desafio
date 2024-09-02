class HomePageSort {
    visit() {
      cy.visit('https://demoqa.com/');
    }
  
    navigateToInteractions() {
      cy.contains('Interactions').click();
    }
  }
  
  export default new HomePageSort();
  