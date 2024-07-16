import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

interface DeleteClientDialogProps {
    id: number,
    open: boolean,
    closeHandler: (...args) => void
}

const DeleteClient = (props: DeleteClientDialogProps) => {

    const handleDelete = async () => {
        const response = await fetch(`/api/clients/${props.id}`, {method: "DELETE"});
        const result = await response.json();
        props.closeHandler(result);
    };

    return (
        <Dialog onClose={props.closeHandler} open={props.open}>
            <DialogContent>
                Deseja realmente excluir?
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeHandler} autoFocus>
                    Cancelar
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete()}>
                    Deletar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteClient;


