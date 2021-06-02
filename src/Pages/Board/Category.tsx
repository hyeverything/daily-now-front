import React ,{useEffect}from 'react'
import {Tabs,Tab,useMediaQuery} from '@material-ui/core';
import { categoryInfo } from 'Interface/Board';
import ChatIcon from '@material-ui/icons/Chat';
import HearingIcon from '@material-ui/icons/Hearing';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ForumIcon from '@material-ui/icons/Forum';
import { useHistory, useLocation } from 'react-router';
import { makeStyles, } from "@material-ui/core/styles";

const useStyles = makeStyles({
     postContainer : {
          flexGrow: 1,
          width: '100%',
          padding: 0
     },
     postContainerMobile: {
         padding: 0,
         margin: 0,
     },
     tabs: {
          margin: '10px 0',
     },
     tabsMobile :{
          '& div': {
               justifyContent: 'space-evenly',
          }
     },
     viewForm: {
          margin: "0 25px" ,
          display: 'flex', 
          alignItems:'flex-end',
     },
   
})
interface CategoryProps { 
     categories: categoryInfo[]
     categoryId :number
     handleCategoryId: any
     pageIndex?: number | null 
}

interface stateType {
     post_id : number,
     category_id: number
}
export default function Category(props: CategoryProps) {
     const classes = useStyles()
     const location = useLocation<stateType>()
     const history = useHistory()
     const isMobile = useMediaQuery("(max-width: 380px)");

     const {categories ,handleCategoryId,categoryId} = props;
     const [value, setValue] = React.useState(0);

     const  iconList = [<ChatIcon />, <ForumIcon />, <HearingIcon />, < InsertEmoticonIcon/>]

     // 게시판 탭 클릭 시, 카테고리 ID 변경
     const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
          setValue(newValue);
          handleCategoryId(newValue)
     };

     const onClickCategory = (categoryId : number) => {  
          history.push(`/board?category=${categoryId}&page=1`)
     }

     useEffect(() => {
          if(location.state){
               setValue(location.state.category_id)
          }else {
               setValue(categoryId)
          }
     }, [categoryId])

     return (
          <>
                 <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    className={isMobile? classes.tabsMobile: classes.tabs}
                    { ...isMobile? {} : {variant : "scrollable", scrollButtons : "on"}}
               >
                    {categories.map( (category,index) => {
                         return (
                              <Tab 
                                   key={index} 
                                   value={category.category_id}
                                   onClick={() => onClickCategory(category.category_id)} 
                                   label={category.category_name} 
                                   icon={iconList[index]} {...a11yProps(index)} 
                              />
                         )
                    })}
               </Tabs>    

          </>
     )
}

function a11yProps(index: any) {
     return {
       id: `scrollable-auto-tab-${index}`,
       'aria-controls': `scrollable-auto-tabpanel-${index}`,
     };
}
