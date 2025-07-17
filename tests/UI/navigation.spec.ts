import { test, expect } from '../fixtures';
import { allure } from 'allure-playwright';

test.describe('Sweep 1 – Navigation & Event Handling', () => {

  test.beforeEach(async ({ homePage }) => {
    await allure.step('Navigate to homepage', async () => {
      await homePage.goto();
    });
  });

  test('Rooms button clickable', async ({ homePage }) => {
    await allure.step('Click "Rooms" nav link and expect scroll', async () => {
      await homePage.clickNavLinkAndExpectScroll(0);
    });
  });

  test('Booking button clickable', async ({ homePage }) => {
    await allure.step('Click "Booking" nav link and expect scroll', async () => {
      await homePage.clickNavLinkAndExpectScroll(1);
    });
  });

  test('Amenities button clickable', async ({ homePage }) => {
    await allure.step('Click "Amenities" nav link and expect scroll', async () => {
      await homePage.clickNavLinkAndExpectScroll(2);
    });
  });

  test('Location button clickable', async ({ homePage }) => {
    await allure.step('Click "Location" nav link and expect scroll', async () => {
      await homePage.clickNavLinkAndExpectScroll(3);
    });
  });

  test('Contact button clickable', async ({ homePage }) => {
    await allure.step('Click "Contact" nav link and expect scroll', async () => {
      await homePage.clickNavLinkAndExpectScroll(4);
    });
  });

  test('Admin button clickable', async ({ homePage }) => {
    await allure.step('Click "Admin" nav link and expect URL change', async () => {
      await homePage.clickNavLinkAndExpectURL(5, 'admin');
    });
  });

});
