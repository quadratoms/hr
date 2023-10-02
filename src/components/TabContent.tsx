import {
  Button,
  Card,
  Form,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DownloadOutlined,
} from "@ant-design/icons";
import type { CollapseProps, FormListFieldData } from "antd";
import axios from "axios";
import { SimpleForm } from "./SimpleForm";
import { QuestionForm } from "./QuestionForm";
import { initvalue } from "./initvalue";

interface PD {
  title: String;
  name: String;
  fixed?: Boolean;
  smallText?: String;
}

export const TabContent: React.FC = () => {
  const [personalDetaillist, setPersonalDetailList] = useState<PD[]>([
    { name: "firstName", title: "First Name", fixed: true },
    { name: "lastName", title: "Last Name", fixed: true },
    { name: "emailId", title: "Email", fixed: true },
    { name: "phoneNumber", title: "Phone", fixed: true },
    { name: "nationality", title: "Nationality", fixed: true },
    { name: "currentResidence", title: "Current Resident", fixed: true },
    { name: "idNumber", title: "ID Number", fixed: true },
    { name: "dateOfBirth", title: "Date of Birth ", fixed: true },
    { name: "gender", title: "Gender", fixed: true },
  ]);

  const [profileDetails, setProfileDetails] = useState<PD[]>([
    { name: "education", title: "Education", fixed: true },
    { name: "experience", title: "Experience", fixed: true },
    { name: "resume", title: "Resume", fixed: true },
  ]);

//   const [question, setQuestion] = useState<CollapseProps["items"]>([
//     {
//       key: 1,
//       label: "idjjdj",
//       children: <QuestionForm />,
//     },
//   ]);

  const [modal, contextHolder] = Modal.useModal();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    if (!values.errorFields) {
      axios
        .put(
          "https://stoplight.io/mocks/quadratoms/testhr/247910535/api/1/programs/1/application-form", //replace with env data
          {
            data: {
              ...initvalue,
              attributes: { ...initvalue.attributes, ...values },
            },
          },
          {}
        )
        .then((res) => {
        //   console.log(res.data);
          modal.success({ content: "successful", title: "save" });
        });
    }
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // initialValues={initvalue}
        onFinish={onFinish}
        onFinishFailed={onFinish}
        autoComplete="off"
      >
        <Space direction="vertical" size={20}>
          <Card
            title="Upload cover image"
            headStyle={{ background: "#D0F7FA" }}
            style={{ width: 335 }}
          >
            <Form.Item
              name="coverImage"
              valuePropName="fileList"
              noStyle
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                if (e.fileList && e.fileList.length) {
                  return e.fileList;
                }
                return [{ url: e }];
              }}
            >
              <Upload
                style={{ background: "white" }}
                name="logo"
                listType="picture"
                className="flex-col flex items-center  text-center"
              >
                <p className="ant-upload-drag-icon">
                  <DownloadOutlined />
                </p>
                <p className="ant-upload-text font-bold">Upload cover image</p>
                <p className="ant-upload-hint ">
                  16:9 ratio is recommended. Max image size 1mb
                </p>
              </Upload>
            </Form.Item>
          </Card>

          <Card
            title="Personal Information"
            headStyle={{ background: "#D0F7FA" }}
            style={{ width: 335 }}
          >
            {personalDetaillist.map((item, index) => (
              <>
                <SimpleForm
                  key={`prof${index}`}
                  statusText="internalUse"
                  parent="personalInformation"
                  name={item.name}
                  title={item.title}
                />
                <hr />
              </>
            ))}
          </Card>
          <Card
            title="Profile"
            headStyle={{ background: "#D0F7FA" }}
            style={{ width: 335 }}
          >
            {profileDetails.map((item, index) => (
              <>
                <SimpleForm
                  key={`prof${index}`}
                  statusText="mandatory"
                  parent="profile"
                  name={item.name}
                  title={item.title}
                />
                <hr />
              </>
            ))}
          </Card>

          <Card
            title="Additional questions"
            headStyle={{ background: "#D0F7FA" }}
            style={{ width: 335 }}
          >
            <Form.List name={"personalQuestions"}>
              {(fields, { add, remove }) => (
                <Space size={20} direction="vertical" className="w-full">
                  {fields.map((field) => (
                    <QuestionForm field={field} remove={remove} />
                  ))}
                  <Button
                    className="mt-5"
                    type="dashed"
                    onClick={() => add()}
                    block
                  >
                    + Add Item
                  </Button>
                </Space>
              )}
            </Form.List>
          </Card>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="bg-green-600" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
       {contextHolder}

    </div>
  );
};

export default TabContent;


