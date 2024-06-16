const BASE_URL = 'http://localhost:3001';

const TEST_URL = {
    TEST_HOME_URL: BASE_URL + '/',
    TEST_LOGIN_URL: BASE_URL + '/login',
    TEST_REGISTER_URL: BASE_URL + '/register',
    TEST_CATALOG_URL: BASE_URL + '/catalog',
    TEST_PROFILE_URL: BASE_URL + '/profile'
}

const TEST_USER = {
    EMAIL: 'peter@abv.bg',
    PASSWORD: '123456',
    EMAIL_2: 'qaz@abv.bg',
    PASSWORD_2: '456'
}

const ALERT = {
    ALERT_MESSAGE: 'All fields are required!',
    ALERT_MESSAGE_2: "Passwords don't match!"
}

const TEST_BOOK = {
    TITLE: 'Test book title',
    DESCRIPTION: 'Super test book',
    IMAGE: 'https://example.com/book-image.jpg',
    TEST_BOOK_OPTIONS: {
        FICTION: 'Fiction',
        ROMANCE: 'Romance',
        MISTERY: 'Mistery',
        CLASSIC: 'Clasic',
        OTHER: 'Other'
    }
}

export {
    BASE_URL,
    TEST_URL,
    TEST_USER,
    ALERT,
    TEST_BOOK
}