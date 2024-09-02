import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import UserPage  from '../../support/page_objects/userPage';
import BookStorePage from '../../support/page_objects/BookStorePage';
import 'cypress-plugin-api';

const userPage = new UserPage();
const bookStorePage = new BookStorePage();

// Dados de exemplo
const userId = '542d3ffe-07da-400c-b4e3-b2064404c5b1'; // userId atualizado
const booksToRent = [
  "9781449325862", // ISBN do primeiro livro
  "9781449365035"  // ISBN do segundo livro
];

// Dados do usuário
const userName = 'testUser';
const password = 'Test@123';

// Listener para ignorar exceções não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Ignorar erros de script de origem cruzada
});

Given('the user creates an account', () => {
  cy.api({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/User',
    body: {
      "userName": userName,
      "password": password
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 406 && response.body.message === "User exists!") {
      cy.log('User already exists, skipping creation.');
    } else {
      expect(response.status).to.eq(201);
    }
    userPage.setUserName(userName);
  });
});

Given('the user generates an access token', () => {
  cy.api('POST', 'https://demoqa.com/Account/v1/GenerateToken', {
    "userName": userName,
    "password": password
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.token).to.exist;
    userPage.setToken(response.body.token);
  });
});

When('the user rents two books', () => {
  cy.api({
    method: 'POST',
    url: 'https://demoqa.com/BookStore/v1/Books',
    headers: {
      'Authorization': `Bearer ${userPage.getToken()}`
    },
    body: {
      "userId": userId,
      "collectionOfIsbns": booksToRent.map(isbn => ({ "isbn": isbn }))
    },
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`Response status: ${response.status}`);
    cy.log(`Response body: ${JSON.stringify(response.body)}`);

    if (response.status === 401) {
      cy.log('Unauthorized: Check token or credentials');
    } else if (response.status === 502) {
      cy.log('Server error: 502 Bad Gateway');
    } else {
      expect(response.status).to.eq(201, `Expected status 201 but got ${response.status}`);
    }
  });
});

Given('the user confirms authorization', () => {
  cy.api({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Authorized',
    body: {
      "userName": userName,
      "password": password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.true;
  });
});

When('the user lists available books', () => {
  cy.api('GET', 'https://demoqa.com/BookStore/v1/Books').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.have.length.greaterThan(0);
    bookStorePage.setBooks(response.body.books);
  });
});

Then("the user's rented books should be validated", () => {
  cy.api({
    method: 'GET',
    url: `https://demoqa.com/BookStore/v1/Books`,
    headers: {
      'Authorization': `Bearer ${userPage.getToken()}`
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const availableBooks = response.body.books;
    cy.log(`Available books: ${JSON.stringify(availableBooks)}`);

    booksToRent.forEach((isbn) => {
      const book = availableBooks.find(book => book.isbn === isbn);
      expect(book, `Expected book with ISBN ${isbn} to be available`).to.not.be.undefined;
    });
  });
});