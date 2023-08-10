import Head from "next/head";

export default function Metadata({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    );
}