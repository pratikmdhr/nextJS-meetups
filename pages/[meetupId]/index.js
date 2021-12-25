import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails({ image, alt, title, address, description }) {
	return (
		<MeetupDetail
			image={image}
			alt={alt}
			title={title}
			address={address}
			description={description}
		/>
	);
}

export async function getStaticPaths() {
	return {
		fallback: false,
		paths: [
			{
				params: {
					meetupId: 'm1',
				},
			},
			{
				params: {
					meetupId: 'm2',
				},
			},
		],
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup
	const meetupId = context.params.meetupId;
	return {
		props: {
			image:
				'https://images.unsplash.com/photo-1605140678182-d6e17e31278a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			id: { meetupId },
			alt: 'A First Meetup',
			title: 'First Meetup',
			address: '101 Yonge St, Toronto',
			description: 'First Meetup in Toronto',
		},
	};
}

export default MeetupDetails;
