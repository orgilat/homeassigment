import { test, expect } from '../fixtures';
import { allure } from 'allure-playwright';

test.describe('Sweep 2 – Contact Form Submission', () => {

  test.beforeEach(async ({ homePage }) => {
    await allure.step('Navigate to homepage', async () => {
      await homePage.goto();
    });
  });

  test('Submit with invalid phone (10 digits)', async ({ homePage }) => {
    await allure.step('Fill form with valid data except short phone', async () => {
      await homePage.fillFormWithValidDataExceptPhone('1234567890');
    });

    await allure.step('Assert phone error message appears', async () => {
      await homePage.expectErrors(['Phone must be between 11 and 21 characters.']);
    });
  });

  test('Submit with valid phone (11 digits)', async ({ homePage }) => {
    await allure.step('Fill form with valid phone number', async () => {
      await homePage.fillFormWithValidDataExceptPhone('12345678901');
    });

    await allure.step('Assert success message appears', async () => {
      await homePage.expectSuccessMessage();
    });
  });

  test('Submit with invalid email', async ({ homePage }) => {
    await allure.step('Fill form with invalid email format', async () => {
      await homePage.fillFormWithValidDataExceptEmail('invalid-email');
    });

    await allure.step('Assert email validation error appears', async () => {
      await homePage.expectErrors(['must be a well-formed email address']);
    });
  });

  test('Submit with short subject (<5 chars)', async ({ homePage }) => {
    await allure.step('Fill form with short subject', async () => {
      await homePage.fillFormWithValidDataExceptSubject('abc');
    });

    await allure.step('Assert subject validation error appears', async () => {
      await homePage.expectErrors(['Subject must be between 5 and 100 characters.']);
    });
  });

  test('Submit with short message (<20 chars)', async ({ homePage }) => {
    await allure.step('Fill form with short message', async () => {
      await homePage.fillFormWithValidDataExceptMessage('short');
    });

    await allure.step('Assert message validation error appears', async () => {
      await homePage.expectErrors(['Message must be between 20 and 2000 characters.']);
    });
  });

  test('Submit with fully valid data', async ({ homePage }) => {
    await allure.step('Fill form with all valid values', async () => {
      await homePage.fillFormWithAllValidData();
    });

    await allure.step('Assert success message appears', async () => {
      await homePage.expectSuccessMessage();
    });
  });

});
