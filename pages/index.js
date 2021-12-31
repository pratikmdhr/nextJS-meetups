import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

// const DUMMY_MEETUPS = [
// 	{
// 		id: 'm1',
// 		title: 'A First Meetup',
// 		image:
// 			'https://images.unsplash.com/photo-1605140678182-d6e17e31278a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
// 		address: '101 Yonge St, Toronto',
// 		description: 'First Meetup in Toronto',
// 	},
// 	{
// 		id: 'm2',
// 		title: 'Second Meetup',
// 		image:
// 			'https://images.unsplash.com/photo-1582564409465-7e1dce1475cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
// 		address: 'Queen Street West, Toronto',
// 		description: 'Second Meetup at Nathan Phillips Square',
// 	},
// ];

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>NextJS Meetups</title>
				<meta name='description' content='NextJS Meetups App' />
			</Head>
			<MeetupList meetups={props.meetups} />;
		</Fragment>
	);
}

// Server Side Generation
// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	// fetch data from an API

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }


// Static Site Generation
export async function getStaticProps() {
	// fetch data from API
	console.log(process.env.MONGO);
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
