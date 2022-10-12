import React, { Component } from 'react'
import { getChecklist} from '../api'
import { connect } from 'react-redux'
import { Box, Heading ,Checkbox,Input,Button,ListItem,ListIcon, List} from '@chakra-ui/react'
import { SettingsIcon} from '@chakra-ui/icons'

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
   
  }
  render() {
    let {checklists,name}=this.props
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
       {
        checklists.map(list=>(
          <Box bg='grey' w='100%' p={4} color='white'>
          <Checkbox >{list.name}</Checkbox>
          {list.checkItems.length>0?list.checkItems.map((item)=>(
            <List>
            <ListItem>
            <ListIcon as={SettingsIcon} color='maroon' />
            {item.name}
          </ListItem>
          </List>
          )):""}
        </Box>
        ))
       }
      </div>
      <form onSubmit={this.handleCreate}>
            <Input name="boardName" placeholder="Type the checklist name" size="lg" />
            <Button
             type="submit"
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
       checklists:state.boards.checklists
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
        }
    }
}
export default connect(mapStatetoprops,mapDispatchtoProps)(CheckList)

