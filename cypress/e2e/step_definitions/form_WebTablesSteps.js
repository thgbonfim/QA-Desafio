import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import WebTablesPage from '../../support/page_objects/WebTablesPage';
import HomePageTable from '../../support/page_objects/HomePageTable';

import { faker } from '@faker-js/faker';

// Função para gerar dados dinâmicos usando Faker
function generateDynamicRecords(numberOfRecords) {
  return Array.from({ length: numberOfRecords }, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    email: faker.internet.email(),
    salary: faker.datatype.number({ min: 3000, max: 10000 }),
    department: faker.commerce.department()
  }));
}

// Gerando 12 registros dinâmicos
const dynamicRecords = generateDynamicRecords(12);

Given('I am on the DemoQA homepage', () => {
  HomePageTable.visit();
});

When('I navigate to Elements and click on Web Tables', () => {
  HomePageTable.navigateToElements();
  WebTablesPage.clickWebTables();
});

When('I create a new record with the following details:', (dataTable) => {
  const record = dataTable.hashes()[0];
  if (record) {
    WebTablesPage.clickAddButton();
    WebTablesPage.fillForm(record);
    WebTablesPage.submitForm();
  } else {
    throw new Error('No data provided to create a new record.');
  }
});

Then('I should see the new record in the table', () => {
  const email = dynamicRecords[0]?.email;
  if (email) {
    WebTablesPage.validateRecordPresence(email);
  } else {
    throw new Error('No email found for the first dynamic record.');
  }
});

When('I edit the record to have the following details:', (dataTable) => {
  const newDetails = dataTable.hashes()[0];
  const email = dynamicRecords[0]?.email;
  if (email && newDetails) {
    WebTablesPage.editRecord(email, newDetails);
  } else {
    throw new Error('Email or new details for editing the record are missing.');
  }
});

Then('the record should be updated in the table', () => {
  const email = dynamicRecords[0]?.email;
  if (email) {
    WebTablesPage.validateRecordPresence(email);
  } else {
    throw new Error('No email found for the updated dynamic record.');
  }
});

When('I delete the record with the email {string}', (email) => {
  if (email) {
    WebTablesPage.deleteRecord(email);
  } else {
    throw new Error('Email is missing for deletion.');
  }
});

Then('the record should no longer be present in the table', (email) => {
  if (email) {
    WebTablesPage.validateRecordPresence(email, false);
  } else {
    throw new Error('Email is missing to verify deletion.');
  }
});

When('I dynamically create 12 new records', () => {
  WebTablesPage.createMultipleRecords(dynamicRecords);
});

Then('I should see 12 new records in the table', () => {
  dynamicRecords.forEach(record => {
    if (record.email) {
      WebTablesPage.validateRecordPresence(record.email);
    } else {
      throw new Error('Email is missing for one of the dynamically created records.');
    }
  });
});

When('I delete all dynamically created records', () => {
  WebTablesPage.deleteAllRecords();
});

Then('there should be no dynamically created records in the table', () => {
  dynamicRecords.forEach(record => {
    if (record.email) {
      WebTablesPage.validateRecordPresence(record.email, false);
    } else {
      throw new Error('Email is missing to verify deletion of a dynamically created record.');
    }
  });
});
