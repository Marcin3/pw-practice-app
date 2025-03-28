import { expect, Locator, Page } from "@playwright/test";
import { SliderPageFields } from "../../utils/types";
import { getSliderClickPosition } from "../../utils/sliderHelper";

export abstract class SliderPage {
  protected readonly valueLocator: Locator;
  protected readonly dragger: Locator;
  protected readonly slider: Locator;
  protected readonly errorMessageField: string;

  protected constructor(readonly page: Page, valueSelector: SliderPageFields) {
    this.valueLocator = this.page.locator(valueSelector.valueLocatorCss);
    this.dragger = this.page.locator('ngx-temperature-dragger').nth(valueSelector.draggerIndex);
    this.slider = this.page.locator('ngx-temperature-dragger svg').nth(valueSelector.sliderIndex);
    this.errorMessageField = valueSelector.errorMessageField;
  }

  async setValue(value: number): Promise<void> {
    await this.validateValue(value);
    const boundaries = await this.getBoundaries();
    const { clickX, clickY } = await getSliderClickPosition(this.slider, value, boundaries);
    await this.page.mouse.click(clickX, clickY);
  }

  async checkValue(value: number): Promise<void> {
    await expect(async () => {
      await expect(this.valueLocator).toContainText(value.toString());
    }).toPass();
    await expect(this.dragger).toHaveScreenshot(`${value}-${this.errorMessageField}-dragger.png`, {
      maxDiffPixelRatio: 0.05
    });
  }

  protected async validateValue(value: number): Promise<void> {
    const { min, max } = await this.getBoundaries();

    if (!Number.isInteger(value)) {
      throw new Error(`${this.errorMessageField} must be an integer (e.g. 18), but received: ${value}`);
    }

    if (value < min || value > max) {
      throw new Error(`${this.errorMessageField} must be between ${min} and ${max}, but received: ${value}`);
    }
  }

  protected async getBoundaries(): Promise<{ min: number; max: number }> {
    const min = Number(await this.dragger.getAttribute("ng-reflect-min"));
    const max = Number(await this.dragger.getAttribute("ng-reflect-max"));
    return { min, max };
  }
}
