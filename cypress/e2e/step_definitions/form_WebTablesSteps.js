import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import WebTablesPage from '../../support/page_objects/WebTablesPage';
import HomePageTable from '../../support/page_objects/HomePageTable';
import { faker } from '@faker-js/faker';

let recordEmail = ''; // Variável para armazenar o email do registro criado

Given('I am on the demoqa homepage', () => {
  HomePageTable.visit(); // Navega para a página inicial do DemoQA
});

When('I navigate to the "Web Tables" section', () => {
  WebTablesPage.clickWebTables(); // Clica no menu "Web Tables"
});

When('I create a new record with random details', () => {
  const record = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    email: faker.internet.email(),
    salary: faker.datatype.number({ min: 30000, max: 100000 }),
    department: faker.commerce.department(),
  };
  recordEmail = record.email; // Armazena o email para futuras validações
  WebTablesPage.clickAddButton();
  WebTablesPage.fillForm(record);
  WebTablesPage.submitForm();
  cy.wait(500); // Aguarda a inserção
});

Then('I should see the new record in the table', () => {
  WebTablesPage.validateRecordPresence(recordEmail);
});

When('I edit the record with the newly generated email to have updated random details', () => {
  const newDetails = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    email: faker.internet.email(),
    salary: faker.datatype.number({ min: 30000, max: 100000 }),
    department: faker.commerce.department(),
  };
  WebTablesPage.editRecord(recordEmail, newDetails);
  recordEmail = newDetails.email; // Atualiza o email após a edição
});

Then('I should see the updated record in the table', () => {
  WebTablesPage.validateRecordPresence(recordEmail);
});

When('I delete the record with the updated email', () => {
  WebTablesPage.deleteRecord(recordEmail);
});

Then('I should not see the record in the table', () => {
  WebTablesPage.validateRecordPresence(recordEmail, false);
});

When('I create 12 new records with random details', () => {
  const records = Array.from({ length: 9 }, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    email: faker.internet.email(),
    salary: faker.datatype.number({ min: 30000, max: 100000 }),
    department: faker.commerce.department(),
  }));
  WebTablesPage.createMultipleRecords(records);
});

Then('I should see 12 records in the table', () => {
  cy.get(WebTablesPage.selectors.rows).should('have.length', 20);
});

When('I delete all records', () => {
  WebTablesPage.deleteRecords();
});

Then('I should see no records in the table', () => {
  cy.get(WebTablesPage.selectors.rows).should('have.length', 20);
});