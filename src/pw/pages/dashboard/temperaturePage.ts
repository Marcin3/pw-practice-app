import {expect, Locator, Page} from "@playwright/test";
import {getSliderClickPosition} from "../../utils/sliderHelper";
import {BoundariesGetter} from "../../utils/types";

export class TemperaturePage {

  private readonly temperatureLocator: Locator;
  private readonly dragger: Locator;
  private readonly slider: Locator;

  constructor(private readonly page: Page) {
    this.temperatureLocator = this.page.locator('.slider-value-container .value.temperature');
    this.dragger = this.page.locator('ngx-temperature-dragger').first();
    this.slider = this.page.locator('ngx-temperature-dragger svg').nth(0);
  }

  async setTemperature(temperature: number) {
    await this.validateTemperature(temperature);
    const sliderClickPosition = await getSliderClickPosition(this.slider, temperature, this.getTemperatureBoundaries());
    await this.page.mouse.click(sliderClickPosition.clickX, sliderClickPosition.clickY);
  }

  async checkTemperature(temperature: number) {
    await expect(async () => {
      await expect(this.temperatureLocator).toContainText(temperature.toString());
    }).toPass();
  }

  private async validateTemperature(value: number) {
    const {min, max} = await this.getTemperatureBoundaries()();

    if (!Number.isInteger(value)) {
      throw new Error(`Temperature must be an integer (e.g. 18), but received: ${value}`);
    }

    if (value < min || value > max) {
      throw new Error(`Temperature must be between ${min} and ${max}, but received: ${value}`);
    }
  }

  private getTemperatureBoundaries(): BoundariesGetter {
    return async () => {
      const min = Number(await this.dragger.getAttribute('ng-reflect-min'));
      const max = Number(await this.dragger.getAttribute('ng-reflect-max'));
      return {min, max};
    };
  }

}
