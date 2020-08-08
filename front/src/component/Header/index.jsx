// @flow 
import * as React from 'react';
import './header.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";

const Header = (props) => {
    return (
        <>
            <Container id="header" maxWidth="md">
                <Grid container spacing={3} alignItems='center'>
                    <Grid item md={4} xs={12}>
                        <div id="logo">
                            <div id="logo_head">더 낫재?</div>
                            <div id="logo_description">더 나은 재난문자를 위한 서비스</div>
                        </div>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <form action="">
                            <TextField id="outlined-basic" placeholder="ex) 양천구청" label="지역명 검색하기" variant="outlined" fullWidth
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit" aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    )
                                }}
                            >
                            </TextField>
                        </form>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

export default Header;