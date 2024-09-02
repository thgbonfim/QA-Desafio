class HomePageProgress {
  visit() {
    cy.visit('https://demoqa.com/');
  }

  goToWidgets() {
    cy.get('.category-cards > :nth-child(4)').click(); // Altere esse seletor conforme necessário
  }
}

export default HomePageProgress;
