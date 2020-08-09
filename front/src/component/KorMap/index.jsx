import * as React from 'react';
import './KorMap.css';
import { Raphael } from 'react-raphael';
import initKorMap from './raphael_path_s.korea';
import KorCanvas from './KorCanvas';
import ContentTab from './ContentTabs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const KorMap = (props) => {
    const [location, setLocation] = React.useState('seoul');
    const [tab, setTab] = React.useState('위험 현황');
    const [info,setInfo] = React.useState([]);
    const mapDoms = React.useRef();
    React.useEffect(async () => {
        // const ret = await getSeoul();
        setInfo(['가져올 정보']);
        mapDoms.current = initKorMap(Raphael, setLocation);
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);
    return (
        <>
            <Container id="container" maxWidth="md">
                <Grid container spacing={3} alignItems='center' alignContent='center'>
                    <Grid id="content_detail" item md={7} xs={12}>
                        <ContentTab id="content_section" setTab={setTab} />
                        <div>{tab}</div>
                        <div>{location}</div>
                        {
                            info.map((val)=>{
                                return <div>{val}</div>
                            })
                        }
                        <div>
                            <div>
                                <span>서울</span> <span>양천구청</span>
                            </div>
                        </div>
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