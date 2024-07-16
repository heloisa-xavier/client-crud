import {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Stack
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import {Client} from "../../interfaces/clients.tsx";
import DeleteClient from "../delete-client";

const ListClient = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
    const [toExclude, setToExclude] = useState<number>(0);
    const [openDeleteDialg, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('/api/clients');
            const result = await response.json();
            setClients(result);
        };

        fetchClients();
    }, []);

    const handleClickOpen = (id: number) => {
        setToExclude(id);
        setOpenDeleteDialog(true);
    };

    const handleEdit = (id: number) => {
        navigate("/criar-cliente", {state: {id}});
    };

    const handleClose = (result?: Client[]) => {
        result && setClients(result);
        setOpenDeleteDialog(false);
    };

    return (
        <Stack spacing={5}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.name}>
                                <TableCell component="th" scope="row">
                                    {client.name}
                                </TableCell>
                                <TableCell>{client.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(client.id)}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton
                                        onClick={() => handleClickOpen(client.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <DeleteClient
                id={toExclude}
                open={openDeleteDialg}
                closeHandler={handleClose}
            />

            <Button variant="contained" onClick={() => navigate("/criar-cliente")}>
                Adicionar Cliente
            </Button>
        </Stack>
    );
}

export default ListClient