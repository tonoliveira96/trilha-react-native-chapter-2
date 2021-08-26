import React, { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
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

import { CategorySelect } from "../CategorySelect";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  function handleTransactionTypeSelectet(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleModalCategoryOpen() {
    setCategoryModalOpen(true);
  }

  function handleModalCategoryClose() {
    setCategoryModalOpen(false);
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
          <CategorySelectButton
            title={category.name}
            onPress={handleModalCategoryOpen}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleModalCategoryClose}
        />
      </Modal>
    </Container>
  );
}
