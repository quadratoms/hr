import React from "react";
import { Divider, Badge } from "antd";

export interface UserRequestModalContentProps {
  userRequest: any; // Replace 'any' with the actual type of userRequest data
}

export const UserRequestModalContent: React.FC<UserRequestModalContentProps> = ({ userRequest }) => {
  return (
    <div
    >
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Request Details</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Title:</h3>
          <p className="text-gray-700">{userRequest.title}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Description:</h3>
          <p className="text-gray-700">{userRequest.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Created By:</h3>
          <p className="text-gray-700">{userRequest.created_by.username}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Current Approval Level:</h3>
          <p className="text-gray-700">{userRequest.current_approval_level}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Completed:</h3>
          <p className="text-gray-700">{userRequest.completed ? 'Yes' : 'No'}</p>
        </div>

        <Divider className="my-6" />

        <h2 className="text-2xl font-bold mb-4">Form Fields</h2>
        <ul className="list-disc pl-6">
          {userRequest.user_request_form_v.map((field: any) => (
            <li key={field.id} className="text-gray-700">{field.label}: {field.field_value}</li>
          ))}
        </ul>

        <Divider className="my-6" />

        <h2 className="text-2xl font-bold mb-4">Approvals</h2>
        <ul>
          {userRequest.user_request_approvals.map((approval: any) => (
            <li key={approval.id} className="mb-2">
              <span className="font-semibold text-lg">{approval.users.username}</span>
              {approval.signature ? (
                <Badge status="success" text="Approved" />
              ) : (
                <Badge status="error" text="Not Approved" />
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
