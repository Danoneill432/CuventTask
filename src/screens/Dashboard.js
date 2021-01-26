import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

const Dashboard = ({ route, navigation }) => (
  <Background>
    <Logo />
    <Header>Personal Invite Code</Header>
    <Paragraph>
     This invite code can be used to invite other people to the app {"\n"}{"\n"}

     <Header>{JSON.stringify(route.params.inviteCode)}</Header>
    </Paragraph>
    <Button
      mode="outlined"
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
      }
    >
      Logout
    </Button>
  </Background>
)

export default Dashboard
