import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../dbClient.js';

export interface T_Users {
    id: number;
    firstName: string;
    lastName: string;
}

export interface UsersAttributes extends T_Users {}
export type UsersCreationAttributes = UsersAttributes;
export class Users extends Model<UsersAttributes, UsersCreationAttributes> {}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: new DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(255),
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'Users',
    }
)