import React, { Component } from "react";
import { Keyboard } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons as Icon } from "@expo/vector-icons";

import api from "../../services/api";

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
} from "./styles";

interface GithubResponse {
  data: {
    name: string;
    login: string;
    bio: string;
    avatar_url: string;
  };
}

export default class Main extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      newUser: "",
      users: []
    };
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    const response: GithubResponse = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    };

    this.setState({ users: [...users, data], newUser: "" });

    Keyboard.dismiss();
  };

  render() {
    const { users, newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            value={newUser}
            placeholder="Adicionar usúario"
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
