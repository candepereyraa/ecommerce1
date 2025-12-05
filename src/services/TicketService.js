import Ticket from '../models/Ticket.js';
import { v4 as uuidv4 } from 'uuid';


export default class TicketService{
async createTicket(purchaserId, amount, products){
const code = uuidv4().slice(0,8).toUpperCase();
const ticket = await Ticket.create({ code, amount, purchaser: purchaserId, products });
return ticket;
}
}