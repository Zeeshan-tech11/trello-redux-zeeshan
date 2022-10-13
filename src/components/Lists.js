import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteIcon } from '@chakra-ui/icons'
import CardDisplay from "./CardDisplay";
import {
  VStack,
  HStack,
  Box,
  Heading,
  Flex,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { Spinner,Button } from "@chakra-ui/react";
import { getLists,makeList,deleteList } from "../api";
 class Lists extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         loader:true
      }
    }
    componentDidMount(){
        let board=(this.props.match.params['id'])
        console.log(board);
        let {getList}=this.props
        getList()(board).then((res)=>{
            this.setState({loader:false})

        })
    }
    handlesubmit = (e) => {
      e.preventDefault()
      let name=(e.target['0'].value);
      let board=(this.props.match.params['id'])
      let {getList}=this.props
      makeList(name,board).then(()=>{
        getList()(board)
        .then((lists) => {
          (e.target['0'].value)=""
          this.setState({
            loader: false,
          });
        })
      }).catch((err) => console.error(err));
  
    };
    handleListDel=(id)=>{
      let board=(this.props.match.params['id'])
      let {getList}=this.props
      deleteList(id).then(()=>{
      getList()(board)
        .then((lists) => {
          this.setState({
            loader: false,
          });
        })
        .catch((err) => console.error(err));
      })
    }
  render() {
    let { loader } = this.state;
    let {lists}=this.props
    if (loader) {
      return (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      );
    }
    return (
      <Box overflow={'scroll'}>
        <Flex>
          {lists.map((list,listindex) => (
            <Box p={2} ml={5} minW="300" boxShadow='2xl' bg="lightgray">
              <Flex align="center" justify="space-between" mb="30px">
                <Heading size="md">{list.name}</Heading>
                <Button m={0} fontSize="4xl" onClick={()=>this.handleListDel(list.id)}>
                <DeleteIcon w={6} h={6} />
                </Button>
              </Flex>
             <CardDisplay id={list.id} index={listindex}/>
            </Box>
          ))}
          <Box minW="300px" p={2}  border='.8px solid grey'>
            <form onSubmit={(e) => this.handlesubmit(e)}>
            <input
              placeholder="create a new list"
              type="text"
            />
            <button
              type="submir"
              style={{ background: "red", color: "white", padding: 5 }}
            >
              create list
            </button>
            </form>
          </Box>
        </Flex>
      </Box>
    );
  }
  }
  const mapStatetoprops=state=>{
    return {
       lists:state.boards.lists
    }
}
const mapDispatchtoProps=(dispatch)=>{
    return {
        getList:()=>{
            return (board)=>{
               return getLists(board).then(res=>{
                console.log(res,'..infecth');
                    dispatch({type:'ADD_LISTS',lists:res})
                    return res
                })
            }
        }
    }
}
export default connect(mapStatetoprops,mapDispatchtoProps)(Lists)

