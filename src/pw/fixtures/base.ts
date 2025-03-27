import {test as base, expect} from "@playwright/test"
import {TemperaturePage} from "../pages/dashboard/temperaturePage";
import {HumidityPage} from "../pages/dashboard/humidityPage";

type MyFixtures = {
  temperaturePage: TemperaturePage,
  humidityPage: HumidityPage,
}

export const test = base.extend<MyFixtures>({
  temperaturePage: async ({page}, use) => {
    await page.goto('');
    await expect(page).toHaveTitle("playwright-test-admin Demo Application");
    await use(new TemperaturePage(page))
  },

  humidityPage: async ({page}, use) => {
    await page.goto('');
    await expect(page).toHaveTitle("playwright-test-admin Demo Application");
    await page.getByText('Humidity').click()
    await use(new HumidityPage(page))
  },
})

export {expect} from "@playwright/test"
