import "./Header.css";
import { usePeopleQuery } from "../hooks/usePeopleQuery";

export function Header() {
    const {data: people} = usePeopleQuery();

    return (
        <header>
            <h1>Lista osób {people && `${people.length}`}</h1>
        </header>
    );
}
