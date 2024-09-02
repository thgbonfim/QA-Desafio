import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../support/page_objects/HomePage';
import BrowserWindowsPage from '../../support/page_objects/BrowserWindowsPage';
Given('I am on the DemoQA homepage', () => {
  HomePage.visit();
});

When('I navigate to Alerts, Frame & Windows and click on Browser Windows', () => {
  HomePage.navigateToAlertsFrameWindows();
  BrowserWindowsPage.clickBrowserWindows();
});

When('I click on the button to open a new window', () => {
  BrowserWindowsPage.clickNewWindowButton();
});

Then('a new window should open with a message saying "This is a sample page"', () => {
  BrowserWindowsPage.validateNewWindowMessage();
});

Then('I close the newly opened window', () => {
  BrowserWindowsPage.closeNewWindow();
});
