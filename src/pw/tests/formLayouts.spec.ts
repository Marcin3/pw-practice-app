import {test} from '../fixtures/base';
import {User} from "../utils/types";

test("Form Layouts", async ({formLayoutPage}) => {
  const user: User = {
    firstName: "John",
    lastName: "Smith",
    email: "user@example.com",
    website: "www.example.com",
  }
  await formLayoutPage.setUserData(user);
  await formLayoutPage.clickSubmit();
})
