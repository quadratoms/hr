import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import React, { useState } from "react";

interface DynamicFormTypeProps{
    key:number;
    restField:any
    name:number
    remove:(index: number | number[])=>void
}

const DynamicFormType: React.FC<DynamicFormTypeProps>= ({key, restField, name, remove=()=>{}}) =>{
    const [type, setType] = useState("")
  return (
    <Space
      key={key}
      style={{
        display: "flex",
        marginBottom: 8,
        alignItems: "center",
      }}
      align="baseline"
    >
      <Form.Item
        {...restField}
        name={[name, "label"]}
        //   fieldKey={[fieldKey, 'label']}
        label="Field Label"
        rules={[
          {
            required: true,
            message: "Field label is required",
          },
        ]}
      >
        <Input placeholder="Label" />
      </Form.Item>
      <Form.Item
        {...restField}
        name={[name, "field_type"]}
        //   fieldKey={[fieldKey, 'fieldType']}
        label="Field Type"
        rules={[
          {
            required: true,
            message: "Field type is required",
          },
        ]}
        
      >
        <Select
        onChange={(value:string)=>setType(value)}
          defaultValue=""
          //   style={{ width: 120 }}

          options={[
            { value: "", label: "Select type" },
            { value: "CharField", label: "CharField" },
            { value: "ChoiceField", label: "ChoiceField" },
            {
              value: "IntegerField",
              label: "IntegerField",
            },
            { value: "DateField", label: "DateField" },
            { value: "EmailField", label: "EmailField" },
            {
              value: "DecimalField",
              label: "DecimalField",
            },
            {
              value: "BooleanField",
              label: "BooleanField",
            },
            { value: "TextField", label: "TextField" },
          ]}
        />
      </Form.Item>
      {type == "ChoiceField" &&
        
      <Form.Item
        {...restField}
        name={[name, "options"]}
        //   fieldKey={[fieldKey, 'label']}
        label="Options"
        rules={[
          {
            required: false,
          },
        ]}
        help="Options Seperated by comma"
      >
        <Input placeholder="Write options" />
      </Form.Item>
      }
      <Form.Item
        {...restField}
        name={[name, "is_required"]}
        //   fieldKey={[fieldKey, 'label']}
        label="Required"
      >
        <Checkbox />
      </Form.Item>
      <Button
        type="default"
        color="blue"
        onClick={() => remove(name)}
        style={{
          marginLeft: "8px",
          background: "blue",
          color: "white",
        }}
      >
        Remove
      </Button>
    </Space>
  );
}

export default DynamicFormType;
