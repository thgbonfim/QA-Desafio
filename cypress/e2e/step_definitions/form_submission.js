import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import FormsPage from '../../support/page_objects/FormsPage';

const formsPage = new FormsPage();

// Gera valores aleatórios para os campos do formulário
const randomData = {
  firstName: 'John',
  lastName: 'Doe',
  userEmail: 'john.doe@example.com',
  userNumber: '1234567890',
  birthYear: '1990',
  birthMonth: 'May',
  birthDay: '15',
  subjects: 'Math',
  currentAddress: '123 Main St'
};

Given('the user navigates to the practice form', () => {
  formsPage.visit();
  formsPage.goToPracticeForm();
});

When('the user fills out the form with random values', () => {
  formsPage.fillForm(randomData);
});

When('the user submits the form', () => {
  formsPage.submitForm();
});

Then('a confirmation popup should appear', () => {
  cy.get('.modal-content').should('be.visible'); // Verifica se o popup está visível
});

Then('the user closes the popup', () => {
  formsPage.closePopup();
});
