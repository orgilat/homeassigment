import { test, expect } from '../fixtures';
import { allure } from 'allure-playwright';

test('E2E reservation flow works correctly', async ({ homePage, reservationPage }) => {
  await allure.step('Navigate to homepage', async () => {
    await homePage.goto();
  });

  await allure.step('Start booking flow from homepage', async () => {
    await homePage.startBookingFlow(); // Includes "Check Availability" → "Book Now"
  });

  await allure.step('Fill reservation form and submit', async () => {
    await reservationPage.completeReservationFlow(); // Fill and click "Reserve Now"
  });

  await allure.step('Validate reservation success message appears', async () => {
    await reservationPage.expectReservationSuccess();
  });
});
