import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

const TabWrapper = styled(Tab)`
    font-family: 'GmarketSansMedium', sans-serif;
    font-size: 1.1rem;
`;
const TabsWrapper = styled(Tabs)`
    margin-bottom:20px;
`;
export default function ContentTab({ setTab }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setTab(event.target.textContent);
    };

    return (
        <TabsWrapper
            value={value}
            onChange={handleChange}
            // indicatorColor="primary"
            // textColor="primary"
            centered
            TabIndicatorProps={{
                style: {
                    backgroundColor: "#90cc00"
                }
            }}
        >
            <TabWrapper label="위험 현황" />
            <TabWrapper label="재난 그래프" />
            <TabWrapper label="경로 추적" />
        </TabsWrapper>
    );
}