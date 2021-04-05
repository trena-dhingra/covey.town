import React from 'react';
import {
    Box,
    Text,
    Flex,
    Button,
    Divider,
    Stack,
    HStack,
    Spacer,
    useToast
  } from "@chakra-ui/react"
  
const friendList = ['friend one', 'friend two', 'friend three','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
const friendRequestList = ['request one', 'request two', 'request three','4','5','6','7','8','9','10','11','12'];

function FriendsPage(): JSX.Element {
  const toast = useToast();
  const toastWindow = () => {
    toast({
            title: "Coming soon!",
            isClosable: true,
            
          })  
  }
  return (
    <>
      <Flex width='full' align='center' justifyContent='center'>
        <Box
          p={2}
          w='90vw'
          h='80vh'
          mt={50}
          paddingLeft="10%"
        >
          <Stack direction={["column", "row"]} spacing='10px' >
            <Box w='40%'>
              <Text className='bold-text' color='blue.500' fontSize="5xl"> Friend List</Text>
              <Box h='60vh' bg='gray.100' boxShadow='lg' overflowY='auto'>
                <Flex align='center' justifyContent='center'>
                  <Box mt={5} w='90%'>
                      {friendList.map((friend) => (
                        <Box bg="white" p={5} color="black" key={friend} borderWidth="1px" borderRadius="lg" >
                          <Flex>
                            <Text textAlign='left'>{friend}</Text>
                              <Spacer/>
                            <Button onClick={toastWindow} textAlign='right' >Invite</Button> 
                          </Flex>
                        </Box>
                      ))}
                  </Box>
                </Flex> 
              </Box>
            </Box>

            <Box w='35%' marginLeft="10% !important" right="0">
              <Text className='bold-text' color='blue.500' fontSize="5xl"> Friend Requests</Text>
              <Box h='60vh' boxShadow='lg' overflowY="auto">
                <Flex align='center' justifyContent='center' >
                  <Box mt={5} w='90%'>
                    <Divider orientation='horizontal'/>
                    <Stack>
                    {friendRequestList.map((friend) => (
                      <Box bg="white" p={5} color="black" key={friend} borderWidth="1px" borderRadius="lg">
                        <Flex>
                          <Text textAlign='left'>{friend}</Text>
                           <Spacer />
                          <HStack spacing="24px">
                            <Button size='md' color='blue.500'> <span>&#10003;</span> </Button>
                            <Button size='md' color='blue.500'> <span>&#10005;</span> </Button>
                          </HStack>
                        </Flex>                          
                      </Box>
                      ))}
                    </Stack>
                  </Box>
                </Flex>
                </Box>
              </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default FriendsPage;



