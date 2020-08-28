// @flow 
import * as React from 'react';
import './public/header.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

const WTextField = styled(TextField)`
  & label.Mui-focused {
    color:#90cc00;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #90cc00;
    }
  }
`;
const Header = ({setLocation}) => {
    const [inputVal,setInputVal] = React.useState('');
    const handleInput = (e)=>{
        setInputVal(e.target.value);
    }
    const handleChange = (e)=>{
        e.preventDefault();
        setLocation(inputVal);
    }
    return (
        <>
            <Container id="header" maxWidth="md">
                <div id="top_keyword">
                    오늘의 키워드 : 확진자 발생
                </div>
                <Grid container spacing={3} alignItems='center'>
                    <Grid item md={4} xs={12}>
                        <div id="logo">
                            <div id="logo_head">더 낫재?</div>
                            <div id="logo_description">더 나은 재난문자를 위한 서비스</div>
                        </div>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <form action="" onSubmit={handleChange}>
                            <WTextField value={inputVal} onChange={handleInput} 
                                        id="outlined-basic" placeholder="ex) 양천구청, 한강" label="키워드 검색하기" 
                                        variant="outlined" fullWidth autoFocus
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
                            </WTextField>
                        </form>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

export default Header;