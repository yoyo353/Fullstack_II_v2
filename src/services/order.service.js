import api from '../config/axios';

export const orderService = {
    createOrder: async (items) => {
        // Transform cart items to DetalleBoleta format expected by backend
        const detalles = Object.values(items).map(item => ({
            producto: { id: item.id },
            cantidad: item.qty
        }));

        const response = await api.post('/boletas', detalles);
        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get('/boletas/mis-boletas');
        return response.data;
    }
};
