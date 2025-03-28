import {Page} from "@playwright/test";
import {SliderPage} from "./sliderPage";

export class HumidityPage extends SliderPage {
  constructor(page: Page) {
    super(
      page,
      {
        valueLocatorCss: '.slider-value-container .value.humidity',
        draggerIndex: 1,
        sliderIndex: 2,
        errorMessageField: 'Humidity'
      }
    );
  }

  async setHumidity(humidity: number): Promise<void> {
    await this.setValue(humidity);
  }

  async checkHumidity(humidity: number): Promise<void> {
    await this.checkValue(humidity);
  }
}
