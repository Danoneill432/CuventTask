import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { gql, useMutation } from '@apollo/client';
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { inviteValidator } from '../helpers/inviteValidator'

const ADD_USER = gql`
  mutation AddUser( $email: String!, $password: String!,$inviteCode: String!) {
    createUser(email: $email, password: $password, inviteCode: $inviteCode) {
      id
      email
      password
      inviteCode
    }
  }
`;

const RegisterScreen = ({ navigation }) => {
  const [inviteCode, setInvite] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [AddUser, { data }] = useMutation(ADD_USER);

  const onSignUpPressed = async () => {
    const inviteError = inviteValidator(inviteCode.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || inviteError) {
      setInvite({ ...inviteCode, error: inviteError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    await AddUser({ variables: { inviteCode: inviteCode.value, email: email.value, password: password.value } }).then((data) => {
      setInvite({ ...inviteCode, error: '' })
      setEmail({ ...email, error: '' })
      setPassword({ ...password, error: '' })

      console.log(data.data);

      navigation.navigate('Dashboard', { inviteCode: data.data.createUser.inviteCode })

    }).catch((err) => {
      if(err.toString().includes("Email")){
      setEmail({ ...email, error: err.toString() });
      } else {
        setInvite({ ...inviteCode, error: err.toString() });
      }
    });

    // navigation.reset({
    //   index: 0,
    //   routes: [{ invite: 'Dashboard' }],
    // })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Invite Code"
        returnKeyType="next"
        value={inviteCode.value}
        onChangeText={(text) => setInvite({ value: text, error: '' })}
        error={!!inviteCode.error}
        errorText={inviteCode.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default RegisterScreen
