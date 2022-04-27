import React, { useCallback, useEffect, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButtom,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export interface DataProps extends TransactionsCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    console.log(transactions);
    const transactionFormatted: DataProps[] = transactions.map(
      (item: DataProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const dateFormatted = Intl.DateTimeFormat("bt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: dateFormatted,
        };
      }
    );
    setData(transactionFormatted);
  }
  useEffect(() => {
    loadTransactions();

    // const dataKey = "@gofinance:transactions";
    // const response = AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          <LogoutButtom>
            <Icon name="power" />
          </LogoutButtom>
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
