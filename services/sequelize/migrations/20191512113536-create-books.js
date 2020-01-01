module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Books',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            authorSurname: {
                allowNull: true,
                type: DataTypes.STRING
            },
            authorName: {
                allowNull: true,
                type: DataTypes.STRING
            },
            title: {
                allowNull: true,
                type: DataTypes.STRING
            },
            yearOfPublish: {
                allowNull: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            price: {
                allowNull: true,
                type: DataTypes.INTEGER.UNSIGNED
            },
            publisher: {
                allowNull: true,
                type: DataTypes.STRING
            },
            typeOfPublish: {
                allowNull: true,
                type: DataTypes.STRING
            },
            type: {
                allowNull: true,
                type: DataTypes.STRING
            },
            buyDate: {
                allowNull: true,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
        },
    );
};

module.exports.down = queryInterface => queryInterface.dropTable('Books');
