

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import HomePageSort from '../../support/page_objects/HomePageSort';
import SortablePage from '../../support/page_objects/SortablePage';

Given('I am on the DemoQA homepage', () => {
    HomePageSort.visit();
});

When('I navigate to Interactions and click on Sortable', () => {
    HomePageSort.navigateToInteractions();
  SortablePage.clickSortable();
});

Then('I sort the items in ascending order using drag and drop', () => {
  SortablePage.sortItemsAscending();
});
