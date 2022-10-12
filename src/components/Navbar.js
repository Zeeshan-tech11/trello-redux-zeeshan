import React, { Component } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <HStack style={{ width: '80%', margin: '0 auto' }}>
        <Link to ="/">
        <Button leftIcon={<ArrowBackIcon />} colorScheme="teal">
          Home
        </Button>
        </Link>
        <h1
          style={{
            fontSize: '2rem',
            textAlign: 'center',
            margin: '2rem',
            background: 'maroon',
            color: 'white',
            width: '100%',
          }}
        >
        
          Welcome to Trello
        </h1>
      </HStack>
    );
  }
}
