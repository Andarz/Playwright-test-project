import { test, expect } from '@playwright/test';
import { ALL_BOOKS_LIST, DETAILS_BUTTONS, DETAILS_DESCRIPTION, LOGGED_NAVBAR, LOGIN_FORM, NAVBAR } from '../utils/locators.js';
import { BASE_URL, TEST_BOOK, TEST_URL, TEST_USER } from '../utils/constants.js';
import { ALERT } from '../utils/constants.js';
import { CREATE_FORM, REGISTER_FORM } from '../utils/locators.js';


// nav
test('Verify "All books" link is visible', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();

    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
});


test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
});


test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();

    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
});


test('Verify "All books" is visible after user login', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();

    await page.locator(NAVBAR.LOGIN_BUTTON).click();

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});


test('Verify user email is visible on logged user', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_NAVBAR.USER_EMAIL)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.ADD_BOOK)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.MY_BOOKS)).toBeVisible();
});


test('Login with valid credentials', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    //await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});


test('Login with empty credentials', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    //await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});


test('Login with empty email field', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    //await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});


test('Login with empty password field', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    //await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});


// Register page
test('Register with valid credentials', async ({ page }) => {
    await page.goto(TEST_URL.TEST_HOME_URL);
    //await page.waitForURL(TEST_URL.TEST_HOME_URL);

    await page.locator(NAVBAR.REGISTER_BUTTON).click();
    //await page.waitForURL(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill('test1@test.bg');
    await page.locator(REGISTER_FORM.PASSWORD).fill('789');
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('789');

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();

    //await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Register with empty credentials', async ({ page }) => {
    await page.goto(TEST_URL.TEST_HOME_URL);
    //await page.waitForURL(TEST_URL.TEST_HOME_URL);

    await page.locator(NAVBAR.REGISTER_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);

    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);

    // await page.locator(REGISTER_FORM.EMAIL).fill('test1@test.bg');
    // await page.locator(REGISTER_FORM.PASSWORD).fill('789');
    // await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('789');

    //await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();


    //await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    //await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
});

test('Register with empty email field', async ({ page }) => {
    await page.goto(TEST_URL.TEST_HOME_URL);
    //await page.waitForURL(TEST_URL.TEST_HOME_URL);

    await page.locator(NAVBAR.REGISTER_BUTTON).click();

    await page.locator(REGISTER_FORM.PASSWORD).fill('789');
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('789');

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);

    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);

    // await page.locator(REGISTER_FORM.EMAIL).fill('test1@test.bg');
    // await page.locator(REGISTER_FORM.PASSWORD).fill('789');
    // await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('789');

    //await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();


    //await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    //await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
});

test('Register with empty "confirm password" field', async ({ page }) => {
    await page.goto(TEST_URL.TEST_HOME_URL);
    //await page.waitForURL(TEST_URL.TEST_HOME_URL);

    await page.locator(NAVBAR.REGISTER_BUTTON).click();

    await page.locator(REGISTER_FORM.EMAIL).fill('test2@test.bg');
    await page.locator(REGISTER_FORM.PASSWORD).fill('777');
    // await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('789');

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);

    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Register with mismatched password fields', async ({ page }) => {
    await page.goto(TEST_URL.TEST_HOME_URL);
    //await page.waitForURL(TEST_URL.TEST_HOME_URL);

    await page.locator(NAVBAR.REGISTER_BUTTON).click();

    await page.locator(REGISTER_FORM.EMAIL).fill('test4@test.bg');
    await page.locator(REGISTER_FORM.PASSWORD).fill('888');
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('999');

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE_2);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);

    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});


// Add Book page
test('Add book with valid data', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
    await page.locator(CREATE_FORM.TITLE).fill(TEST_BOOK.TITLE);
    await page.locator(CREATE_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
    await page.locator(CREATE_FORM.IMAGE).fill(TEST_BOOK.IMAGE);
    await page.locator(CREATE_FORM.TYPE_SELECT).selectOption(TEST_BOOK.
        TEST_BOOK_OPTIONS.CLASSIC);
    await page.locator(CREATE_FORM.ADD_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Login to "Details" page', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(DETAILS_BUTTONS).first().click();
    await expect(page.locator(DETAILS_DESCRIPTION)).toBeVisible();
});

// All books page
test('Login and verify - all books are displayed', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const allBooksElements = await page.locator(ALL_BOOKS_LIST).count();
    expect(allBooksElements).toBeGreaterThan(0);
});

test.only('Login and verify - no books are displayed', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_NAVBAR.MY_BOOKS).click();
    await page.waitForURL(TEST_URL.TEST_PROFILE_URL);

    await expect(page.locator('.no-books')).toBeVisible();
    await expect(page.locator('.no-books')).toHaveText('No books in database!');
});

// Details page


// Logout

test('Logout button is visible', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await expect(page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON)).toBeVisible();
});

test('Verify That the "Logout" Button Redirects Correctly', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
        page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_HOME_URL);

    await expect(page.url()).toBe(TEST_URL.TEST_HOME_URL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.USER_EMAIL)).toBeHidden();
});