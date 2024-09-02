// cypress/support/page_objects/UserPage.js

class UserPage {
  constructor() {
    this.token = '';
    this.userName = '';
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setUserName(userName) {
    this.userName = userName;
  }

  getUserName() {
    return this.userName;
  }
}

export default UserPage;
