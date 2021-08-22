import React from "react";
import {
    Fab,
    makeStyles,
    Modal,
    Button,
    Paper,
    Grid,
    TextField,
    IconButton,
    Input,
    Avatar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Storage } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        textAlign: "center",
    },
    img: {
        width: 100,
        height: 100,
        margin: "0 auto",
        marginBottom: 20,
    },
    text: {
        marginBottom: 10,
    },
}));

const initialFormData = {
    firstName: "a",
    lastName: "",
    // dateOfBirth: "",
    address: "",
};

export default function CreatePostIcon() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [formData, updateFormData] = React.useState(initialFormData);
    const [imageURI, setimageURI] = React.useState("");
    const [imgKey, setImgKey] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        updateFormData(initialFormData);
        setimageURI("");
        setImgKey("");
        setOpen(false);
    };

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.id]: event.target.value.trim(),
        });
    };

    let file = { name: "" };
    async function onPicChange(event) {
        if (event.target.files) {
            file = event.target.files[0];
            const result = await Storage.put(file.name, file);
            setimageURI(URL.createObjectURL(file));
            setImgKey(file.name);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("formData: ", formData);
        console.log("imgKey: ", imgKey);
        handleClose();
    }

    const body = (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: "80vh" }}
        >
            <Paper elevation={10} className={classes.paper}>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={1}>
                        <Button
                            style={{
                                backgroundColor: "white",
                                minWidth: "10px",
                            }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
                <h2 style={{ marginBottom: 20 }}>Edit Your Details:</h2>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        label="First Name"
                        placeholder="Sam"
                        fullWidth
                        id="firstName"
                        name="firstName"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        className={classes.text}
                        value={initialFormData.firstName}
                    />
                    <TextField
                        label="Last Name"
                        placeholder="Walton"
                        fullWidth
                        id="lastName"
                        name="lastName"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        className={classes.text}
                    />
                    <TextField
                        label="Date of Birth----------------------DOB"
                        fullWidth
                        id="firstName"
                        name="message"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        className={classes.text}
                        type="date"
                    />
                    <TextField
                        label="Address"
                        placeholder="1650 North Carlane Way Casa Grande, AZ, 85122"
                        fullWidth
                        id="address"
                        name="address"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        className={classes.text}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <p>Edit Image</p>
                            <PhotoCamera style={{ margin: "10px" }} />
                        </IconButton>
                        {imageURI && (
                            <Avatar
                                src={imageURI}
                                alt=""
                                className={classes.img}
                            />
                        )}
                    </label>
                    <Input
                        id="icon-button-file"
                        type="file"
                        onChange={onPicChange}
                        style={{ display: "none" }}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                    >
                        Update Profile Details
                    </Button>
                </form>
            </Paper>
        </Grid>
    );

    return (
        <>
            <EditIcon onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}
