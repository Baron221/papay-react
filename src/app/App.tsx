import React from 'react';
import '../css/App.css';
import { Container,Stack,Box, Typography,Button} from '@mui/material';
import { RippleBadge } from './Material Theme/styled';
function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{my:4}}>
          <Typography variant='h4' component={"h1"} gutterBottom>
            Create React App on Typescript with Redux
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>

         <Button color="secondary" variant='contained'>Contained</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
