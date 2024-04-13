// src/components/UserRequestTable.tsx
import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Descriptions, TableColumnsType } from "antd";
import axios from "axios";
import { fetchUserRequest } from "../redux/reducers/formTypeSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { UserRequestModalContent } from "./UserRequestModalContent";

interface UserRequest {
  id: number;
  title: string;
  description: string;
  created_by: any;
  current_approval_level: number;
  completed: boolean;
  user_request_approvals: any[];
  // Add more fields as needed
}

const UserRequestTable: React.FC = () => {
  const userRequests = useAppSelector(
    (state: any) => state.formType?.requestList
  );
  const user = useAppSelector((state: any) => state.formType?.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);
  useEffect(() => {
    console.log(user);
    
  }, [user]);
  
  
  const columns: TableColumnsType<UserRequest> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      render: (value: any, record: UserRequest, index: number) => record.created_by?.username,
      sortOrder:"ascend",
      sorter: (a, b) => a.created_by - b.created_by,

    },
    {
      title: "Current Approval Status",
      dataIndex: "current_approval_level",
      key: "current_approval_level",
      render: (text: any, record: UserRequest) => `${record.user_request_approvals.filter((x:any)=>x.signature)?.length}/${record.user_request_approvals.length}`
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => <span>{completed ? "Yes" : "No"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: UserRequest) => (
        <Space size="middle">
          {record.created_by?.id != user.id && (
            <Button
              type="primary"
              onClick={() =>
                modal.info({
                  content: <UserRequestModalContent userRequest={record} />,
                })
              }
            >
              View
            </Button>
          )}
          {record.created_by?.id == user.id && (
            <Button
              type="primary"
              onClick={() => navigate(`/request/edit/?id=${record.id}`)}
            >
              Edit
            </Button>
          )}
          {record.user_request_approvals.find(
            (x: any) => x.users.id == user.id
          ) && (
            <Button
              type="primary"
              onClick={() =>
                modal.confirm({
                  content: "Are you sure you've verify this request content?",
                  onOk: () => {},
                  okText:"Approve",
                  cancelText:"reject"
                })
              }
            >
              Approve
            </Button>
          )}
          {/* Add more action buttons as needed */}
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-2">
      <div className="flex w-full justify-end items-end">
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/request/new`)}
        >
          Make New Request
        </Button>
      </div>
      <Table sortDirections={["ascend","descend"]} showSorterTooltip columns={columns} dataSource={userRequests?.results} rowKey="id" />
      {contextHolder}
    </div>
  );
};

export default UserRequestTable;
