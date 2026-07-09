import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/ingredients', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            },
            {
              _id: '643d69a5c3f7b9001cfa0941',
              name: 'Биокотлета из марсианской Магнолии',
              type: 'main',
              price: 424,
              image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            },
          ],
        }),
      });
    });

    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.com', name: 'Test User' },
        }),
      });
    });

    await page.route('**/api/orders', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            order: { number: 12345 },
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      document.cookie = 'accessToken=mock-access-token; path=/';
    });

    await page.goto('/');
    await page.waitForSelector('text=Краторная булка N-200i');
  });

  test('Добавление ингредиентов в конструктор', async ({ page }) => {
    const bunCard = page.locator('li:has-text("Краторная булка N-200i")');
    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    await expect(page.getByText('Краторная булка N-200i (низ)')).toBeVisible();

    const mainCard = page.locator('li:has-text("Биокотлета из марсианской Магнолии")');
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    const ingredientInConstructor = page.locator('.constructor-element__text:has-text("Биокотлета из марсианской Магнолии")');
    await expect(ingredientInConstructor).toBeVisible({ timeout: 5000 });
  });

  test('Открытие и закрытие модального окна ингредиента', async ({ page }) => {
    const ingredientCard = page.locator('li:has-text("Краторная булка N-200i")');
    await ingredientCard.locator('a').click({ force: true });

    const modal = page.locator('#modals');
    await expect(modal.getByText('Краторная булка N-200i')).toBeVisible({ timeout: 5000 });

    await modal.locator('button').first().click();
    await expect(modal.getByText('Краторная булка N-200i')).not.toBeVisible({ timeout: 5000 });
  });

  test('Создание заказа', async ({ page }) => {
    await page.locator('li:has-text("Краторная булка N-200i")').getByRole('button', { name: 'Добавить' }).click();
    await page.locator('li:has-text("Биокотлета из марсианской Магнолии")').getByRole('button', { name: 'Добавить' }).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.locator('#modals');
    await expect(modal.getByText('12345')).toBeVisible({ timeout: 10000 });

    await expect(page.getByText('Краторная булка N-200i (верх)')).not.toBeVisible();
    await expect(page.getByText('Краторная булка N-200i (низ)')).not.toBeVisible();
    await expect(page.locator('.constructor-element__text:has-text("Биокотлета из марсианской Магнолии")')).not.toBeVisible();

    await modal.locator('button').first().click();
    await expect(modal.getByText('12345')).not.toBeVisible({ timeout: 5000 });
  });
});