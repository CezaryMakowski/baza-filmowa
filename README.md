# Movie Database Application

Aplikacja React do przeglądania, wyszukiwania i filtrowania filmów z interfejsem użytkownika.

## Opis Projektu

Movie Database to responsywna aplikacja webowa zbudowana na bazie React, która pozwala użytkownikom:

- Przeglądać katalog filmów
- Wyszukiwać filmy po tytule
- Filtrować filmy po różnych kryteriach
- Wyświetlać szczegółowe informacje o filmach
- Przeglądać obsadę filmów

## Struktura Projektu

```
src/
├── components/          # Komponenty React
│   ├── Cast.jsx        # Komponent wyświetlający obsadę
│   ├── Filters.jsx     # Komponent filtrowania
│   ├── FocusedMovie.jsx # Widok szczegółowy filmu
│   ├── Movie.jsx       # Komponent pojedynczego filmu
│   ├── MovieInfo.jsx   # Informacje o filmie
│   └── *.css           # Style komponentów
├── hooks/              # Custom React hooks
│   ├── useFilters.jsx  # Hook dla filtrów
│   ├── useMovie.jsx    # Hook dla wybranego filmu
│   ├── useMovies.jsx   # Hook dla listy filmów
│   └── useSearch.jsx   # Hook dla wyszukiwania
├── App.jsx             # Główny komponent aplikacji
└── index.js            # Punkt wejścia
public/
└── index.html          # HTML template
```

## Instalacja

1. Sklonuj/pobierz projekt
2. Zainstaluj zależności:

```bash
npm install
```

## Uruchomienie

Aby uruchomić aplikację w trybie development:

```bash
npm start
```

Aplikacja będzie dostępna na `http://localhost:3000`

## Dostępne Skrypty

- `npm start` - Uruchamia aplikację w trybie development
- `npm build` - Buduje aplikację do produkcji
- `npm test` - Uruchamia testy
- `npm eject` - Ejektuje konfigurację (operation irreversible!)

## Technologie

- **React** - Biblioteka do budowania interfejsów użytkownika
- **CSS** - Stylowanie komponentów
- **JavaScript ES6+** - Język programowania

## Wymagania

- Node.js (wersja 14 lub wyższa)
- npm lub yarn

## Kontakt

Jeśli chcesz nawiązać współpracę lub masz pytania, skontaktuj się ze mną:

- Imię i nazwisko: Cezary Makowski
- E-mail: cezary.makowski96@gmail.com
