Feature: Control the progress bar on DemoQA

  Scenario: Start and stop the progress bar before reaching 25%
    Given I am on the DemoQA homepage
    When I navigate to Widgets and click on Progress Bar
    And I click the Start button
    Then I stop the progress bar before it reaches 25%
    And I validate the progress bar value is less than or equal to 25%

  Scenario: Complete and reset the progress bar
    Given I am on the DemoQA homepage
    When I navigate to Widgets and click on Progress Bar
    And I click the Start button
    And I wait for the progress bar to reach 100%
    Then I reset the progress bar
