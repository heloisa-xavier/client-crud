import {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Client} from "../../interfaces/clients.tsx";

const ListClient = () => {
    const [rows, setRows] = useState<Client[]>([]);
    const [open, setOpen] = useState(false);
    const [toExclude, setToExclude] = useState<number>();

    useEffect(() => {
        fetch('/api/clients')
            .then((res) => res.json())
            .then((data) => {
                setRows(data);
            });
    }, []);

    const handleClickOpen = (id: number) => {
        setToExclude(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);

        fetch(`/api/clients/${toExclude}`, {method: "DELETE"})
            .then((res) => res.json())
            .then((data) => {
                setRows(data);
            });
    };

    return (
        <>
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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" onClick={handleClose}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton aria-label="delete"
                                                onClick={() => handleClickOpen(row.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Deseja realmente excluir?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete}>
                        Deletar
                    </Button>
                    <Button variant="contained" onClick={handleClose} autoFocus>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ListClient