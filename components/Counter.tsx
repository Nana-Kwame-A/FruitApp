import React from "react";
import { Minus, Plus } from "@tamagui/lucide-icons";
import { Button, Input, Paragraph, View, XStack } from "tamagui";

interface Props {
  value: string;
  setCount: (count: number) => void;
}

export default function Counter(props: Props) {
  const { value, setCount } = props;

  return (
    <XStack
      bg="pink"
      overflow="hidden"
      br="$6"
    >
      <Button
        bg="pink"
        pressStyle={{
          opacity: 0.5
        }}
        icon={<Minus size="$icon.md" />}
        onPress={() => {
          if (Number(value) !== 0) {
            setCount(Number(value) - 1);
          }
        }}
      />
      <Input
        keyboardType="numeric"
        value={value}
        onChangeText={(value) => {
          setCount(Number(value));
        }}
        bg="transparent"
        borderColor={"transparent"}
        fontSize={"$6"}
        fontWeight="bold"
      />
      <Button
        bg="pink"
        pressStyle={{
          opacity: 0.5
        }}
        icon={<Plus size="$icon.md" />}
        onPress={() => {
          setCount(Number(value) + 1);
        }}
      />
    </XStack>
  );
}
