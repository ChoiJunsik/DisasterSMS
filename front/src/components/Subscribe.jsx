import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TagsInput from 'react-tagsinput'
import './public/subscribe.css';
import 'react-tagsinput/react-tagsinput.css';
import styled from "styled-components";
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
const WTagsInput = styled(TagsInput)`
    background-color: #fff;
    border: 1px solid #ccc;
    overflow: hidden;
    padding-left: 5px;
    padding-top: 5px;
    border-radius: 4px;
`;
export default function Subscribe({email,tags,handleTagChange,handleSubscribe,handleEmailChange}) {

    return (
        <div id="subscribe">
            <div id="sub_description">
                <div>이메일과 원하는 태그를 선택해서 </div>
                <br/>
                <div>맞춤형 재난문자를 받아보세요 <span style={{fontSize:'20px'}}>💌</span></div>
            </div>
            <form onSubmit={handleSubscribe} id="sub_form">
                <WTextField
                variant="outlined"
                required
                fullWidth
                label="이메일 주소를 입력해주세요."
                name="email"
                autoComplete="email"
                id="sub_email"
                value={email}
                onChange={handleEmailChange}
                />
                <br/><br/>
                <WTagsInput inputProps={{ placeholder: '태그 입력' }} value={tags} onChange={handleTagChange}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    variant="contained" color="primary"
                    id="sub_button"
                >
                    구독 신청
                </Button>
            </form>
        </div>
    );
}