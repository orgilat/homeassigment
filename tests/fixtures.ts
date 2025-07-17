import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ReservationPage } from '../pages/ReservationPage';

type Fixtures = {
  homePage: HomePage;
  reservationPage: ReservationPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  reservationPage: async ({ page }, use) => {
    const reservationPage = new ReservationPage(page);
    await use(reservationPage);
  },
});

export { expect } from '@playwright/test';
