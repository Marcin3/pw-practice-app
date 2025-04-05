import {Locator, Page} from "@playwright/test";
import {User} from "../../../utils/types";

export class FormLayoutPage {

  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly website: Locator;
  private readonly submit: Locator;

  constructor(private readonly page: Page) {
    this.firstName = this.page.getByLabel('First Name');
    this.lastName = this.page.getByLabel('Last Name');
    this.email = this.page.locator('nb-card:has(nb-card-header:text("Block form")) #inputEmail');
    this.website = this.page.getByLabel('Website');
    this.submit = this.page.locator('nb-card:has(nb-card-header:text("Block form")) button:has-text("Submit")');
  }

  async setUserData(user : User) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.website.fill(user.website);
  }

  async clickSubmit() {
    await this.submit.click();
  }

  // TODO async validateThatSubmit
}
