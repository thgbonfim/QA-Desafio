import { faker } from '@faker-js/faker';
import 'cypress-file-upload';

class FormsPage {

  visit() {
    cy.visit('https://demoqa.com/automation-practice-form');
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
      });
  
  
  }

  goToPracticeForm() {
    cy.contains('Forms').click(); // Clica na opção 'Forms'
    cy.contains('Practice Form').click(); // Clica no submenu 'Practice Form'
  }

  fillForm() {
    // Gerar dados aleatórios usando Faker
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userEmail = faker.internet.email();
    const userNumber = faker.phone.number('##########'); // Gera um número de telefone de 10 dígitos
    const birthDate = faker.date.birthdate({ min: 1990, max: 2005, mode: 'date' });
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth(); // 0-based index
    const birthDay = birthDate.getDate();
    const subjects = 'Maths'; // Usar um valor fixo ou modificar para usar faker se necessário
    const currentAddress = faker.address.streetAddress();
    
    // Preencher os campos do formulário
    this.fillPersonalInfo(firstName, lastName, userEmail, userNumber);
    this.fillDateOfBirth(birthYear, birthMonth, birthDay);
    this.fillSubjects(subjects);
    this.selectHobbies();
    this.uploadPicture();
    this.fillAddress(currentAddress);
    this.selectStateAndCity('NCR', 'Delhi'); // Exemplo de chamada com valores
  }

  fillPersonalInfo(firstName, lastName, userEmail, userNumber) {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(userEmail);
 // Verifica se o rádio com valor "Male" está presente e o seleciona
cy.get('input[name="gender"]').each(($el) => {
  if ($el.attr('value') === 'Male') {
    cy.wrap($el).check({ force: true }); // Força a seleção, se necessário
  }
});

    cy.get('#userNumber').type(userNumber);
  }

  fillDateOfBirth(year, month, day) {
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select(year.toString());
    cy.get('.react-datepicker__month-select').select(month + 1); // Mês é 0-based, ajusta para 1-based
    cy.get('.react-datepicker__day')
      .contains(day)
      .should('be.visible')
      .then((element) => {
        console.log('Element found:', element);
      });
  }
  
  

  fillSubjects(subjects) {
    cy.get('#subjectsInput').type(`${subjects}{enter}`, { force: true });
  }

  selectHobbies() {
    cy.get('input[type="checkbox"][value="1"]').check({ force: true }); // Seleciona o primeiro hobby
  }

  uploadPicture() {
    cy.get('#uploadPicture').attachFile('files/testFile.txt'); // Faz upload de um arquivo
  }

  fillAddress(address) {
    cy.get('#currentAddress').type(address);
  }

  selectStateAndCity(state, city) {

// Verifique se o estado "NCR" está selecionado primeiro
cy.get('#react-select-3-input').click({ force: true });
cy.get('#react-select-3-input').type('NCR', { force: true });
cy.contains('.css-1n7v3ny-option', 'NCR').click({ force: true });

// Clique no campo de input para abrir o dropdown de cidade
cy.get('#react-select-4-input').click({ force: true });

// Digite "Delhi" no campo de input de cidade
cy.get('#react-select-4-input').type('Delhi', { force: true });

// Aguarde e clique na opção "Delhi" na lista de sugestões
cy.contains('.css-1n7v3ny-option', 'Delhi').click({ force: true });


  }
  
  
  

  submitForm() {
    cy.get('#submit').click(); // Envia o formulário
    cy.wait(1000)
  }

  closePopup() {



 // Esperar pelo modal e depois fechá-lo com força
 cy.get('#closeLargeModal').click({ force: true });

 // Verifique se o modal foi fechado (opcional)
 cy.get('#closeLargeModal').should('not.be.visible');


  }
}

export default FormsPage;
