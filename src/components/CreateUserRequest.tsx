// src/components/CreateUserRequest.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Input, Button, Select, message, Space, Spin } from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { djangoToHtmlType } from "../hooks/storage";
import {
  createUserRequest,
  searchUser,
  // fetchUserRequest,
  updateUserRequest,
} from "../redux/reducers/formTypeSlice";
import debounce from "lodash/debounce";
import { DebounceSelect } from "./DebounceSelect";

const { Option } = Select;

interface DynamicFormFieldValue {
  id: number;
  field_value: string;
  label: number; // Assuming it's the ID of the associated DynamicFormField
}

interface CreateUserRequestProps {
  onFinish?: (values: {
    form_type: number;
    title: string;
    description: string;
    created_by: number;
    current_approval_level: number;
    completed: boolean;
    user_request_form_v: DynamicFormFieldValue[];
  }) => void;
}

const CreateUserRequest: React.FC<CreateUserRequestProps> = ({ onFinish }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const formTypes = useAppSelector(
    (state: any) => state.formType?.formTypeList?.results
  );
  const requestList = useAppSelector(
    (state: any) => state.formType?.requestList?.results
  );
  const searchedUser = useAppSelector(
    (state: any) => state.formType?.searchedUser?.results
  );

  const [dynamicFormFields, setDynamicFormFields] = useState<
    DynamicFormFieldValue[]
  >([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");

  useEffect(() => {
    if (id) {
      const requestItem = requestList?.find((x: any) => x.id == id);
      // console.log(requestList, dynamicFormFields, requestItem);
      const convertedObject: any = {};

      requestItem?.user_request_form_v?.forEach((item: any) => {
        convertedObject[item.label] = item.field_value;
      });
      requestItem &&
        form.setFieldsValue({
          ...requestItem,
          dynamic_fields: convertedObject,
        });
    }
  }, [dynamicFormFields, form, id, requestList]);

  const [typeValue, setTypeValue] = useState("");
  useEffect(() => {
    // Fetch available Form Types for the user to choose from
    if (id) {
      const requestItem = requestList?.find((x: any) => x.id == id);

      setDynamicFormFields(
        formTypes?.find((x: any) => x.id == requestItem?.form_type)
          ?.dynamic_form_type
      );
    } else
      setDynamicFormFields(
        formTypes?.find((x: any) => x.id == typeValue)?.dynamic_form_type
      );
  }, [typeValue, form, formTypes, id, requestList]);

  const handleFinish = async (values: any) => {
    console.log(values);
    if (id) {
      values.id = id;
      console.log(values);

      values.approvals = values.approvals?.map((x: any) => ({
        users: x.value,
      }));
      dispatch(updateUserRequest(values));
    } else dispatch(createUserRequest(values));
  };

  return (
    <Form
      className="bg-white p-4"
      form={form}
      onFinish={handleFinish}
      layout="vertical"
    >
      <Form.Item
        label="Form Type"
        name="form_type"
        rules={[{ required: true, message: "Please select a Form Type" }]}
      >
        <Select
          onChange={(x: any) => setTypeValue(x)}
          placeholder="Select a Form Type"
        >
          {formTypes?.map((formType: any) => (
            <Option key={`formtype_${formType.id}`} value={formType.id}>
              {formType.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <Input.TextArea />
      </Form.Item>
      {/* <Form.Item
        label="Created by"
        name="created_by"
        rules={[{ required: true, message: "Please enter the creator" }]}
      >
        <Input />
      </Form.Item> */}
      {/* <Form.Item
        label="Current Approval Level"
        name="current_approval_level"
        rules={[
          {
            required: true,
            message: "Please enter the current approval level",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item> */}
      {/* <Form.Item label="Completed" name="completed" valuePropName="checked">
        <Input type="checkbox" />
      </Form.Item> */}

      {/* Use Form.List to dynamically render dynamic form fields */}
      <Form.List name="dynamic_fields">
        {(fields, { add, remove }) => (
          <>
            {dynamicFormFields?.map((field: any) => (
              <Form.Item
                key={field.key}
                label={`${field.label}`}
                name={`${field.label}`}
                // fieldKey={[field.fieldKey, 'field_value']}
                rules={[
                  {
                    required: field.is_required,
                    message: "This field is required",
                  },
                ]}
              >
                {field.field_type == "ChoiceField" ? (
                  <Select
                    options={field.options
                      .trim()
                      .split(",")
                      .map((x: any) => ({
                        value: x,
                        label: x,
                      }))}
                  />
                ) : (
                  <Input type={djangoToHtmlType(field.field_type)} />
                )}
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>
      {!id && (
        <Form.Item
          key="approvals"
          label="approvals"
          name="approvals"
          // fieldKey={[field.fieldKey, 'field_value']}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <DebounceSelect
            mode="multiple"
            // value={value}
            placeholder="Select users"
            fetchOptions={(search: string) => dispatch(searchUser({ search }))}
            useOption={searchedUser?.map((x: any) => ({
              label: x.username,
              value: x.id,
            }))}
            onChange={(newValue) => {
              console.log(newValue);

              // form.setFieldValue("approvals", newValue?.map((x:any)=>x.value));
            }}
            style={{ width: "100%" }}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Request
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUserRequest;
