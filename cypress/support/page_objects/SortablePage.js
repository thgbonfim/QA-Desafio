class SortablePage {
    clickSortable() {
      cy.contains('Sortable').click();
    }
  
    sortItemsAscending() {
      // Get all list items
      cy.get('.vertical-list-container .list-group-item').then((items) => {
        // Assuming the list is random and we want to sort them in order "One" to "Six"
        const sortedItems = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  
        sortedItems.forEach((item, index) => {
          const targetIndex = index;
          const currentIndex = Cypress.$(items).index(Cypress.$(`.list-group-item:contains("${item}")`));
  
          if (currentIndex !== targetIndex) {
            // Drag the item from currentIndex to targetIndex
            cy.get('.vertical-list-container .list-group-item')
              .contains(item)
              .trigger('mousedown', { which: 1 });
  
            cy.get('.vertical-list-container .list-group-item')
              .eq(targetIndex)
              .trigger('mousemove')
              .trigger('mouseup', { force: true });
          }
        });
      });
    }
  }
  
  export default new SortablePage();
  