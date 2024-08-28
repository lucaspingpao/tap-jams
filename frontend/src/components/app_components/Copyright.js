import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Copyright() {
    return (
        <Box mt={8} sx={{ p: 5 }}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © TapJams '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}