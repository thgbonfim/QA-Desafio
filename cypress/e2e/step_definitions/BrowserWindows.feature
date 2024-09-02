Feature: Test browser window functionalities on DemoQA

  Scenario: Open and validate new window
    Given I am on the DemoQA homepage
    When I navigate to Alerts, Frame & Windows and click on Browser Windows
    And I click on the button to open a new window
    Then a new window should open with a message saying "This is a sample page"
    And I close the newly opened window
