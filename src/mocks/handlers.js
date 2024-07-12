import {http, HttpResponse} from 'msw';
import {listClientMock} from './data';

const allClients = new Map(listClientMock.map(client => [client.id, {...client}]));

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

        console.log(allClients)
        console.log(+id)
        const deletedClient = allClients.get(+id);

        if (!deletedClient) {
            return new HttpResponse(null, {status: 404});
        }

        allClients.delete(+id);

        return HttpResponse.json(Array.from(allClients.values()));
    })
];