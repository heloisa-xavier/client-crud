import "@testing-library/jest-dom";
import {getAllClients} from "../lib/client-lib";

describe("get client function", () => {
    it('should return the correct number of Clients', async () => {
        const clients = await getAllClients();

        expect(clients.length).toBe(3)
    })
});