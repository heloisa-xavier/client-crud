import {Client} from "../interfaces/clients";

const getAllClients = async () => {
    try {
        const response = await fetch('/api/clients');

        return await response.json() as Client[];
    } catch (err) {
        if (err instanceof Error) console.log(err.message)
        return [];
    }
}

export {getAllClients}