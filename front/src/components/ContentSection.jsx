// @flow 
import * as React from 'react';
import DetailCard from './DetailCard';
import './public/contentSection.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const ContentSection = ({ tab, info, location }) => {
    return (
        <div id="content_section">
            {(tab==='위험 현황'||tab==='재난 그래프' ||tab==='키워드 분석') && info==="" ? <div id="load_wrapper"><CircularProgress id="load" /></div> :null}
            {tab === '위험 현황' ? (
                info.length > 0 ?
                    info.map((val) => {
                        return <DetailCard key={val.bbs_ordr} bbs_ordr={val.bbs_ordr} location={location} content={val.content} />
                    })
                    :
                    info === -1 ? <div id="no-search">검색결과가 없습니다 ㅠㅠ</div> : null
                ) : null
            }
            {tab === '재난 그래프' ? (
                <div>재난 그래프</div>
                ) : null
            }
            {tab === '키워드 분석' ? (
                <div>키워드 분석</div>
                ) : null
            }
        </div>
    );
};

export default ContentSection;