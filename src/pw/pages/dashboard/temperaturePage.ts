import {Page} from "@playwright/test";
import {SliderPage} from "./sliderPage";

export class TemperaturePage extends SliderPage {
  constructor(page: Page) {
    super(
      page, {
        valueLocatorCss: '.slider-value-container .value.temperature',
        draggerIndex: 0,
        sliderIndex: 0,
        errorMessageField: 'Temperature'
      }
    );
  }

  async setTemperature(temperature: number): Promise<void> {
    await this.setValue(temperature);
  }

  async checkTemperature(temperature: number): Promise<void> {
    await this.checkValue(temperature);
  }
}
