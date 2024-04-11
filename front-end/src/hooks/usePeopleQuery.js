import { useQuery } from "@tanstack/react-query";
import { peopleQueryOptions } from "../queries/peopleQueryOptions";

export function usePeopleQuery() {
  return useQuery(peopleQueryOptions);
}

