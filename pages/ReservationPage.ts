import { Page, Locator, expect } from '@playwright/test';
import logger from '../logger'; // עדכן את הנתיב לפי המיקום בפועל

export class ReservationPage {
  readonly page: Page;

  // Form buttons and fields
  readonly reservationButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reservationButton = page.locator('#doReservation');
    this.firstNameInput = page.locator("input[name='firstname']");
    this.lastNameInput = page.locator("input[aria-label='Lastname']");
    this.emailInput = page.locator("input[name='email']");
    this.phoneInput = page.locator("input[placeholder='Phone']");
    this.saveButton = page.locator("//button[normalize-space(text())='Reserve Now']");
    this.confirmationHeader = page.locator("//h2[normalize-space(text())='Booking Confirmed']");
  }

  // Fills and submits the reservation form
  async completeReservationFlow() {
    logger.info('Starting reservation flow...');
    await this.reservationButton.click();
    logger.info('Reservation form opened.');

    await this.firstNameInput.fill('John');
    logger.info('Filled first name.');

    await this.lastNameInput.fill('Doe');
    logger.info('Filled last name.');

    await this.emailInput.fill('john.doe@example.com');
    logger.info('Filled email.');

    await this.phoneInput.fill('972542525765');
    logger.info('Filled phone.');

    await this.saveButton.click();
    logger.info('Clicked Reserve Now button.');
  }

  // Asserts the confirmation message
  async expectReservationSuccess() {
    await expect(this.confirmationHeader).toBeVisible();
    logger.info('Reservation confirmed successfully.');
  }
}
