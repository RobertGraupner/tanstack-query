import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './Form.css';

export function Form() {
	const [isFormShown, setIsFormShown] = useState(false);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [age, setAge] = useState('');

	const queryClient = useQueryClient();
	queryClient.invalidateQueries('people');

	const { mutate, isPending } = useMutation({
		mutationFn: (data) => {
			fetch('http://localhost:3000/people', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error('Błąd zapisu!');
			});
		},
		onSuccess: () => {
			// spowoduje to ponowne wykonanie zapytania do serwera i zaktualizowanie danych po dodaniu nowej osoby
			queryClient.invalidateQueries({ queryKey: ['people'] });
		},
		// onSettled jest wywoływane zarówno w przypadku sukcesu jak i błędu
		// onSettled: () => {
		// 	setIsFormShown(false);
		// },
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		// do callback w mutate powinniśmy przekazywać logike do wykonania po stronie klienta
		mutate(
			{ name, email, age },
			{
				onError: (error) => {
					alert(error);
				},
				onSettled: () => {
					setIsFormShown(false);
					setName('');
					setEmail('');
					setAge('');
				},
			}
		);
	};

	if (isPending) {
		return <p>Zapisywanie...</p>;
	}

	return (
		<div>
			{isFormShown ? (
				<form onSubmit={handleSubmit}>
					<div>
						<input
							type='text'
							placeholder='Imię'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							placeholder='Wiek'
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</div>
					<button type='submit'>Dodaj</button>
				</form>
			) : (
				<button onClick={() => setIsFormShown(true)}>Dodaj</button>
			)}
		</div>
	);
}
