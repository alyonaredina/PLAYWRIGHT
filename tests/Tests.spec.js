import { test, expect } from '@playwright/test';
const {chromium} = require("playwright");
const {email} = require("../user");
const {password} = require("../user");
const {passwordError} = require("../user");



test('Successful validation', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: false
  });
  
  const page = await browser.newPage();   
  await page.goto('https://netology.ru/');

  await page.getByRole('link', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').click();  
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();

  await page.goto('https://netology.ru/profile/9073434');

  const locator = page.locator('.src-components-pages-Profile-Programs--title--Kw5NH');
  await expect(locator).toHaveText('Моё обучение'); 
  await browser.close(); 
}, 5000);



test('Invalid password', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: false
  });
  
  const page = await browser.newPage();   
  await page.goto('https://netology.ru/');

  await page.getByRole('link', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').click();  
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(passwordError);
  await page.getByTestId('login-submit-btn').click();

  const locator = page.locator('.hint_hint__bpsEa.inputHint');
  await expect(locator).toHaveText('Вы ввели неправильно логин или пароль.');  
  await browser.close(); 
}, 5000);



// npm run test
// npx playwright show-report