import { Loan } from "./loan";

export const LOAN_DATA: Loan[] = [
    { id: 1, 
        game:  { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, 
        author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } },
        client: { id: 1, name: "Alice Johnson"}, 
        startDate: new Date('2025-03-01'), 
        endDate: new Date('2025-03-05') 
    },
    { id: 2, 
        game: { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, 
        author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } },
        client: { id: 2, name: "Bob Smith" }, 
        startDate: new Date('2025-03-02'), 
        endDate: new Date('2025-03-06') 
    },
    { id: 3, 
        game: { id: 3, title: 'Juego 3', age: 4, category: { id: 1, name: 'Categoría 1' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } },
        client: { id: 3, name: "Charlie Brown" }, 
        startDate: new Date('2025-03-03'), 
        endDate: new Date('2025-03-07') 
    },
    { id: 4, 
        game: { id: 4, title: 'Juego 4', age: 10, category: { id: 2, name: 'Categoría 2' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, 
        client: { id: 4, name: "Diana Prince" }, 
        startDate: new Date('2025-03-04'), 
        endDate: new Date('2025-03-08') 
    },
    { id: 5, 
        game: { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } },
        client: { id: 5, name: "Ethan Hunt" }, 
        startDate: new Date('2025-03-05'), 
        endDate: new Date('2025-03-09') 
    },
  ];