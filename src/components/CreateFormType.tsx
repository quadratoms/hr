// src/components/CreateFormType.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Space, Select, Checkbox } from "antd";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { useLocation } from "react-router-dom";
import { api } from "../hooks/storage";
import DynamicFormType from "./DynamicFormType";

interface DynamicFormField {
  label?: string;
  fieldType?: string;
}

interface CreateFormTypeProps {
  //   onFinish: (values: { name: string; description: string; dynamicFormFields: DynamicFormField[] }) => void;
}

const CreateFormType: React.FC<CreateFormTypeProps> = () => {
  const [form] = Form.useForm();
  const location= useLocation()
  const formTypes = useAppSelector(
    (state: any) => state.formType?.formTypeList.results
  );
  const apiUrl = process.env.REACT_APP_BASE_API;

  const queryParameters = new URLSearchParams(window.location.search);
  const formTypeId = queryParameters.get("formTypeId"); 

  const [initialDynamicFormFields, setInitialDynamicFormFields] = useState<DynamicFormField[]>([]);


  useEffect(() => {
    const initializeFormFields = (selectedFormType: any) => {
      const defaultDynamicFormField = { label: '', fieldType: '' };
      console.log(selectedFormType?.dynamic_form_type);
      
      const dynamicFormFields =
        selectedFormType?.dynamic_form_type.length > 0
          ? selectedFormType?.dynamic_form_type
          : [defaultDynamicFormField];

      form.setFieldsValue({
        name: selectedFormType?.name || '',
        description: selectedFormType?.description || '',
        dynamic_form_type: dynamicFormFields,
      });

      setInitialDynamicFormFields(dynamicFormFields);
    };

    if (formTypeId) {
      console.log(formTypeId, formTypes);
      
      // Fetch details of the selected Form Type for editing
      const selectedFormType = formTypes.find((formType:any) => formType.id == formTypeId);
      initializeFormFields(selectedFormType);
      console.log("init");
      
    } else {
      // Initialize form fields with default values for a new Form Type
      initializeFormFields(null);
    }
  }, [formTypeId, form, formTypes]);

  const handleFinish = async (values: any) => {
    if (formTypeId) {
      api()
      .put(`/formtypes/${formTypeId}/`, values,{
      })
      .then((response) => {
        // console.log("Login successful:", response.data);
        // setUserData(response.data);
        message.success("Form Type created successfully!");
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error creating Form Type:", error);
        message.error("Error creating Form Type");
      });
    } else
    api()
      .post(`${apiUrl}/formtypes/`, values,{
      })
      .then((response) => {
        // console.log("Login successful:", response.data);
        // setUserData(response.data);
        message.success("Form Type created successfully!");
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error creating Form Type:", error);
        message.error("Error creating Form Type");
      });
  };

  return (
    <div className="bg-white p-4">
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Dynamic Form Fields" shouldUpdate>
          {({ getFieldValue }) => {
            const dynamicFormFields: DynamicFormField[] =
              getFieldValue("dynamicFormFields") || [];
            return (
              <Space direction="vertical">
                {/* {dynamicFormFields.map((field, index) => (
                <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...field}
                    name={['dynamicFormFields', index, 'label']}
                    // fieldKey={['dynamicFormFields', index, 'label']}
                    label={`Field ${index + 1}`}
                    rules={[{ required: true, message: 'Field label is required' }]}
                  >
                    <Input placeholder="Label" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={['dynamicFormFields', index, 'fieldType']}
                    // fieldKey={['dynamicFormFields', index, 'fieldType']}
                    label="Type"
                    rules={[{ required: true, message: 'Field type is required' }]}
                  >
                    <Select
      defaultValue="lucy"
      style={{ width: "100%" }}
      options={[{ value: 'lucy', label: 'Lucy' }]}
    />
                  </Form.Item>
                </Space>
              ))} */}
                <Form.List name="dynamic_form_type">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <DynamicFormType key={key} name={name} remove={remove} restField={restField}/>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          Add Dynamic Form Field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Space>
            );
          }}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Form Type
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateFormType;
