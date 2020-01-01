'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Books',
            [
                {
                    id: 0,
                    authorSurname: 'Janyš',
                    authorName: 'B.',
                    title: 'Kapesní dílenské tabulky',
                    yearOfPublish: 1967,
                    price: 25,
                    publisher: 'SNTL',
                    typeOfPublish: 'kniha',
                    type: 'naučná',
                    buyDate: '1/23/2020',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 1,
                    authorSurname: 'Janyš',
                    authorName: 'B.',
                    title: 'Kapesní dílenské tabulky',
                    yearOfPublish: 1967,
                    price: 25,
                    publisher: 'SNTL',
                    typeOfPublish: 'kniha',
                    type: 'naučná',
                    buyDate: '1/23/2020',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    authorSurname: 'Janyš',
                    authorName: 'B.',
                    title: 'Kapesní dílenské tabulky',
                    yearOfPublish: 1967,
                    price: 25,
                    publisher: 'SNTL',
                    typeOfPublish: 'kniha',
                    type: 'naučná',
                    buyDate: '1/23/2020',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    authorSurname: 'Janyš',
                    authorName: 'B.',
                    title: 'Kapesní dílenské tabulky',
                    yearOfPublish: 1967,
                    price: 25,
                    publisher: 'SNTL',
                    typeOfPublish: 'kniha',
                    type: 'naučná',
                    buyDate: '1/23/2020',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Books', null, {});
    }
};
