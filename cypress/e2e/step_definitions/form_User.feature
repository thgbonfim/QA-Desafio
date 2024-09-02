Feature: Book Store API

  Scenario: User creates an account, gets a token, and rents books
    Given the user creates an account
    And the user generates an access token
    And the user confirms authorization
    When the user lists available books
    And the user rents two books
    Then the user's rented books should be validated