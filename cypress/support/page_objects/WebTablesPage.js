class WebTablesPage {
  constructor() {
    this.selectors = {
      webTablesMenuItem: '#item-3',
      addButton: '#addNewRecordButton',
      firstNameInput: '#firstName',
      lastNameInput: '#lastName',
      ageInput: '#age',
      emailInput: '#userEmail',
      salaryInput: '#salary',
      departmentInput: '#department',
      submitButton: '#submit',
      rows: '.rt-tbody .rt-tr-group',
      deleteButton: '.action-buttons span[title="Delete"]',
      editButton: '.action-buttons span[title="Edit"]',
    };
  }

  clickWebTables() {
    cy.get('.category-cards > :nth-child(1)').click();
    cy.get(this.selectors.webTablesMenuItem, { timeout: 10000 }).click();
  }

  clickAddButton() {
    cy.get('select') // Seleciona o elemento <select>
  .select('20'); // Seleciona a opção com o valor '20'
    cy.get(this.selectors.addButton).click();
  }

  fillForm(record) {
    cy.get(this.selectors.firstNameInput).clear().type(record.firstName);
    cy.get(this.selectors.lastNameInput).clear().type(record.lastName);
    cy.get(this.selectors.ageInput).clear().type(record.age.toString());
    cy.get(this.selectors.emailInput).clear().type(record.email);
    cy.get(this.selectors.salaryInput).clear().type(record.salary.toString());
    cy.get(this.selectors.departmentInput).clear().type(record.department);
  }

  submitForm() {
    cy.get(this.selectors.submitButton).click();
  }

  validateRecordPresence(email, shouldExist = true) {
    cy.get(this.selectors.rows).should(($rows) => {
      const matchedRow = [...$rows].find(row => row.innerText.includes(email));
      if (shouldExist) {
        expect(matchedRow).to.exist;
      } else {
        expect(matchedRow).to.not.exist;
      }
    });
  }

  editRecord(email, newDetails) {
    cy.get(this.selectors.rows).contains(email)
      .parents('.rt-tr-group')
      .scrollIntoView() // Rola até o elemento
      .within(() => {
        cy.get(this.selectors.editButton).scrollIntoView().click();
      });
    this.fillForm(newDetails);
    this.submitForm();
  }
  
  deleteRecord(email) {
    cy.get(this.selectors.rows).contains(email)
      .parents('.rt-tr-group')
      .scrollIntoView() // Rola até o elemento
      .within(() => {
        cy.get(this.selectors.deleteButton).scrollIntoView().click();
      });
    cy.wait(500); // Aguarda o DOM atualizar após a exclusão
  }
 
  createMultipleRecords(records) {
    records.forEach((record) => {
      this.clickAddButton();
      this.fillForm(record);
      this.submitForm();
      cy.wait(500); // Espera meio segundo após cada inserção
    });
  } 
  deleteRecords(){
    cy.get('#delete-record-1 > svg').click()
    cy.get('#delete-record-2 > svg').click()
    cy.get('#delete-record-3 > svg').click()
    cy.get('#delete-record-4 > svg').click()
    cy.get('#delete-record-5 > svg').click()
    cy.get('#delete-record-6 > svg').click()
    cy.get('#delete-record-7 > svg').click()
    cy.get('#delete-record-8 > svg').click()
    cy.get('#delete-record-9 > svg').click()
    cy.get('#delete-record-10 > svg').click()
    cy.get('#delete-record-11 > svg').click()
    cy.get('#delete-record-12 > svg').click()

     }
  
}
  
export default new WebTablesPage();

