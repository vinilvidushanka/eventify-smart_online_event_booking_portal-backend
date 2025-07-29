
export interface TicketDetailsDTO {
    id: number;
    title: string;
    venue: string;
    date: string;
    time: string;
    price: number;
    currency: string;
    image: string;
}

export interface TicketItemDTO {
    tickets: TicketDetailsDTO;
    ticketsCount: number;
}

export interface PaymentDTO {
    totalAmount: string;
    tickets: TicketItemDTO[];
    paidBy: string;
}
