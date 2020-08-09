import * as React from 'react';
import './KorMap.css';
import { Raphael } from 'react-raphael';
import initKorMap from './raphael_path_s.korea';
import KorCanvas from './KorCanvas';
import ContentTab from './ContentTabs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import DetailCard from './DetailCard';
import Header from '../Header';
const locationTable = {
    'seoul': '서울',
    'gygg': '경기',
    'incheon': '인천',
    'gangwon': '강원',
    'chungnam': '충청남도',
    'chungbuk': '충청북도',
    'daejeon': '대전',
    'jeonbuk': '전라북도',
    'jeonnam': '전라남도',
    'gwangju': '광주',
    'jeju': '제주',
    'gyeongbuk': '경상북도',
    'gyeongnam': '경상남도',
    'daegu': '대구',
    'ulsan': '울산',
    'busan': '부산',
};
const KorMap = (props) => {
    const [location, setLocation] = React.useState('seoul');
    const [tab, setTab] = React.useState('위험 현황');
    const [info, setInfo] = React.useState("");
    const mapDoms = React.useRef();
    React.useEffect(() => {
        mapDoms.current = initKorMap(Raphael, setLocation);
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);
    React.useEffect(() => {
        async function fetchData() {
            const ret = await axios.get('http://localhost:8000/location', {
                params: {
                    location: location
                }
            });
            setInfo(ret.data);
            console.log(ret.data)
        }
        fetchData();
    }, [location]);
    React.useEffect(() => {
        console.log(info)
    }, [info])
    return (
        <>
            <Header setLocation={setLocation} />
            <Container id="container" maxWidth="md">
                <Grid container spacing={3} alignItems='center' alignContent='center'>
                    <Grid id="content_detail" item md={7} xs={12}>
                        <ContentTab id="content_tab" setTab={setTab} />
                        {/* /* <div>{tab}</div>
                        <div>{location}</div> */}
                        {
                            tab === '위험 현황' ? (
                                <div id="content_section">
                                    {
                                        info.length > 0 ?
                                            info.map((val) => {
                                                return <DetailCard key={val.bbs_ordr} bbs_ordr={val.bbs_ordr} location={location} content={val.content}/>
                                            })
                                        :
                                        info === -1  ? <div id="no-search">검색결과가 없습니다 ㅠㅠ</div> : null
                                    }
                                </div>
                            ) : null
                        }
                    </Grid>
                    <Grid id="content_map" item md={5} xs={12}>
                        <KorCanvas />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default KorMap;