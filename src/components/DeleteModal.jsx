import { Avatar, Box, Modal,Button, TextField, useTheme, Typography} from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import { deepPurple } from "@mui/material/colors";
import { useFormik } from "formik";
import React,{useContext} from "react";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#1F2A40",
    // bgcolor:"background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const DeleteModal = ({ open, handleClose,delId }) => {
    console.log(delId);
    
    const handleDelete = () => {
        const data = JSON.parse(localStorage.getItem("team"));
        const newData = data.filter((e) => e.id !== delId);
        localStorage.setItem("team", JSON.stringify(newData));
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
                className={"flex flex-col gap-5 justify-center items-center"}
            >
                <div className="relative">
                    <Typography variant="h4">Are you sure you want to delete this teacher?</Typography>
                </div>
                
                    <Box className="flex gap-10" justifyContent="center">
                        <Button onClick={()=>{handleDelete()}} color="error" variant="contained">Delete</Button>
                        <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                    </Box>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
