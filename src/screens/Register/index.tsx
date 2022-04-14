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
import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  amount: number;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionTypeSelectet(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleModalCategoryOpen() {
    setCategoryModalOpen(true);
  }

  function handleModalCategoryClose() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder="Valor"
            keyboardType="numeric"
          />
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

        <Button title="Enviar" onPress={() => handleSubmit(handleRegister)} />
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
