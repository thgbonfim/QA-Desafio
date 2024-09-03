Feature: Web Tables Management

  Scenario: Create, edit, and delete a new record in Web Tables
    Given I am on the demoqa homepage
    When I navigate to the "Web Tables" section
    And I create a new record with random details
    Then I should see the new record in the table
    When I edit the record with the newly generated email to have updated random details
    Then I should see the updated record in the table
    When I delete the record with the updated email
    Then I should not see the record in the table



  Scenario: Create and delete multiple records
    Given I am on the demoqa homepage
    When I navigate to the "Web Tables" section
    And I create 12 new records with random details
    Then I should see 12 records in the table
    When I delete all records
    Then I should see no records in the table
