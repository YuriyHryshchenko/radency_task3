import {Column, DataType, Model, Table} from "sequelize-typescript";
interface NewNote {
	name: string;
	category: string;
	content: string;
	date: string;
}
 
@Table({tableName: 'notes', timestamps: false})
export class Note extends Model<Note, NewNote> {
	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;
	@Column({type: DataType.STRING, allowNull: false})
	name: string;
	@Column({type: DataType.STRING, allowNull: false})
	timeOfCreation: string;
	@Column({type: DataType.STRING, allowNull: false})
	category: string;
	@Column({type: DataType.STRING, allowNull: false})
	content: string;
	@Column({type: DataType.STRING, allowNull: false})
	date: string;
}