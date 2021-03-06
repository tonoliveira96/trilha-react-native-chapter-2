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
import { useAuth } from "../../hooks/auth";

export interface DataProps extends TransactionsCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
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
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    colletion: DataProps[],
    type: "positive" | "negative"
  ) {
    const colectionFilttered = colletion.filter(
      (transaction) => transaction.type === type
    );

    if (colectionFilttered.length === 0) {
      return 0;
    }

    const lasTransaction = new Date(
      Math.max.apply(
        Math,
        colectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${lasTransaction.getDate()} de ${lasTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinance:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

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

        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
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

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval =
      lastTransactionEntries === 0
        ? "N??o h?? transa????es"
        : `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? `N??o h?? transa????es`
            : `??ltima sa??da dia ${lastTransactionExpensive}`,
      },
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? "N??o h?? transa????es"
            : `??ltima entrada dia ${lastTransactionEntries}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
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
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Ol??,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButtom onPress={signOut}>
                <Icon name="power" />
              </LogoutButtom>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              amount={highlightData?.entries?.amount}
              title="Entradas"
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              amount={highlightData?.expensive?.amount}
              title="Sa??das"
              lastTransaction={highlightData.expensive.lastTransaction}
              type="down"
            />
            <HighlightCard
              amount={highlightData?.total?.amount}
              title="Total"
              lastTransaction={highlightData.total.lastTransaction}
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
