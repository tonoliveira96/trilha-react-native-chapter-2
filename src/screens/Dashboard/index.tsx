import React from "react";

import { SafeAreaView, Text } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  Container,
  Header,
  UserInfo,
  UserPhoto,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  IconPower,
  HighlightCards,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserPhoto
              source={{
                uri: "https://avatars.githubusercontent.com/u/43159625?v=4",
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Ton</UserName>
            </User>
          </UserInfo>
          <IconPower name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          amount="R$ 17.000,00"
          title="Entradas"
          lastTransaction="18 de abril"
          type="up"
        />
        <HighlightCard
          amount="R$ 17.000,00"
          title="Saídas"
          lastTransaction="18 de abril"
          type="down"
        />
        <HighlightCard
          amount="R$ 17.000,00"
          title="Total"
          lastTransaction="18 de abril"
          type="total"
        />
      </HighlightCards>
    </Container>
  );
}
