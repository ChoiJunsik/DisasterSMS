import * as React from 'react';
import './KorMap.css';
import { Raphael } from 'react-raphael';
import initKorMap from './raphael_path_s.korea';
import KorCanvas from './KorCanvas';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const KorMap = (props) => {
    const [location, setLocation] = React.useState("seoul");
    const mapDoms = React.useRef();
    React.useEffect(() => {
        mapDoms.current = initKorMap(Raphael, setLocation);
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);

    return (
        <>
            <Container maxWidth="md">
            <Grid container spacing={3} alignItems='center'>
                    <Grid item md={6} xs={12}>
                    </Grid>
                    <Grid item md={6} xs={12}>
                            <KorCanvas />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default KorMap;