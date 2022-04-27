import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import uuid from "react-native-uuid";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const navigation = useNavigation()
  const dataKey = "@gofinance:transactions";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelectet(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleModalCategoryOpen() {
    setCategoryModalOpen(true);
  }

  function handleModalCategoryClose() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de trasação!");
    }
    if (category.key === "category") {
      return Alert.alert("Selecione a categoria!");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    console.log(newTransaction);

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset()
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsType>
              <TransactiontypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelectet("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactiontypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelectet("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsType>
            <CategorySelectButton
              title={category.name}
              onPress={handleModalCategoryOpen}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleModalCategoryClose}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
