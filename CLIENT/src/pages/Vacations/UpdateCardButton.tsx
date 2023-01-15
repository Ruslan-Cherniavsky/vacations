import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function UpdateCardButton(props: any) {
    const { setSelectedEditMode, selectedEditMode } = props;
    const [alignment, setAlignment] = React.useState('left');

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string,) => {
        setAlignment(newAlignment);
        setSelectedEditMode(!selectedEditMode)
    };

    const children = [
        <ToggleButton value="left" key="left">
            <EditIcon />
        </ToggleButton>,
    ];

    const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > :not(style) + :not(style)': { mt: 2 },
            }}
        >
            <ToggleButtonGroup size="small" {...control}>
                {children}
            </ToggleButtonGroup>
        </Box>
    );
}

export { UpdateCardButton }