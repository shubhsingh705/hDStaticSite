import React from "react"
import {Tabs, Tab, Box} from "@mui/material"

function Tabscomponent({selectedTab, setSelectedTab}){
    return(
        <Box
            sx={{
                width:'100%',
                backgroundColor:'##b5b5b5'
            }}
        >
            <Tabs
                value={selectedTab}
                onChange={(e, newValue) => setSelectedTab(newValue)}
                variant="scrollable"
                textColor="primary"
                
                scrollButtons="auto"
            >
                <Tab label="All Categories" value={0} />
                <Tab label="Company" value={1} />
                <Tab label="Tech" value={2} />
            </Tabs>
        </Box>
    )
}

export default Tabscomponent