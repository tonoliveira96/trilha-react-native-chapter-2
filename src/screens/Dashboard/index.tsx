import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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
  LoadContainer,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";

export interface DataProps extends TransactionsCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactios, setTransactions] = useState<DataProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    console.log(transactions);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataProps[] = transactions.map(
      (item: DataProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

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
    setTransactions(transactionFormatted);
    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setIsLoading(false);
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
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              amount={highlightData?.entries?.amount}
              title="Entradas"
              lastTransaction="18 de abril"
              type="up"
            />
            <HighlightCard
              amount={highlightData?.expensive?.amount}
              title="Saídas"
              lastTransaction="18 de abril"
              type="down"
            />
            <HighlightCard
              amount={highlightData?.total?.amount}
              title="Total"
              lastTransaction="18 de abril"
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactios}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
              showsVerticalScrollIndicator={false}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
