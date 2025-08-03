import { PlusOutlined } from '@ant-design/icons'
import { Video } from '@prisma/client'
import {
    Alert,
    Button,
    Col,
    Flex,
    Form,
    FormInstance,
    Input,
    Row,
    Select,
    Typography,
    Upload,
    UploadProps,
} from 'antd'
import React, { useState } from 'react'

import { tagOptions } from 'constants/constants'
import { useCreateVideo } from 'pages/CreateVideoPage/useCreateVideo'
import { Loader } from 'ui/Loader'

import styles from './VideoForm.module.scss'

export type VideoField = Pick<Video, 'title'> & {
    tags: string[]
    file: string
}

export type VideoFormProps = {
    formRef: React.RefObject<FormInstance<VideoField> | null>
    videoPending?: boolean
    onFinish: (video: VideoField) => Promise<void>
    videoError: ReturnType<typeof useCreateVideo>['createVideoError']
}
export const VideoForm = ({
    formRef,
    videoPending,
    videoError,
    onFinish,
}: VideoFormProps) => {
    const [fileLoading, setFileLoading] = useState(false)
    const file = formRef.current?.getFieldValue('file')

    const handleFileBeforeUpload: UploadProps['beforeUpload'] = async (_file) => {
        // simulate uploading the file to cloud bucket
        setFileLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        formRef.current?.setFieldsValue({
            file: String(Math.floor(Math.random() * (100 - 50 + 1)) + 50),
        })
        setFileLoading(false)

        return false
    }

    return (
        <Form<VideoField>
            variant="filled"
            layout="vertical"
            size="large"
            ref={formRef}
            disabled={videoPending}
            initialValues={{
                file: null,
                title: '',
                tags: [],
            }}
            onFinish={onFinish}
            className={styles.videoForm}
        >
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <Form.Item<VideoField>
                        name="file"
                        label="video file"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                            },
                        ]}
                        trigger="none"
                    >
                        <Upload.Dragger
                            listType="picture-card"
                            showUploadList={false}
                            maxCount={1}
                            className={styles.fileInput}
                            beforeUpload={handleFileBeforeUpload}
                        >
                            {fileLoading ? (
                                <Loader spinning={fileLoading} size="large" />
                            ) : file ? (
                                <img
                                    src={`https://picsum.photos/seed/video${file}/600`}
                                    alt="Your new video's thumbnail"
                                />
                            ) : (
                                <Flex gap={16} justify="center" align="center" vertical>
                                    <PlusOutlined className={styles.fileInput__icon} />
                                    <Typography.Text>
                                        Drag and drop a file, or browse from your computer
                                    </Typography.Text>
                                    <Typography.Text type="secondary">
                                        Supported formats: mp4, webm, avi, mov. Maximum
                                        size 200 mb.
                                    </Typography.Text>
                                    <Typography.Text>or</Typography.Text>
                                    <Input
                                        variant="outlined"
                                        placeholder="paste a link"
                                        className={styles.fileInput__link}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                </Flex>
                            )}
                        </Upload.Dragger>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item<VideoField>
                        name="title"
                        label="video title"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<VideoField>
                        name="tags"
                        label="select tags"
                        rules={[
                            {
                                type: 'array',
                                required: false,
                            },
                        ]}
                    >
                        <Select options={tagOptions} mode="multiple" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Flex gap={16} align="center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={videoPending}
                        >
                            save video
                        </Button>
                        <Typography.Text>
                            The fields marked with * are mandatory.
                        </Typography.Text>
                    </Flex>
                </Col>
                <Col span={24}>
                    {videoError && (
                        <Alert
                            message="Failed to create video"
                            showIcon
                            description="Please try again later."
                            type="error"
                            action={
                                <Button
                                    size="small"
                                    onClick={() => formRef.current?.submit()}
                                    danger
                                >
                                    Retry
                                </Button>
                            }
                        />
                    )}
                </Col>
            </Row>
        </Form>
    )
}
