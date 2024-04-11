// jeśli mamy projekt w ts to queryOptions ułatwia pracę z typami. Bez TS za wiele nam to nie daje i nie musimy korzystać
import { queryOptions } from '@tanstack/react-query'

export const peopleQueryOptions = queryOptions({
  // Jesli bedziemy w innym komponencie też chcieli wysłać zapytanie o kluczu "people" to tanstackquery nie będzie wykonywał zapytania ponownie. 
  // Optymalizuje to za nas i zwraca dane z cache
  queryKey: ["people"],
  // to musi być funkcja która zwraca promise
  queryFn: () => fetch("http://localhost:3000/people").then((res) => res.json()),
  // jeśli zapytanie się nie powiedzie to domyślnie tanstack, próbuje wysłać ponowne zapytanie 3 razy w róznych odstepach czasu.
  // Jeśli chcemy to możemy to zmienić
  retry: 5,
  // Czas między próbami
  retryDelay: 1000,
});



