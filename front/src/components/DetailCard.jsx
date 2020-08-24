// @flow 
import * as React from 'react';
import axios from 'axios';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './public/card.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const locationTable = {
    'seoul': '서울',
    'gygg': '경기',
    'incheon': '인천',
    'gangwon': '강원',
    'chungnam': '충청',
    'chungbuk': '충청',
    'daejeon': '대전',
    'jeonbuk': '전라',
    'jeonnam': '전라',
    'gwangju': '광주',
    'jeju': '제주',
    'gyeongbuk': '경상',
    'gyeongnam': '경상',
    'daegu': '대구',
    'ulsan': '울산',
    'busan': '부산',
    'sejong':'세종'
};
const DetailCard = ({ bbs_ordr, location, content }) => {
    const [toggle, setToggle] = React.useState(false);
    const [detail, setDetail] = React.useState(null);
    let tmp = content.split('[');
    const head_name = tmp[tmp.length - 1].split(']')[0];
    const clickHeader = () => {
        setToggle(!toggle);
    }
    React.useEffect(() => {
        if (toggle) {
            async function fetchData() {
                const ret = await axios.get('https://bdt-api.herokuapp.com/location/detail', {
                    params: {
                        bbs_ordr: bbs_ordr
                    }
                });
                setDetail(ret.data);
            }
            fetchData();
        }
    }, [toggle === true]);
    return (
        <div id="card">
            <div id="card-header" onClick={clickHeader}>
                <span id="tag">{locationTable[location]===undefined ? location.substr(0,2) : locationTable[location]}</span>
                <span id="header-name">{head_name}</span>
                <MoreHorizIcon id="more"/>
            </div>
            <div id="card-content">
                <div id="date">{content}</div>
                {(toggle === true && detail === null) ? <div id="load_wrapper"><CircularProgress id="load" /></div> : null }
                {(toggle === true && detail !== null) ? <div id="card-detail">{detail}</div> : null}
            </div>
        </div>
    );
};

export default DetailCard;