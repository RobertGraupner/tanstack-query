import { useQuery } from '@tanstack/react-query';
import './Detail.css';

export function Detail({ onClose, id }) {
	const { data, isPending } = useQuery({
		// dodajemy id do queryKey, zeby zapytanie było wykonywane za każdym razem, gdy zmieni się id
		// bez id, zapytanie byłoby wykonywane tylko raz, a potem dane byłyby pobierane z cache
		// mozemy o tym myśleć jak o tablicy dependency, która powoduje ponowne wykonanie zapytania
		queryKey: [`person`, id],
		queryFn: () =>
			fetch(`http://localhost:3000/people/${id}`).then((res) => res.json()),
		// służy to do cache'owania danych, w tym przypadku dane będą ważne przez 60 sekund
		// gdy mamy id podane w nasyzm przykładzie to cache'owanie nie działa, ponieważ zapytanie jest wykonywane za każdym razem
		// tak mozemy ustawić czas po ktorym dane z cache zostaną usunięte i tanstack zapyta serwer o nowe dane
		staleTime: 60_000,
	});
	console.log(data);

	return (
		<div className='detail'>
			<button onClick={onClose} type='button'>
				X
			</button>
			<h2>Informacje:</h2>

			{isPending ? (
				<p>Ładowanie...</p>
			) : (
				<>
					{' '}
					<h3>{data.name}</h3>
					<h3>Wiek: {data.age}</h3>
					<h3>{data.email}</h3>
				</>
			)}
		</div>
	);
}
