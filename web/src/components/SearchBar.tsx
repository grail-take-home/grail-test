import React from "react";
import { TextInput } from "@mantine/core";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";

interface ISearchBarProps {
  value: string;
  onChange: (updatedValue: string) => void;
  disabled?: boolean;
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="w-72">
      <TextInput
        icon={<MagnifyingGlassIcon />}
        radius="xl"
        size="md"
        placeholder="Filter patients by ID"
        rightSectionWidth={42}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
