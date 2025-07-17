import { Page, Locator, expect } from '@playwright/test';
import logger from '../logger'; // Logger instance for debugging

export class HomePage {
  readonly page: Page;

  // Header navigation links
  readonly navLinks: Locator;

  // Contact form fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  // Contact form messages
  readonly errorMessages: Locator;
  readonly successMessage: Locator;

  // Booking flow buttons
  readonly checkAvailabilityButton: Locator;
  readonly bookNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navLinks = page.locator("//a[@class='nav-link']");

    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.subjectInput = page.locator('#subject');
    this.messageInput = page.locator('#description');
    this.submitButton = page.locator("//button[normalize-space(text())='Submit']");

    this.errorMessages = page.locator('.alert.alert-danger p');
    this.successMessage = page.locator("//p[normalize-space(text())='as soon as possible.']");

    this.checkAvailabilityButton = page.locator("//button[normalize-space(text())='Check Availability']");
    this.bookNowButton = page.locator("(//a[@class='btn btn-primary'])[1]");
  }

  // Navigate to homepage
  async goto() {
    logger.info('Navigating to homepage');
    await this.page.goto('https://automationintesting.online/');
  }

  // Click a nav link by index and expect page scroll to occur
  async clickNavLinkAndExpectScroll(index: number) {
    logger.info(`Clicking nav link at index ${index} and expecting scroll`);
    const link = this.navLinks.nth(index);
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
    const beforeScroll = await this.page.evaluate(() => window.scrollY);
    await link.click();
    await this.page.waitForTimeout(500);
    const afterScroll = await this.page.evaluate(() => window.scrollY);
    logger.info(`Scroll position before: ${beforeScroll}, after: ${afterScroll}`);
    expect(afterScroll).not.toBe(beforeScroll);
  }

  // Click a nav link and verify that the URL changes as expected
  async clickNavLinkAndExpectURL(index: number, expectedURLPart: string) {
    logger.info(`Clicking nav link at index ${index} and expecting URL part "${expectedURLPart}"`);
    const link = this.navLinks.nth(index);
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
    await link.click();
    await this.page.waitForURL(`**/${expectedURLPart}`);
    logger.info(`URL after click contains "${expectedURLPart}"`);
  }

  // Submit contact form without filling any fields
  async submitEmptyForm() {
    logger.info('Submitting empty contact form');
    await this.submitButton.click();
  }

  // Fill form with valid inputs except for an invalid phone number
  async fillFormWithValidDataExceptPhone(invalidPhone: string) {
    logger.info(`Filling contact form with invalid phone: ${invalidPhone}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill(invalidPhone);
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill('Valid message more than 20 characters');
    await this.submitButton.click();
  }

  // Fill form with valid inputs except for an invalid email
  async fillFormWithValidDataExceptEmail(invalidEmail: string) {
    logger.info(`Filling contact form with invalid email: ${invalidEmail}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill(invalidEmail);
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill('Valid message more than 20 characters');
    await this.submitButton.click();
  }

  // Fill form with valid inputs except for an invalid subject
  async fillFormWithValidDataExceptSubject(invalidSubject: string) {
    logger.info(`Filling contact form with invalid subject: ${invalidSubject}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill(invalidSubject);
    await this.messageInput.fill('Valid message more than 20 characters');
    await this.submitButton.click();
  }

  // Fill form with valid inputs except for an invalid message
  async fillFormWithValidDataExceptMessage(invalidMessage: string) {
    logger.info(`Filling contact form with invalid message: ${invalidMessage}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill(invalidMessage);
    await this.submitButton.click();
  }

  // Fill all fields in the contact form with valid inputs and submit
  async fillFormWithAllValidData() {
    logger.info('Filling contact form with all valid data');
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill('This is a valid message with more than 20 characters.');
    await this.submitButton.click();
  }

  // Verify that specific error messages are shown after invalid form submission
  async expectErrors(expected: string[]) {
    logger.info(`Expecting error messages: ${expected.join(', ')}`);
    for (const msg of expected) {
      await expect(this.errorMessages).toContainText(msg);
    }
  }

  // Confirm that a success message is shown after valid form submission
  async expectSuccessMessage() {
    logger.info('Expecting success message after form submission');
    await expect(this.successMessage).toBeVisible();
  }

  // Start the booking flow by checking availability and clicking "Book Now"
  async startBookingFlow() {
    logger.info('Starting booking flow');
    await this.checkAvailabilityButton.click();
    await expect(this.bookNowButton).toBeVisible();
    await this.bookNowButton.click();
    logger.info('Clicked "Book Now" button on first available room');
  }
}
