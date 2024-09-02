import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import ProgressBarPage from '../../support/page_objects/ProgressBarPage';
import HomePageProgress from '../../support/page_objects/HomePageProgress';


Given('I am on the DemoQA homepage', () => {
    HomePageProgress.visit();
});

When('I navigate to Widgets and click on Progress Bar', () => {
    HomePageProgress.navigateToWidgets();
  ProgressBarPage.clickProgressBar();
});

When('I click the Start button', () => {
  ProgressBarPage.clickStartButton();
});

Then('I stop the progress bar before it reaches 25%', () => {
  ProgressBarPage.stopBefore25Percent();
});

Then('I validate the progress bar value is less than or equal to 25%', () => {
  ProgressBarPage.validateProgressLessOrEqual25Percent();
});

When('I wait for the progress bar to reach 100%', () => {
  ProgressBarPage.waitForCompletion();
});

Then('I reset the progress bar', () => {
  ProgressBarPage.resetProgressBar();
});
