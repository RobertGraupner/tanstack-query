import { usePeopleQuery } from "../hooks/usePeopleQuery";
import "./List.css";

export const List = ({onPersonSelect}) => {
    const { data: people, isPending, isError } = usePeopleQuery();
    
    if (isError) {
        return <p>Błąd pobierania danych!</p>;
    }

    if (isPending) {
        return <p>Ładowanie...</p>;
    }

    return (
        <ul>
            {people?.map((person) => (
                <li key={person.id} onClick={() => onPersonSelect(person.id)}>{person.name}</li>
            ))}
        </ul>
    );
};
