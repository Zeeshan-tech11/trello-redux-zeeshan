import React, { Component } from "react";
import { VStack, Box, StackDivider,Badge, Flex ,Spinner} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {getCards,createCard,deleteCard} from '../api'
import CheckList from "./CheckList";
 class CardDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader:true,
      openidx:-1
    };
  }
  componentDidMount() {
    let { id,getcards } = this.props;
    getcards()(id).then((data) =>
      this.setState({
        loader:false
      })
    );
  }

  handleCardClick=(e,idx)=>{
    console.log('card clickedd',idx);
    this.setState({
      openidx:idx
    })
  }

  handleClose=()=>{
    this.setState({
      openidx:-1
    })
    return false
  }
  handelSubmit = (e) => {
    e.preventDefault()
    let { id ,getcards,addcard} = this.props;
    let name=(e.target['0'].value);
    e.target['0'].value="";
    console.log(name ,'..name');
    createCard(id, name).then((res) => { 
      console.log(res,'tttt');
      addcard()(res,id)
      this.setState({
        loader:false
      })
    });
  };
  handleCardDel=(ids)=>{
    let {id, getcards} = this.props;
    deleteCard(ids).then(()=>{
    getcards()(id).then((data) =>
      this.setState({
        loader:false,
        openidx:-1
      })
    );
    })
  }
  render() {
    let { loader } = this.state;
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
    let {cards,id}=this.props
    let {openidx}=this.state
    console.log(cards,'..cards');
    return (
      <div>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {cards[id]?cards[id].map((data,idx) => {
            
            return(<>
            <Flex>
            <Box key={idx} w="95%" m="0 auto" onClick={()=>this.setState({
              openidx:idx
            })} >
              
              <Badge p="2" colorScheme='green'>{data.name}</Badge>
            </Box>
            <DeleteIcon style={{cursor:'pointer'}} onClick={()=>this.handleCardDel(data.id)}/>
            </Flex>
            <Modal isOpen={openidx===idx?true:false}  style={{content:{width:500,margin:'0 auto',background:'lightgray'}}} className="model"  >
                <button style={{fontSize:'2rem'}} value={idx} onClick={(e)=>this.handleClose(e)} className="close">X</button>
                <CheckList cardId={data.id} name={data.name}/>
             </Modal>
            </>
          )}):""}
          <form onSubmit={(e)=>this.handelSubmit(e)}>
          <input
            placeholder="add card"
            type="text"
          
          />
          <button type="submit" style={{ background: "skyblue", color: "maroon", padding: 5 }} >create card</button>
          </form>
        </VStack>
      </div>
    );
  }
}
const mapStatetoprops=state=>{
  console.log(state,'..indisplay');
    return {
       cards:state.boards.cards
    }
}
const mapDispatchtoProps=(dispatch)=>{
    return {
        getcards:()=>{
            return (id)=>{
               return getCards(id).then(res=>{
                console.log(res,'...res');
                    dispatch({type:'ADD_CARDS',card:res,id})
                    return res
                })
            }
        },
        addcard:()=>{
          return (res,id)=>{
                dispatch({type:'ADD_CARD',card:res,id})
            }
        }
    }
}
export default connect(mapStatetoprops,mapDispatchtoProps)(CardDisplay)
