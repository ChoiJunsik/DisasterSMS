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


const KorMap = (props) => {
    const [location, setLocation] = React.useState('seoul');
    const [tab, setTab] = React.useState('위험 현황');
    const [info, setInfo] = React.useState("");
    const [mapDoms, setDoms] = React.useState(null);
    React.useEffect(() => {
        setDoms(initKorMap(Raphael, setLocation));
        return () => {
            console.log('end');
        };
    }, []);

    React.useEffect(() => {
        async function fetchData() {
            const ret = await axios.get('https://bdt-api.herokuapp.com/location', {
                params: {
                    location: location
                }
            });
            setInfo(ret.data);
        }
        fetchData();
    }, [location]);

    React.useEffect(() => {
        if (mapDoms !== null) {
            (async () => {
                const ret = await axios.get('https://bdt-api.herokuapp.com/location/cur');
                for (let query in ret.data) {
                    let color = '#ffcdd2';
                    if (ret.data[query] > 500) color = '#c62828';
                    else if (ret.data[query] > 400) color = '#e53935';
                    else if (ret.data[query] > 300) color = '#ef5350';
                    else if (ret.data[query] > 200) color = '#ef9a9a';

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
                        <ContentSection tab={tab} info={info} location={location} />
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