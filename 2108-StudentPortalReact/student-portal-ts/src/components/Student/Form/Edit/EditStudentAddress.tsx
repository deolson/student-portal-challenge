import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { editInfo } from "../../../../redux/thunks";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { parseAddress } from "../../../../util/address";

interface IProps {
    setEditAddress: Dispatch<SetStateAction<boolean>>;
}

export default function EditStudentAddress(props: IProps): ReactElement {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user);
    const jwt = useAppSelector((state: RootState) => state.auth.jwtToken);

    const { ref: materialRef } = usePlacesWidget({
        apiKey: "AIzaSyCDdLGOx2MAi9LNAn-SfVhflvyrBfdBfCk",
        onPlaceSelected: (place) => handlePlaceSelect(place),
        inputAutocompleteValue: "country",
        options: {
            componentRestrictions: {
                country: ["us", "ca"],
            },
            fields: ["address_components", "geometry"],
            types: ["address"],
        },
    });

    function handlePlaceSelect(place: any) {
        if(place.address_components) {
            props.setEditAddress(false);
            user.address = parseAddress(place.address_components)
            dispatch(editInfo(user,jwt))
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <form style={{width:"100%"}} onSubmit={handleSubmit}>
            <Grid container justifyContent="space-evenly" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        inputRef={materialRef}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
