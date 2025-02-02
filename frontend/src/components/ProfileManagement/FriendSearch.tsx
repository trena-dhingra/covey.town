import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Spacer,
  useToast
} from "@chakra-ui/react";

import {findAllUsersByUserName, searchUserByEmail, User} from "../../graphql/queries";


export default function FriendSearch(): JSX.Element {



  const history = useHistory();
  const { user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();

  useEffect(() => {
    const findUser = async () => {
      await searchUserByEmail(user.email);
    }
    findUser();
  });

  const handleSearch = async () => {
    let userList;
    const findUserByName = async (userName: string) => {
      if (!userName || userName.length === 0) {
        toast({
          title: 'Please enter a username',
          status: 'error',
          isClosable: true,
        });
        return;
      }
      userList = await findAllUsersByUserName(userName);
      if (userList.length === 0) {
        toast({
          title: `No user found with username ${userName}`,
          status: 'error',
          isClosable: true,
        });
        return;
      }
      setUsers(userList);
      onOpen();
    }
    findUserByName(username);
  };

  return (
    <>
      <InputGroup size='md'>
        <Input pr='4.5rem' onChange={(e) => setUsername(e.target.value)} placeholder='Search for Covey Users' />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' colorScheme='blue' size='sm' onClick={handleSearch}>
            Search{" "}
          </Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered  scrollBehavior="inside">
          <ModalOverlay />
            <ModalContent>
              <ModalHeader>Users</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mt={5} w='90%'>
                      {users.map((userObj) => (
                        <Box bg="white" p={5} color="black" key={userObj.id} borderWidth="1px" borderRadius="lg" >
                          <Flex>
                            <Text textAlign="left" onClick={()=>{history.push(`/users/${userObj.username}`);}}>{userObj.username}</Text>
                              <Spacer/>
                          </Flex>
                        </Box>
                      ))}
                  </Box>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
