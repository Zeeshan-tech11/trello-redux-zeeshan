import React, { Component } from 'react'
import { getChecklist,createCheckList,deletchecklist,deleteCHeckitem,createCheckItem} from '../api'
import { connect } from 'react-redux'
import { Box, Heading ,Checkbox,Input,Button,ListItem, List, Flex} from '@chakra-ui/react'
import { DeleteIcon} from '@chakra-ui/icons'

class CheckList extends Component {
      constructor(props) {
        super(props)
      
        this.state = {
           loader:true
        }
      }
    componentDidMount(){
        let {cardId}=this.props
        console.log(cardId);
        let {getchecklist}=this.props
        getchecklist()(cardId).then((res)=>{
            this.setState({
                loader:false
            })
        })
    }
  handleCreate=(e)=>{
    e.preventDefault()
    let name=(e.target['0'].value);
    
    if(!name || !name.trim()){
      return
    }
    
    let {cardId,createchecklist}=this.props
   createCheckList(cardId,name).then(res=>{
    createchecklist()(res)
    e.target['0'].value=""
    this.setState({
      loader:false
    })
   })
  }
  handleCheckDel=(checkid)=>{
     let {deleteChecklist}=this.props
      deletchecklist(checkid).then(()=>{
        deleteChecklist()(checkid)
      })
  }
  handleItemdel=(listid,itemid,idx)=>{
    let {delcheckItem}=this.props
    deleteCHeckitem(listid,itemid).then(()=>{
      delcheckItem()(listid,idx)
      this.setState({
        loader:false
      })
    })
  }
  handelSubmit = (e,id) => {
    e.preventDefault()
    let name=(e.target['0'].value);

    if(!name || !name.trim()){
      return
    }
    console.log("outside if");
   console.log(name,'nameee');
    let {addcheckItem} = this.props;  
    createCheckItem(id,name).then((res) => { 
      e.target['0'].value=""
      addcheckItem()(id,res)
      this.setState({
        loader:false
      })
    });
  };
  render() {
    let {checklists,name,checkItems}=this.props
    console.log(checklists,'checkkkk');
    return (
      <>
      <Heading as='h2' size='3xl' m="10">
    {name}
  </Heading>
      <div className='left-check'>
      <Heading as='h3' size='lg'>
    CheckList
  </Heading>
     <div className='check-list'>
       {
        checklists.map(list=>(
          <Box bg='grey' w='100%' p={4} color='teal'>
          <Box style={{width:'100%',backgroundColor:'skyblue',padding:5,borderRadius:8}} >
          <Box style={{width:'100%'}} >  
        
          <Flex justify="space-between" align="center" style={{width:455}}>
          <Heading as='h4' size='lg'> {list.name}</Heading>
          <DeleteIcon onClick={(e)=>this.handleCheckDel(list.id)} w={6} h={6} /> 
          </Flex>
          </Box>
          </Box>
          {checkItems[list.id]?checkItems[list.id].map((item,idx)=>(
            <List>
            <ListItem p={2} >
            <Flex justify="space-between" align="center" >
            <Checkbox color="maroon" >
            {item?item.name:""}
            </Checkbox>
            <DeleteIcon color="red" onClick={(e)=>this.handleItemdel(list.id,item.id,idx)} w={6} h={6} /> 
            </Flex>
          </ListItem>
          </List>
          )):""}
          <form onSubmit={(e)=>this.handelSubmit(e,list.id)}>
          <input
            placeholder="add check Item"
          />
          <button type='submit' style={{ background: "maroon", color: "skyblue", padding: 2 }} >create checkItems</button>
          </form>
        </Box>
        
        ))
       }
       </div>
      </div>
             <form onSubmit={this.handleCreate}>
            <Input name="boardName" placeholder="Type the checklist name" size="lg"/>
            <Button
            type='submit'
              m=".8rem"
              colorScheme="teal"
              variant="solid"
            >
                Create new checklist
            </Button>
            </form>
      </>
    )
  }
}
const mapStatetoprops=state=>{
    return {
       checklists:state.boards.checklists,
       checkItems:state.boards.checkItems
    }
}
const mapDispatchtoProps=(dispatch)=>{
    return {
        getchecklist:()=>{
            return (cardId)=>{
               return getChecklist(cardId).then(res=>{
                    dispatch({type:'ADD_CHECKLIST',checklists:res})
                    return res
                })
            }
        },
        createchecklist:()=>{
          return (checklist)=>{
            dispatch({type:'CREATE_CHECKLIST',checklist})
          }
        },
        deleteChecklist:()=>{
          return (id)=>{
            dispatch({type:'DEL_CHECKLIST',id})
          }
        },
        delcheckItem:()=>{
          return (id,index)=>{
            dispatch({type:"DEL_CHECKITEMS",id,index})
          }
        },
        addcheckItem:()=>{
          return (id,item)=>{
            dispatch({type:"ADD_CHECK_ITEM",item,id})
          }
        }
    }
}
export default connect(mapStatetoprops,mapDispatchtoProps)(CheckList)

