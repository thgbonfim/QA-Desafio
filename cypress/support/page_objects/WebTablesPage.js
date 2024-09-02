class WebTablesPage {
  constructor() {
    this.selectors = {
      webTablesMenuItem: '#item-3', // Exemplo de seletor para o item de menu "Web Tables"
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
      editButton: '.action-buttons span[title="Edit"]'
    };
  }

  clickWebTables() {
    cy.get(this.selectors.webTablesMenuItem).click();
  }

  clickAddButton() {
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
    cy.get(this.selectors.rows).should((rows) => {
      const matchedRow = [...rows].find(row => row.innerText.includes(email));
      if (shouldExist) {
        expect(matchedRow).to.exist;
      } else {
        expect(matchedRow).to.not.exist;
      }
    });
  }

  editRecord(email, newDetails) {
    cy.get(this.selectors.rows).contains(email).parents('.rt-tr-group').within(() => {
      cy.get(this.selectors.editButton).click();
    });
    this.fillForm(newDetails);
    this.submitForm();
  }

  deleteRecord(email) {
    cy.get(this.selectors.rows).contains(email).parents('.rt-tr-group').within(() => {
      cy.get(this.selectors.deleteButton).click();
    });
  }

  createMultipleRecords(records) {
    records.forEach((record) => {
      this.clickAddButton();
      this.fillForm(record);
      this.submitForm();
    });
  }

  deleteAllRecords() {
    cy.get(this.selectors.deleteButton).each(($btn) => {
      cy.wrap($btn).click();
    });
  }
}

export default new WebTablesPage();
