import {http, HttpResponse} from 'msw';
import {listClientMock} from './data';
import {Client} from "../interfaces/clients.tsx";

const allClients = new Map(listClientMock.map(client => [client.id, {...client}]));

export const handlers = [
    http.get('/api/clients', () => {
        return HttpResponse.json(listClientMock);
    }),

    http.get(`/api/clients/:id`, ({params}) => {
        const {id} = params;

        const selectedClient = allClients.get(+id);
        if (!selectedClient) {
            return new HttpResponse(null, {status: 404});
        }

        return HttpResponse.json(selectedClient);
    }),

    http.post('/api/clients', async ({request}) => {
        const requestBody = await request.json();
        const newClient = requestBody as Client;
        allClients.set(newClient.id, newClient);

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

        const deletedClient = allClients.get(+id);

        if (!deletedClient) {
            return new HttpResponse(null, {status: 404});
        }

        allClients.delete(+id);

        return HttpResponse.json(Array.from(allClients.values()));
    })
];