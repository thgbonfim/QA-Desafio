Feature: Manage Web Tables on DemoQA

  Scenario: Create, edit, and delete a new record in Web Tables
    Given I am on the DemoQA homepage
    When I navigate to Elements and click on Web Tables
    And I create a new record with the following details:
      | firstName | lastName | age | email              | salary | department |
      | John      | Doe      | 28  | john.doe@example.com | 5000   | IT        |
    Then I should see the new record in the table
    When I edit the record to have the following details:
      | firstName | lastName  | age | email              | salary | department |
      | John      | Doe       | 30  | john.doe@example.com | 6000   | HR         |
    Then the record should be updated in the table
    When I delete the record with the email "john.doe@example.com"
    Then the record should no longer be present in the table

  Scenario: Dynamically create and delete 12 new records
    Given I am on the DemoQA homepage
    When I navigate to Elements and click on Web Tables
    And I dynamically create 12 new records
    Then I should see 12 new records in the table
    When I delete all dynamically created records
    Then there should be no dynamically created records in the table
