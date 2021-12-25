import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image:
			'https://images.unsplash.com/photo-1605140678182-d6e17e31278a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		address: '101 Yonge St, Toronto',
		description: 'First Meetup in Toronto',
	},
	{
		id: 'm2',
		title: 'Second Meetup',
		image:
			'https://images.unsplash.com/photo-1582564409465-7e1dce1475cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		address: 'Queen Street West, Toronto',
		description: 'Second Meetup at Nathan Phillips Square',
	},
];

function HomePage(props) {
	return <MeetupList meetups={props.meetups} />;
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
	return {
		props: {
			meetups: DUMMY_MEETUPS,
			revalidate: 10,
		},
	};
}

export default HomePage;
