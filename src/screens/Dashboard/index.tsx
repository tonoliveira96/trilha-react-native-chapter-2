import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionsCardProps,
} from "../../components/TransactionCard";
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
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataProps extends TransactionsCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataProps[] = [
    {
      id: '1',
      type: "positive",
      amount: "R$ 12.000,00",
      title: "Desnvolvimento de site",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "10/08/2021",
    },
    {
      id: '2',
      type: "negative",
      amount: "R$ 400,00",
      title: "Aluguel",
      category: {
        icon: "shopping-bag",
        name: "Casa",
      },
      date: "10/08/2021",
    },
    {
      id: '3',
      type: "negative",
      amount: "R$ 40,00",
      title: "Pizza",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
      date: "10/08/2021",
    }
  ];
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

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
