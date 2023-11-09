import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()


export class Product {


@PrimaryGeneratedColumn('uuid')
public id : string;

@Column()
public name : string;

@Column()
public desc : string;

@Column()
public price : number;

@Column({default:true})
public isSealed : Boolean;






}
