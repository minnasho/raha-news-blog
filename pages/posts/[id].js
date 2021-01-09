import React from "react";
import {getAllPostIds, getPostData} from '../../lib/posts'
import Date from "../../components/date";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default function Post({postData}) {
    console.log(postData);
    return (
        <Container>
            <h2>{postData.jsonfileContents.title}</h2>
            <br/>
            <p>{postData.jsonfileContents.content}</p>
            <br/>
            <small><Date dateString={postData.jsonfileContents.date}/></small>
            <p style={{marginTop: 20}}>
                <Link href='/'>
                    <a>&larr; Back to Home</a>
                </Link>
            </p>
        </Container>
    )
}