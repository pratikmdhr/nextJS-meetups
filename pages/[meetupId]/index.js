import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';
import { Fragment } from 'react';

function MeetupDetails({ image, alt, title, address, description }) {
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>
			<MeetupDetail
				image={image}
				alt={alt}
				title={title}
				address={address}
				description={description}
			/>
		</Fragment>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();
	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup
	const meetupId = context.params.meetupId;
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});
	client.close();
	return {
		props: {
			image: selectedMeetup.image,
			id: selectedMeetup._id.toString(),
			alt: selectedMeetup.title,
			title: selectedMeetup.title,
			address: selectedMeetup.address,
			description: selectedMeetup.description,
		},
	};
}

export default MeetupDetails;
