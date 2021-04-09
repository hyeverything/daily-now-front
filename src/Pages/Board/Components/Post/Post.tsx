import React,{useState,useEffect} from 'react'
import axios from 'axios';

import {Container, Tabs,Tab,Typography,Box} from '@material-ui/core';
import { makeStyles, } from "@material-ui/core/styles";
import ChatIcon from '@material-ui/icons/Chat';
import HearingIcon from '@material-ui/icons/Hearing';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PostBox from './Components/PostBox';
import { postInfo } from '../../../../Interface/Post';

const useStyles = makeStyles({
     postContainer : {
          flexGrow: 1,
          width: '100%',
     },
     tabPanel: {

     }
   
})
interface TabPanelProps {
     children?: React.ReactNode;
     index: any;
     value: any;
   }


export default function Post() {
     const classes = useStyles()
     const [value, setValue] = React.useState(0);

     const [isLoading, setIsLoading] = useState(true)
     const [postList, setpostList] = useState<Array<postInfo>>(Object)

     // 게시판 Tab change
     const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
       setValue(newValue);
     };

     // 모든 글 불러오기 
     const handleClickTab = () => {
          axios.get('http://192.168.0.69:8000/api/notice/post_list')
          .then(res => {
               setpostList(res.data)
               setIsLoading(false)
          })
          .catch(function(error) {
               console.log(error);
           })
     }

     useEffect(() => {
          handleClickTab()
     }, [])
     return (
         
          <Container maxWidth="md" className={classes.postContainer}>
               {isLoading ? '로딩중' 
               : 
               <>
                    <Tabs
                         value={value}
                         onChange={handleChange}
                         variant="scrollable"
                         scrollButtons="on"
                         indicatorColor="primary"
                         textColor="primary"
                    >
                         <Tab onClick={handleClickTab} label="종목 토론" icon={<ChatIcon />} {...a11yProps(0)} />
                         <Tab onClick={handleClickTab} label="공유 해요" icon={<HearingIcon />} {...a11yProps(1)} />
                         <Tab onClick={handleClickTab} label="뉴스 공시" icon={<AnnouncementIcon />} {...a11yProps(2)} />
                    </Tabs>

     {/*종목 토론*/}<TabPanel value={value} index={0}>
                         <PostBox postList={postList}/>
                    </TabPanel>
     {/*공유 해요*/}<TabPanel value={value} index={1}>
                    
                    </TabPanel>
     {/*뉴스 공시*/}<TabPanel value={value} index={2}>
                    
                    </TabPanel>
               </>
               }

               </Container>
     )
}

function TabPanel(props: TabPanelProps) {
     const { children, value, index, ...other } = props;
     return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
}
function a11yProps(index: any) {
     return {
       id: `scrollable-auto-tab-${index}`,
       'aria-controls': `scrollable-auto-tabpanel-${index}`,
     };
}