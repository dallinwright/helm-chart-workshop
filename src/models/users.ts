import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "users",
})
class User extends Model {
    @Column({
        type: DataType.UUIDV4,
        primaryKey: true,
        field: "id"
    })
    id: number;

    @Column({
        type: DataType.STRING(255),
        field: "name"
    })
    name: string;

    @Column({
        type: DataType.DATE,
        field: "createdAt",
        defaultValue: DataType.NOW,
        allowNull: false
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        field: "updatedAt",
        defaultValue: DataType.NOW,
        allowNull: false
    })
    updatedAt: Date;
}

export default User;
