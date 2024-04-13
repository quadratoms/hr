import React, { useEffect } from "react";
import { useMemo, useRef, useState } from "react";
import { Select, SelectProps, Spin } from "antd";
import debounce from "lodash/debounce";
import isEqual from 'lodash/isEqual';


export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: any;
  debounceTimeout?: number;
  useOption?: ValueType[];
}

export function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  useOption = [],
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  useEffect(() => {
	// Check if the options have actually changed before updating the state
	if (!isEqual(options, useOption)) {
	  setOptions(useOption);
	  setFetching(false);
	}
  }, [useOption, options]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
	  console.log(value);
	  
      fetchOptions(value);
      // fetchOptions(value).then((newOptions) => {
      // 	if (fetchId !== fetchRef.current) {
      // 		// for fetch callback order
      // 		return;
      // 	}

      // 	setOptions(newOptions);
      // 	setFetching(false);
      // });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}
