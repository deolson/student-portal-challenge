import React, { ReactElement, useEffect, useState } from "react";
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { getProfilePic } from "../../../util/awsbucket";
import { Cake, LocationOn } from "@material-ui/icons";
import { UploadPhotoButton } from "./UploadPhotoButton";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const useStyle = makeStyles(() => ({
    root: {
        width: 300,
        textAlign: "center",
    },
    avatar: {
        width: 150,
        height: 150,
        margin: 10,
    },
    aqua: {
        color: "aqua",
    },
}));

export default function StudentProfileCard(): ReactElement {
    const classes = useStyle();
    const student = useAppSelector((state: RootState) => state.auth.student!);
    const address = student.address;
    const [profileUrl, setProfileUrl] = useState(student.profilePic);

    useEffect(() => {
        if (student.profilePic) {
            getProfilePic(student.profilePic).then((picURL) =>
                setProfileUrl(picURL)
            );
        }
    }, [student.profilePic]);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container justifyContent="center">
                    <Grid item container xs={12} justifyContent="center">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            badgeContent={
                                <UploadPhotoButton student={student} />
                            }
                        >
                            <Avatar
                                src={profileUrl}
                                className={classes.avatar}
                            />
                        </Badge>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            className={classes.aqua}
                        >
                            {student.firstName + " " + student.lastName}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <LocationOn className={classes.aqua} />
                        <Typography variant="body2" display="inline">
                            {address != null
                                ? address.toString()
                                : "No Address Information"}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Cake className={classes.aqua} />
                        <Typography variant="body2" display="inline">
                            {student.dateOfBirth != null
                                ? student.dateOfBirth
                                : "No Date of Birth Information"}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small">Edit Information</Button>
            </CardActions>
        </Card>
    );
}
