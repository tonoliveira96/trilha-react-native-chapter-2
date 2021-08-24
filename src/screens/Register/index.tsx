import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactiontypeButton } from "../../components/Form/TransactionTypeButton";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsType,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelectet(type: "up" | "down") {
    setTransactionType(type);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Valor" />
          <TransactionsType>
            <TransactiontypeButton
              title="Income"
              type="up"
              onPress={() => handleTransactionTypeSelectet("up")}
              isActive={transactionType === "up"}
            />
            <TransactiontypeButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionTypeSelectet("down")}
              isActive={transactionType === "down"}
            />
          </TransactionsType>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
