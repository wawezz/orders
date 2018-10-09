import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {OrderProduct} from "../orderProduct/orderProduct.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    // @Column()
    // orderDateTime: string;

    get orderDateTime() {
        return new Date();
    }

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.order, {
        eager: true
    })
    products: OrderProduct[];
}