import {expect, Locator, Page} from "@playwright/test";
import {getSliderClickPosition} from "../../utils/sliderHelper";
import {BoundariesGetter} from "../../utils/types";

export class HumidityPage {

  private readonly humidityLocator: Locator;
  private readonly dragger: Locator;
  private readonly slider: Locator;

  constructor(private readonly page: Page) {
    this.humidityLocator = this.page.locator('.slider-value-container .value.humidity');
    this.dragger = this.page.locator('ngx-temperature-dragger').nth(1);
    this.slider = this.page.locator('ngx-temperature-dragger svg').nth(2);
  }

  async setHumidity(humidity: number) {
    await this.validateHumidity(humidity);
    const sliderClickPosition = await getSliderClickPosition(this.slider, humidity, this.getHumidityBoundaries());
    await this.page.mouse.click(sliderClickPosition.clickX, sliderClickPosition.clickY);
  }

  async checkHumidity(humidity: number) {
    await expect(async () => {
      await expect(this.humidityLocator).toContainText(humidity.toString());
    }).toPass();
  }

  private async validateHumidity(value: number) {
    const {min, max} = await this.getHumidityBoundaries()();

    if (!Number.isInteger(value)) {
      throw new Error(`humidity must be an integer (e.g. 18), but received: ${value}`);
    }

    if (value < min || value > max) {
      throw new Error(`humidity must be between ${min} and ${max}, but received: ${value}`);
    }
  }

  private getHumidityBoundaries(): BoundariesGetter {
    return async () => {
      const min = Number(await this.dragger.getAttribute('ng-reflect-min'));
      const max = Number(await this.dragger.getAttribute('ng-reflect-max'));
      return {min, max};
    };
  }

}
