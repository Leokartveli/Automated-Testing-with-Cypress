import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/');
    });
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
    });
    it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio1'); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Авторизация прошла успешно') //Проверяю, что после авторизации вижу текст 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })
    it('Проверка на логику восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click() // Нажали на кнопку забыли пароль 
        cy.get(recovery_password_page.email).type('lll@gmail.com') // Ввели почту
        cy.get(recovery_password_page.send_button).click(); // Нажали отправить пароль
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю, что текст виден пользователю
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        // cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Негативный кейс. Неправильный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('Adsdsd'); // Ввели неправильный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет') //Проверяю, что после авторизации вижу текст 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Негативный кейс. Неправильный логин', function () {
        cy.get(main_page.email).type('ger@dol.ru'); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели неправильный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет') //Проверяю, что после авторизации вижу текст 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Негативный кейс. Логин без @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации') //Проверяю, что после авторизации вижу текст 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
    it('Логин с строчными буквами', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели неправильный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет') //Проверяю, что после авторизации вижу текст 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').click();
    })
})