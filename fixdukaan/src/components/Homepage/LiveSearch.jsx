import React from 'react'
import { TextField, Stack, Autocomplete, Box } from '@mui/material'
import obj from './Products.json'
const LiveSearch = () => {

    return (
        <>
            <Stack sx={{ width: 200, height: 50 }}>
                <Autocomplete
                    id="Item to be repaired"
                    getOptionLabel={(obj) => `${obj.name}`}
                    options={obj}
                    sx={{ width: 200, height: 80 }}
                    isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                    }
                    noOptionsText={"Other"}
                    renderOption={(props, obj) => (
                        <Box component="li" {...props} key={obj.id}>
                            {obj.name}
                        </Box>
                    )}
                    renderInput={(params) =>
                        <TextField {...params} label="Search for product" style={{ backgroundColor: "white" }} />
                    }
                />
            </Stack>
        </>
    )
}

export default LiveSearch
