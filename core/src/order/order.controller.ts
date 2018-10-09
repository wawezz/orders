import {Body, Controller, Get, Param, Put, Req} from '@nestjs/common';
import {Order} from "./order.entity";
import {getRepository} from "typeorm";
import {OrderProduct} from "../orderProduct/orderProduct.entity";

@Controller('order')
export class OrderController {
    @Put('change-status')
    async changeStatus(@Body() body) {
        const orderRepository = getRepository(Order);

        const order: Order = await orderRepository.findOne(body.id);
        order.status = body.status;
        await orderRepository.save(order);

        return {
            success: true,
            response: {
                id: body.id,
            },
            errors: {}
        };
    }

    @Get('migrate')
    async migrate() {
        const orderRepository = getRepository(Order);
        const orderProductRepository = getRepository(OrderProduct);

        // await orderProductRepository.clear();
        // await orderRepository.clear();


        const order1: Order = new Order();
        const order2: Order = new Order();

        order1.status = 'COMPLETE';
            const order1_product_1: OrderProduct = new OrderProduct();
                order1_product_1.name = 'Product 1';
                order1_product_1.price = 10.45;
                order1_product_1.quantity = 4;
            const order1_product_2: OrderProduct = new OrderProduct();
                order1_product_2.name = 'Product 2';
                order1_product_2.price = 3.81;
                order1_product_2.quantity = 1;
        order1.products = [
            order1_product_1,
            order1_product_2,
        ];

        const newOrder1: Order = await orderRepository.save(order1);
        order1_product_1.order = newOrder1;
        order1_product_2.order = newOrder1;
        await orderProductRepository.save(order1_product_1);
        await orderProductRepository.save(order1_product_2);


        order2.status = 'COMPLETE';
            const order2_product_1: OrderProduct = new OrderProduct();
                order2_product_1.name = 'Prod 1';
                order2_product_1.price = 7.5;
                order2_product_1.quantity = 7;
            const order2_product_2: OrderProduct = new OrderProduct();
                order2_product_2.name = 'Prod 2';
                order2_product_2.price = 42.2;
                order2_product_2.quantity = 2;
        order2.products = [
            order2_product_1,
            order2_product_2,
        ];

        const newOrder2: Order = await orderRepository.save(order2);
        order2_product_1.order = newOrder2;
        order2_product_2.order = newOrder2;
        await orderProductRepository.save(order2_product_1);
        await orderProductRepository.save(order2_product_2);

        return {
            success: true,
        };
    }

    @Get('')
    async findAll() {
        const orders: Order[] = await getRepository(Order).find();

        return {
            success: true,
            response: {
                list: orders,
            },
            errors: {}
        };
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        const order: Order = await getRepository(Order).findOne(id);

        const orderDto: any = {...order};

        orderDto.products.forEach(it => {
            it.total = it.price * it.quantity;
        });

        orderDto.totalQuantity = orderDto.products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity;
        }, 0);

        orderDto.total = orderDto.products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.total;
        }, 0);

        return {
            success: true,
            response: {
                data: orderDto,
            },
            errors: {}
        };
    }
}
