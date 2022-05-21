import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function MessageSnackbar(props) {
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                autoHideDuration={3000}
                open={props.isOpen}
                onClose={props.handleClose}
                TransitionComponent={TransitionUp}
                key={"error-message"}
            >
                <Alert onClose={props.handleClose} severity={props.type} sx={{ width: "100%" }}>
                    <AlertTitle>{props.title}</AlertTitle>
                    {props.msg}
                </Alert>
            </Snackbar>
        </>
    );
}
