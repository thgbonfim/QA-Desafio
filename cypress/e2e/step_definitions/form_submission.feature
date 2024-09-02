Feature: Form Submission on DemoQA

  As a user, I want to fill out and submit the Practice Form on the DemoQA website
  so that I can ensure that the form submission process works correctly.

  Scenario: Successful form submission with random values
    Given the user navigates to the practice form
    When the user fills out the form with random values
    And the user submits the form
    Then a confirmation popup should appear
    And the user closes the popup
