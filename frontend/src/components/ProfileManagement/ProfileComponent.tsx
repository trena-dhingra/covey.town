import React , {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../Styles/Profile.css";
import { useQuery } from '@apollo/client';
import { withRouter, Link } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Button,
  Text,
  Stack,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import FriendSearch from "./FriendSearch";
import { findAllUsers, User,searchUserByEmailQuery } from '../../graphql/queries';


function ProfileComponent(): JSX.Element {
  const { user, isLoading } = useAuth0();
  const [email, setEmail] = useState<string>(user.email);
  const [userName, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [facebookLink,setFacebookLink] = useState<string>("");
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [linkedInLink, setLinkedInLink] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const findAllUsersResult = useQuery(findAllUsers);
  const userInfoResult = useQuery(searchUserByEmailQuery, {
    variables: { email },
  });
  
  useEffect(() => {
    const findUser = async () => {
      if (!userInfoResult.loading) {
        const userInfo = userInfoResult && userInfoResult.data && userInfoResult.data.searchUserByEmailQuery;
        if (userInfo) {
          setUserName(userInfo.username);
          setBio(userInfo.bio);
          setFacebookLink(userInfo.facebookLink);
          setInstagramLink(userInfo.instagramLink);
          setLinkedInLink(userInfo.linkedInLink);
          setLocation(userInfo.location);
          setOccupation(userInfo.occupation);
        }
      } 
    }
    const findAllUsersProfiles = async () => {
      
      if (!findAllUsersResult.loading) {
        const userProfiles = findAllUsersResult.data.users;
        setUsers([...userProfiles]);
      }
    }
    findUser();
    findAllUsersProfiles();
  },[findAllUsersResult,user,userInfoResult]);


  if (isLoading) {
    return <div> Loading... </div>
  }

  return (
   <Flex width='full' align='center' justifyContent='center'>
      <Box
        p={2}
        maxWidth='2000px'
        w='90vw'
        h='80vh'
        mt={50}
        class='box-profile'
      >
        <Stack direction={["column", "row"]} spacing='0px'>
          <Box w='35%' h='60vh' bg='blue.500' boxShadow='lg'>
            <Heading size='md' paddingTop='20px'>
              {" "}
              <Text color='white'>HELLO {userName.toUpperCase()}</Text>
            </Heading>
            <Flex width='full' align='center' justifyContent='center'>
              <Box mt={90}>
                <Text color='white'>{userName.toUpperCase()}</Text>
                <Text color='white'>email: {user.email}</Text>
                <Text color='white'>BIO: {bio}</Text>
                <Text color='white'>LinkedIn link: {linkedInLink}</Text>
                <Text color='white'>Instagram link: {instagramLink}</Text>
                <Text color='white'>facebook link: {facebookLink}</Text>
                <Text color='white'>Location: {location}</Text>
                <Text color='white'>Occupation: {occupation}</Text>
                <Link to='/friendsPage'>
                  {" "}
                  <Button
                  variantColor='teal'
                  variant='outline'
                  type='submit'
                  width='full'
                  mt={4}
                  color='white'
                >
                  Friends
                </Button>
                </Link>
                <Button
                  variantColor='teal'
                  variant='outline'
                  type='submit'
                  width='full'
                  mt={4}
                  color='white'
                >
                  Edit Profile
                </Button>
              </Box>
            </Flex>
          </Box>
          <Box w='65%' h='60vh' bg='white'>
            <Flex width='full' align='center' justifyContent='center'>
              <Box mt={5}>
              <FriendSearch />
              <Divider orientation='horizontal' w='50vw' />
              <Box w='100%'>
              <Text className='bold-text' color='blue.500' fontSize="lg"> Covey Town Users </Text>
              <Box h='50vh' bg='gray.100' boxShadow='lg' overflowY='auto'>
                <Flex align='center' justifyContent='center'>
                  <Box mt={5} w='90%'>
                      {users.map((userProfile) => (
                        <Box bg="white" p={5} color="black" key={userProfile.id} borderWidth="1px" borderRadius="lg" alignItems="center">
                          <Flex>
                          <Button size='md'alignItems="center">
                          <Text textAlign='center'>{userProfile.username}</Text>
                          </Button>
                          <Spacer/>
                          </Flex>
                        </Box>
                      ))}
                  </Box>
                </Flex> 
              </Box>
              </Box>
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default withRouter(ProfileComponent);
