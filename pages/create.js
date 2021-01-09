import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import handleFormikBlur from "../lib/handleBlur";
import {useRouter} from 'next/router'
import {Button, Container, Form, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

function doSavePost(values, resetForm, setSubmitting, router) {
    const fs = require('browserify-fs');
    const path = require('path');

    const postsDirectory = path.join(process.cwd(), 'posts');
    // write to a new file named [title].json
    const fileContent = JSON.stringify(values, null, 2);
    console.log(fileContent);
    fs.mkdir('/posts', function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(`${postsDirectory}/${fileContent.title}.json`, fileContent, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    router.push('/');
                    setSubmitting(false);
                    resetForm({});
                }
            });
        }
    });
}

export default function Create() {

    const [inputs, setInputs] = useState({
        title: '',
        content: '',
        date: ''
    });
    const router = useRouter()

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Required field'),
        content: Yup.string()
            .required("Required field"),
    });

    const doSubmit = (values, {resetForm, setSubmitting}) => {
        console.log(values);
        let currentDate = JSON.stringify(new Date());
        console.log(currentDate);
        values.date = currentDate.substr(1, 10);
        setSubmitting(true);
        doSavePost(values, resetForm, setSubmitting, router);
    }

    return (
        <Formik enableReinitialize={true}
                initialValues={inputs}
                validationSchema={validationSchema}
                onSubmit={doSubmit}>
            {({handleChange, handleSubmit, isSubmitting, handleBlur, touched, values, errors}) => (
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control type="text" name='title'
                                          placeholder='Title'
                                          onChange={handleChange}
                                          onBlur={(event) => handleFormikBlur(event, handleBlur)}
                                          value={values.title}/>
                            {(touched.title && errors.title) ?
                                <small>{errors.title}</small> : null}
                        </Form.Group>
                        <Form.Group controlId="date" className='d-none'>
                            <Form.Label>
                                Date
                            </Form.Label>
                            <Form.Control type="date-time" name='date'
                                          placeholder='date'
                                          onChange={handleChange}
                                          onBlur={(event) => handleFormikBlur(event, handleBlur)}
                                          value={values.date}/>
                            {(touched.date && errors.date) ?
                                <small>{errors.date}</small> : null}
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>
                                Content
                            </Form.Label>
                            <Form.Control type="text" as="textarea" rows={8}
                                          name='content'
                                          value={values.content}
                                          onChange={handleChange}
                                          onBlur={(event) => handleFormikBlur(event, handleBlur)}/>
                            {(touched.content && errors.content) ?
                                <small>{errors.content}</small> : null}
                        </Form.Group>
                        <Button variant="primary" type="submit"
                                disabled={(isSubmitting || !!errors.content || !!errors.title)}>
                            {isSubmitting ?
                                <Spinner animation="border" variant="secondary" size='sm'/> : 'Submit'}
                        </Button>
                    </Form>
                    <p style={{marginTop: 20}}>
                        <Link href='/'>
                            <a>&larr; Back to Home</a>
                        </Link>
                    </p>
                </Container>
            )}
        </Formik>
    );
};
