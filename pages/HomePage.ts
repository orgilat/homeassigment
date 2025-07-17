import { Page, Locator, expect } from '@playwright/test';
import logger from '../logger';  // נתיב בהתאם למיקום הקובץ

export class HomePage {
  readonly page: Page;

  // Navigation links in header
  readonly navLinks: Locator;

  // Contact form fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  // Contact form validation messages
  readonly errorMessages: Locator;
  readonly successMessage: Locator;

  // Booking flow buttons (E2E)
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

  async goto() {
    logger.info('Navigating to homepage');
    await this.page.goto('https://automationintesting.online/');
  }

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

  async clickNavLinkAndExpectURL(index: number, expectedURLPart: string) {
    logger.info(`Clicking nav link at index ${index} and expecting URL part "${expectedURLPart}"`);
    const link = this.navLinks.nth(index);
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
    await link.click();
    await this.page.waitForURL(`**/${expectedURLPart}`);
    logger.info(`URL after click contains "${expectedURLPart}"`);
  }

  async submitEmptyForm() {
    logger.info('Submitting empty contact form');
    await this.submitButton.click();
  }

  async fillFormWithValidDataExceptPhone(invalidPhone: string) {
    logger.info(`Filling contact form with invalid phone: ${invalidPhone}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill(invalidPhone);
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill('Valid message more than 20 characters');
    await this.submitButton.click();
  }

  async fillFormWithValidDataExceptEmail(invalidEmail: string) {
    logger.info(`Filling contact form with invalid email: ${invalidEmail}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill(invalidEmail);
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill('Valid message more than 20 characters');
    await this.submitButton.click();
  }

  async fillFormWithValidDataExceptSubject(invalidSubject: string) {
    logger.info(`Filling contact form with invalid subject: ${invalidSubject}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill(invalidSubject);
    await this.messageInput.fill('Valid message more than 20 characters');
    await this.submitButton.click();
  }

  async fillFormWithValidDataExceptMessage(invalidMessage: string) {
    logger.info(`Filling contact form with invalid message: ${invalidMessage}`);
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill(invalidMessage);
    await this.submitButton.click();
  }

  async fillFormWithAllValidData() {
    logger.info('Filling contact form with all valid data');
    await this.nameInput.fill('Valid Name');
    await this.emailInput.fill('valid@mail.com');
    await this.phoneInput.fill('12345678901');
    await this.subjectInput.fill('Valid Subject');
    await this.messageInput.fill('This is a valid message with more than 20 characters.');
    await this.submitButton.click();
  }

  async expectErrors(expected: string[]) {
    logger.info(`Expecting error messages: ${expected.join(', ')}`);
    for (const msg of expected) {
      await expect(this.errorMessages).toContainText(msg);
    }
  }

  async expectSuccessMessage() {
    logger.info('Expecting success message after form submission');
    await expect(this.successMessage).toBeVisible();
  }

  async startBookingFlow() {
    logger.info('Starting booking flow');
    await this.checkAvailabilityButton.click();
    await expect(this.bookNowButton).toBeVisible();
    await this.bookNowButton.click();
    logger.info('Clicked "Book Now" button on first available room');
  }
}
