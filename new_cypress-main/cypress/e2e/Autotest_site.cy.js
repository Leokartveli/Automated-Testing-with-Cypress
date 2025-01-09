describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно') //Проверяю, что после авторизации вижу текст 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })
    it('Проверка на логику восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').click() // Нажали на кнопку забыли пароль 
        cy.get('#mailForgot').type('lll@gmail.com') // Ввели почту
        cy.get('#restoreEmailButton').click(); // Нажали отправить пароль
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю, что текст виден пользователю
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        // cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Негативный кейс. Неправильный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('Adsdsd'); // Ввели неправильный пароль
        cy.get('#loginButton').click(); // Нажал войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет') //Проверяю, что после авторизации вижу текст 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Негативный кейс. Неправильный логин', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('ger@dol.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели неправильный пароль
        cy.get('#loginButton').click(); // Нажал войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет') //Проверяю, что после авторизации вижу текст 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Негативный кейс. Логин без @', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('germandolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели неправильный пароль
        cy.get('#loginButton').click(); // Нажал войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации') //Проверяю, что после авторизации вижу текст 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Логин с строчными буквами', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели неправильный пароль
        cy.get('#loginButton').click(); // Нажал войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет') //Проверяю, что после авторизации вижу текст 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
})
// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
