import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DetailsCard from './DetailsCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    // padding: .5,
    borderRadius: .5,
};



export default function BasicModal({ open, handleClose, details }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <DetailsCard details={details}/>
                </Box>
            </Modal>
        </div>
    );
}
