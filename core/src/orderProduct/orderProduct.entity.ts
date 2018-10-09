import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

import {Order} from '../order/order.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Order, order => order.products)
    order: Order;
}