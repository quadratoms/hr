import {
    Button, Checkbox,
    Collapse,
    Form,
    Input, Select,
    Space
} from "antd";
import React, { useState } from "react";
import {
    BookOutlined,
    CloseOutlined,
    EditOutlined
} from "@ant-design/icons";
import FormItemLabel from "antd/es/form/FormItemLabel";
const {Option}= Select


export const QuestionForm: React.FC<any> = ({ field, remove }) => {
    const [useChoice, SetUseChoice] = useState<String[]>([
        "Dropdown",
        "MultipleChoice",
    ]);
    const [isMultiChoice, SetIsMultiChoice] = useState(false);
    const [title, SetTitle] = useState("New");

    return (
        <Collapse
            defaultActiveKey={1}
            accordion
            items={[
                {
                    id: field.key + "",
                    label: title,
                    extra: <EditOutlined />,
                    children: (
                        <div>
                            <>
                                <>
                                    <FormItemLabel prefixCls="type" label="Type" />
                                    <Form.Item
                                        name={[field.name, "type"]}
                                        labelAlign="left"
                                        rules={[{ required: true, message: "type is required!" }]}
                                    >
                                        <Select
                                            className=""
                                            placeholder="Select a option and change input text above"
                                            allowClear
                                            onChange={(e) => SetIsMultiChoice(useChoice.includes(e))}
                                        >
                                            {[
                                                "Paragraph",
                                                "ShortAnswer",
                                                "YesNo",
                                                "Dropdown",
                                                "MultipleChoice",
                                                "Date",
                                                "Number",
                                                "FileUpload",
                                            ].map((option) => (
                                                <Option key={option} value={option}>
                                                    {option}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </>
                                <>
                                    <FormItemLabel prefixCls="choices" label="Question" />
                                    <Form.Item
                                        name={[field.name, "question"]}
                                        rules={[
                                            { required: true, message: "question is required!" },
                                        ]}
                                    >
                                        <Input
                                            value={title}
                                            onChange={(v) => SetTitle(v.target.value)} />
                                    </Form.Item>
                                </>
                                {isMultiChoice && (
                                    <Form.List name={[field.name, "choices"]}>
                                        {(fields, { add, remove }) => (
                                            <>
                                                <FormItemLabel prefixCls="dkk" label="Choices" />
                                                <Space direction="vertical" size={20}>
                                                    {fields.map((subField, index) => (
                                                        <div className="flex justify-between items-center">
                                                            <BookOutlined />
                                                            <Form.Item
                                                                className="flex-1 mb-0"
                                                                name={[subField.name]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "choices are required!",
                                                                    },
                                                                ]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <CloseOutlined
                                                                onClick={() => remove(subField.key)}
                                                                className="cursor-pointer"
                                                                style={{ color: "red" }} />
                                                        </div>
                                                    ))}
                                                </Space>
                                                <div className="flex justify-start">
                                                    <Button
                                                        className="w-fit"
                                                        size="small"
                                                        onClick={() => add()}
                                                        block
                                                    >
                                                        + add Choice
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form.List>
                                )}

                                <Form.Item
                                    valuePropName="checked"
                                    name={[field.name, "disqualify"]}
                                >
                                    <Checkbox>Disqualify</Checkbox>
                                </Form.Item>
                            </>
                            <div onClick={() => remove(field.key)}>
                                <CloseOutlined style={{ color: "red" }} />
                                <span>Delete question</span>
                            </div>
                        </div>
                    ),
                },
            ]} />
    );
};
