import { IsNull } from "typeorm";
import { AppDatasource } from "../db";
import { Order } from "../entities/Order";

const repo = AppDatasource.getRepository(Order)

export class OrderService {
    static async getOrders(id: number) {
        return await repo.find({
            select: {
                orderId:true,
                bookId: true,
                userId: true,
                book: {
                    bookId: true,
                    title:true,
                    author:true,
                    price:true
                },
                createdAt:true,
                updatedAt:true
            },
            where: {
                userId: id,
                deletedAt: IsNull()
            },
            relations: {
                book: true
            }
        })

    }

    static async getOrderById(user: number, id: number) {
        const data = await repo.findOne({
            where: {
                orderId: id,
                userId: user,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        return data
    }

    static async createOrder(user: number, model: Order){
        await repo.save({
            userId: user,
            bookId: model.bookId,
            createdAt: new Date()
        })
    }

    static async updateOrder(user: number,id: number, model: Order){
        const data = await this.getOrderById(user,id)
        data.bookId = model.bookId,
        data.updatedAt = new Date() 
        await repo.save(data)
    }

    static async deleteOrder(user:number, id: number) {
        const data = await this.getOrderById(user,id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}