import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Username').fill(username);

    await this.page.getByPlaceholder('Password').fill(password);

    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
