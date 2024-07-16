import {FieldValue, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Box, Button, Container, Stack, TextField} from "@mui/material";
import {StyledErrorMessage} from "./styles.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Client} from "../../interfaces/clients.tsx";

const FormClient = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const id = state?.id;
    const clientSchema = z.object({
        name: z.string().min(3, {message: "Nome é obrigatório"}),
        description: z.string().min(3, {message: "Descrição é obrigatório"}).max(50)
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        resolver: zodResolver(clientSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: true,

    });

    useEffect(() => {
        const fetchClient = async () => {
            const response = await fetch(`/api/clients/${id}`);
            const result = await response.json();
            setValue('name', result.name, {shouldValidate: true});
            setValue('description', result.description, {shouldTouch: true});
            setValue('id', result.id, {shouldTouch: true});
        };

        id && fetchClient();
    }, [id]);

    const handleCancel = () => {
        navigate("/");
    }

    const postValue = async (newClient: FieldValue<Client>) => {
        if (id) {
            (newClient as Client).id = id;
        }
        const response = await fetch(`/api/clients`, {method: "POST", body: JSON.stringify(newClient)});
        await response.json();

        navigate("/");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form"
                 onSubmit={handleSubmit((newClient) => postValue(newClient))}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >

                        <TextField
                            id="name"
                            label="Nome"
                            variant="standard"
                            {...register("name")}/>
                        {errors.name?.message && <StyledErrorMessage>{errors.name?.message + ''}</StyledErrorMessage>}

                        <TextField
                            id="description"
                            label="Descrição"
                            variant="standard"
                            multiline
                            rows={4}
                            {...register("description")}/>
                        {errors.description?.message &&
                            <StyledErrorMessage>{errors.description?.message + ''}</StyledErrorMessage>}
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type={"submit"}>
                            Salvar
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default FormClient