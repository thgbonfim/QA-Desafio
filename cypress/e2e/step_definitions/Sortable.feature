Feature: Sort items using drag and drop on DemoQA

  Scenario: Sort items in ascending order
    Given I am on the DemoQA homepage
    When I navigate to Interactions and click on Sortable
    Then I sort the items in ascending order using drag and drop
