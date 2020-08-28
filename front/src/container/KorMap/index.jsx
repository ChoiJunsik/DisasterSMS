import * as React from 'react';
//Components & Containers
import Header from '../Header';
import KorCanvas from '../../components/KorCanvas';
import ContentSection from '../../components/ContentSection';
import ContentTab from '../../components/ContentTabs';
//public
import './public/KorMap.css';
import { locationTable } from './data';
//third-party
import initKorMap from './public/raphael_path_s.korea';
import { Raphael } from 'react-raphael';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

async function fetchStatusData(setInfo, location) {
    try{
        setInfo("");
        const ret = await axios.get('https://bdt-api.herokuapp.com/location', {
            params: {
                location: location
            }
        });
        setInfo(ret.data);
    }
    catch(e){
        console.log(e);
    }
}
async function fetchWeeklyData(setWeeklyData, location) {
    try{
        setWeeklyData([]);
        const ret = await axios.get('https://bdt-api.herokuapp.com/location/weekly', {
            params: {
                location: location
            }
        });
        console.log(ret.data)
        setWeeklyData((ret.data)[location]);
    }
    catch(e){
        console.log(e);
    }
}

const KorMap = (props) => {
    const [location, setLocation] = React.useState('seoul');
    const [tab, setTab] = React.useState('위험 현황');
    const [info, setInfo] = React.useState("");
    const [weeklyData, setWeeklyData] = React.useState(null);
    const [mapDoms, setDoms] = React.useState(null);
    const [tags, setTags] = React.useState(['서울시']);
    const [email, setEmail] = React.useState('');

    const handleTagChange = (tags) => {
        setTags(tags);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubscribe = async (e)=>{
        e.preventDefault();
        try{
            await axios.post('https://bdt-api.herokuapp.com/subscribe', {
                tags,email
            });
            setTags([]);
            setEmail('');
            alert('정상적으로 구독이 신청 되었습니다!! 😀');
        }
        catch(e){
            alert('구독이 정상적으로 완료되지 않았습니다, 다시 시도해주세요 😅');
        }
    }
    React.useEffect(() => {
        setDoms(initKorMap(Raphael, setLocation));
        return () => {
            console.log('end');
        };
    }, []);

    React.useEffect(() => {
        if (tab == "위험 현황") {
            fetchStatusData(setInfo, location);
        }
        else if (tab == "재난 그래프")
            fetchWeeklyData(setWeeklyData, location);
    }, [location, tab]);

    React.useEffect(() => {
        if (mapDoms !== null) {
            (async () => {
                const ret = await axios.get('https://bdt-api.herokuapp.com/location/cur');
                for (let query in ret.data) {

                    let color = '#ccece6';
                    if (ret.data[query] > 500) color = '#c62828';
                    else if (ret.data[query] > 400) color = '#e53935';
                    else if (ret.data[query] > 300) color = '#ef5350';
                    else if (ret.data[query] > 200) color = '#ef9a9a';
                    else if (ret.data[query] > 100) color = '#ffcdd2';

                    (mapDoms[query])[0].setAttribute("fill", color);
                }
            })();
        }
    }, [mapDoms]);

    return (
        <>
            <Header setLocation={setLocation} />
            <Container id="container" maxWidth="md">
                <Grid container spacing={3} alignItems='center' alignContent='center'>
                    <Grid id="content_detail" item md={7} xs={12}>
                        <ContentTab id="content_tab" setTab={setTab} />
                        <ContentSection 
                            tab={tab} info={info} location={location} weeklyData={weeklyData}
                            tags={tags} email={email} handleTagChange={handleTagChange} handleEmailChange={handleEmailChange} handleSubscribe={handleSubscribe} />
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