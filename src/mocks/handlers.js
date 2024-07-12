import {http, HttpResponse} from 'msw';
import {listClientMock} from './data';

const allClients = new Map(Object.entries(listClientMock));

export const handlers = [
    http.get('/api/clients', () => {
        return HttpResponse.json(listClientMock);
    }),

    http.post('/api/clients', async ({request}) => {
        const requestBody = await request.json();
        return HttpResponse.json(
            {
                content: requestBody,
                createdAt: new Date().toLocaleString(),
            },
            {status: 201}
        );
    }),

    http.put('/api/clients', async ({request}) => {
        const requestBody = await request.json();
        return HttpResponse.json(
            {
                content: requestBody,
            },
            {status: 200}
        );
    }),

    http.delete('/api/clients/:id', ({params}) => {
        const {id} = params;

        const deletedClient = allClients.get(id.toString());

        if (!deletedClient) {
            return new HttpResponse(null, {status: 404});
        }

        allClients.delete(id.toString());

        return HttpResponse.json(deletedClient);
    })
];