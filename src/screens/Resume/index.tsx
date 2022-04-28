import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, SelectIcon, Month } from "./styles";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalBycategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();

  async function loadData() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce(
      (acumulattor: number, expensive: TransactionData) => {
        return (acumulattor += Number(expensive.amount));
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          name: category.name,
          color: category.color,
          totalFormatted,
          total: categorySum,
          percent,
        });
      }
    });
    setTotalBycategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content showsVerticalScrollIndicator={false}
       contentContainerStyle={{
         paddingHorizontal: 24,
         paddingBottom: useBottomTabBarHeight()
       }}
      >

        <MonthSelect>
          <MonthSelectButton>
            <SelectIcon name="chevron-left"/>
          </MonthSelectButton>
            <Month>Abril</Month>
          <MonthSelectButton>
            <SelectIcon name="chevron-right"/>
          </MonthSelectButton>
        </MonthSelect>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>

        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.name}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
