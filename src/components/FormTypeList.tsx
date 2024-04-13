// src/components/FormTypeList.tsx
import React, { useEffect } from "react";
import { Table, Space, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFormTypes } from "../redux/reducers/formTypeSlice";
import { Navigate, useNavigate } from "react-router-dom";

interface FormType {
  id: number;
  name: string;
  description: string;
}

interface FormTypeListProps {
  //   onEdit: (formTypeId: number) => void;
}

const FormTypeList: React.FC<FormTypeListProps> = () => {
  const dispatch = useAppDispatch();
  const formTypes = useAppSelector(
    (state: any) => state.formType?.formTypeList
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFormTypes());
  }, []);
  useEffect(() => {
    console.log(formTypes);
  }, [formTypes]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: FormType) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/formtype/edit/?formTypeId=${record.id}`)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  // const handleEdit = (formTypeId: number) => {
  //   const formType = formTypes.find((type:any) => type.id === formTypeId);
  //   if (formType) {
  //     // setFormTypeToEdit(formType);
  //     // setVisible(true);
  //   }
  // };
  const columns2 = [
    { title: "Label", dataIndex: "label", key: "name" },
    { title: "Field Type", dataIndex: "field_type", key: "description" },
  ];

  return (
    <div className="bg-white p-2">
      <div className="flex w-full justify-end items-end">
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/formtype/new`)}
        >
          Create new Form Type
        </Button>
      </div>

      <Table
        expandable={{
          expandedRowRender: (d: any) => (
            <Table
              className="bg-blue-500 p-2"
              columns={columns2}
              dataSource={d.dynamic_form_type}
              pagination={false}
            />
          ),
        }}
        dataSource={
          formTypes
            ? formTypes?.results?.map((x: any, i: number) => ({
                ...x, // Copy all properties from the original object
                key: i, // Add the 'key' property
              }))
            : []
        }
        // className="bg-blue-500 p-2"
        columns={columns}
        pagination={{ className: "bg-white py-2" }}
      />
    </div>
  );
};

export default FormTypeList;
