import { Router } from "express";
import { OrderService } from "../services/order.service";
import { sendError } from "../utils";


export const OrderRoute = Router()

OrderRoute.get('/', async(req: any, res) => {
    try {
        res.json(await OrderService.getOrders(req.user.id))
    } catch (e) {
        sendError(res, e)
    }
})

OrderRoute.get('/:id', async (req: any,res) => {
    try {
        const id = Number(req.params.id)
        res.json(await OrderService.getOrderById(req.user.id,id))
    } catch (e) {
        sendError(res, e)
    }
})

OrderRoute.post('/', async(req: any,res) => {
    try {
        await OrderService.createOrder(req.user.id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

OrderRoute.put('/:id', async (req: any, res) => {
    try {
        const id = Number(req.params.id)
        await OrderService.updateOrder(req.user.id,id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

OrderRoute.delete('/:id', async(req:any, res) => {
    try {
        const id = Number(req.params.id)
        await OrderService.deleteOrder(req.user.id, id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})