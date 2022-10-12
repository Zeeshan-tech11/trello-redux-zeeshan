import React, { Component } from 'react'
import { getBoards,createBoard } from '../api'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {
    Badge,
    Text,
    HStack,
    Box,
    Heading,
    Flex,
    Input,
    Button
  } from "@chakra-ui/react";
 class Boards extends Component {
    componentDidMount(){
     let {getboards} =this.props
     getboards()()
    }
    handleCreate = (e) => {
      e.preventDefault()
      let name=(e.target['0'].value);
      let {createboard,getboards}=this.props
      createboard()(name).then(() => {
        getboards()()
      });
    };
  render() {
    let {boardsData}=this.props
    return (
    <div style={{ width: "80%", margin: "0 auto" }}>
        <HStack align="center" spacing="1.5rem">
          <Badge fontSize="1.5rem" variant="solid" colorScheme="green">
            T
          </Badge>
          <Text fontSize="3xl">trello Workspace</Text>
        </HStack>
        <Flex wrap="wrap">
          <Box
          boxShadow='dark-lg'
            
            w="300px"
            p={2}
            h="150px"
            color="grey"
            m=".8rem"
            borderRadius="8px"
          > <form onSubmit={this.handleCreate}>
            <Input name="boardName" placeholder="Type the board name" size="lg" />
            <Button
             type="submit"
              m=".8rem"
              colorScheme="teal"
              variant="solid"
            >
                Create new Board
            </Button>
            </form>
          </Box>
          {boardsData.map((board) => (
            <Link to={`/board/${board.id}`}>
              <Box
                id={board.id}
                w="300px"
                p={2}
                h="150px"
                bg="maroon"
                color="white"
                m=".8rem"
                borderRadius="8px"
                backgroundImage={`url(${board.prefs.backgroundImage})`}
                backgroundSize="300px"
                style={{ objectFit: "contain" }}
              >
                <Heading>{board.name}</Heading>
              </Box>
              </Link>

          )
          )
          }
        </Flex>
      </div>
    );
  }
}
const mapStatetoprops=state=>{
    return {
       boardsData:state.boards.boardsdata
    }
}
const mapDispatchtoProps=(dispatch)=>{
    return {
        getboards:()=>{
            return ()=>{
                getBoards().then(res=>{
                    dispatch({type:'ADD_BOARDS',boards:res})
                })
            }
        },
        createboard:()=>{
            return (name)=>{
              return createBoard(name)
            }
        }
    }
}
export default connect(mapStatetoprops,mapDispatchtoProps)(Boards)
